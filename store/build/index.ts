import { ClientSession } from "@blitzjs/auth"
import { MutateFunction, useMutation } from "@blitzjs/rpc"
import { Portfolio, Prisma, Session } from "@prisma/client"
import updatePortfolio, { IUpdatePortfolio } from "app/portfolios/mutations/updatePortfolio"
import { setCookie } from "cookies-next"
import { deflate, traverseAddIDs } from "helpers"
import { makeAutoObservable, action, computed, autorun, reaction } from "mobx"
import { ICanvasBlock, ICanvasBlockProps, ICanvasData } from "types"

import { configure } from "mobx"
import React, { memo, RefObject } from "react"

configure({
  enforceActions: "never",
})

const defaultPalette = {
  primary: "violet",
}

const initialData = {
  name: null,
  id: null,
  blocks: [],
  flattenBlocks: {},
  palette: defaultPalette,
}

const getInitialData: () => ICanvasData = () => {
  return JSON.parse(JSON.stringify(initialData))
}

interface IActionHistoryItem {
  undo: {
    name: string
    data: unknown
  }
  redo: {
    name: string
    data: unknown
  }
  fromHistory?: boolean
  withScroll?: boolean
}

class Build {
  data: ICanvasData = getInitialData()
  shouldRefetchLiked: boolean = false
  blockTypeFilter: string = "all"
  hasPortfolioChanged: boolean = false

  isSaveButtonLoading: boolean = false

  sectionToBeAddedIndex: number | null = null
  activeEditToolbars: { [key: string]: boolean } = {}

  openedAction: {
    [key: string]: string
  } = {}

  viewMode: string = "desktop"

  sectionsRef: RefObject<HTMLDivElement>

  undoStack: IActionHistoryItem[] = []
  redoStack: IActionHistoryItem[] = []

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
  @action
  onPortfolioChange = (action?: IActionHistoryItem) => {
    this.hasPortfolioChanged = true
    if (action && !action.fromHistory) {
      this.redoStack = []
      this.undoStack.push(JSON.parse(JSON.stringify(action)))
    }
  }

  @action
  setData = (data: ICanvasData) => {
    this.data = {
      ...this.data,
      ...data,
      flattenBlocks: {},
    }
    traverseAddIDs(BuildStore.data.blocks)
  }

  @action
  resetData = () => {
    this.data = getInitialData()
  }

  @action
  undo = () => {
    const undoItem = this.undoStack.pop()
    if (undoItem) {
      this[undoItem.undo.name]?.(undoItem.undo.data, true)
      this.redoStack.push(undoItem)
    }
  }

  @action
  redo = () => {
    const redoItem = this.redoStack.pop()
    if (redoItem) {
      this[redoItem?.redo.name]?.(redoItem.redo.data, true)
      this.undoStack.push(redoItem)
    }
  }

  @action
  setBlockTypeFilter = (filter: string) => {
    this.blockTypeFilter = filter
  }
  @action
  push = (
    {
      block,
      sectionToBeAddedIndex,
    }: { block: ICanvasBlock; sectionToBeAddedIndex?: number | null },
    fromHistory: boolean = false
  ) => {
    if (sectionToBeAddedIndex === null || sectionToBeAddedIndex === undefined) {
      this.data.blocks.push(block)
      traverseAddIDs(BuildStore.data.blocks[BuildStore.data.blocks.length - 1])
    } else {
      this.data.blocks.splice(sectionToBeAddedIndex, 0, block)
      traverseAddIDs(BuildStore.data.blocks[sectionToBeAddedIndex])
      this.sectionToBeAddedIndex = null
    }

    const memoBlock = JSON.parse(JSON.stringify(block))

    this.onPortfolioChange({
      redo: {
        name: "push",
        data: { block: memoBlock, sectionToBeAddedIndex },
      },
      undo: {
        name: "deleteElement",
        data: { id: memoBlock.id },
      },
      fromHistory,
    })
  }

  @action
  pushFlatten = (block: ICanvasBlock) => {
    this.data.flattenBlocks[block.id] = block
  }

  getElement = (id: string) => this.data.flattenBlocks[id]

  @action
  changeProp = (
    { id, newProps }: { id: string; newProps: ICanvasBlockProps },
    fromHistory: boolean = false
  ) => {
    const el = this.getElement(id)
    if (el) {
      const elProps = el?.props as ICanvasBlockProps
      const oldProps = {}
      for (let prop in newProps) {
        if (!elProps[prop]) {
          oldProps[prop] = "undefined"
        }
      }

      this.onPortfolioChange({
        redo: {
          name: "changeProp",
          data: { id, newProps: JSON.parse(JSON.stringify(newProps)) },
        },
        undo: {
          name: "changeProp",
          data: { id, newProps: JSON.parse(JSON.stringify({ ...elProps, ...oldProps })) },
        },
        fromHistory,
      })

      const updatedElementProps = {
        ...elProps,
        ...newProps,
      }

      for (let prop in updatedElementProps) {
        if (updatedElementProps[prop] === "undefined") {
          updatedElementProps[prop] = undefined
        }
      }

      el.props = updatedElementProps
    }
  }

  @action
  deleteElement = (
    { id, parentID }: { id: string; parentID?: string | null },
    fromHistory: boolean = false
  ) => {
    if (parentID) {
      const parent = this.getElement(parentID)
      const parentProps = parent?.props as ICanvasBlockProps
      if (parentProps?.children) {
        this.onPortfolioChange({
          redo: {
            name: "deleteElement",
            data: { id, parentID },
          },
          undo: {
            name: "push",
            data: { block: JSON.parse(JSON.stringify(this.getElement(id))) },
          },
          fromHistory,
        })

        if (Array.isArray(parentProps.children)) {
          parentProps.children = parentProps.children.filter((c: ICanvasBlock) => id !== c.id)
        } else {
          parentProps.children = []
        }
        delete this.data.flattenBlocks[id]
      }
    } else {
      const index = this.data.blocks.findIndex((b) => b.id === id)

      this.onPortfolioChange({
        redo: {
          name: "deleteElement",
          data: { id, parentID },
        },
        undo: {
          name: "push",
          data: {
            block: JSON.parse(JSON.stringify(this.getElement(id))),
            sectionToBeAddedIndex: index,
          },
        },
        fromHistory,
      })
      this.data.blocks = this.data.blocks.filter((b) => typeof b !== "string" && id !== b?.id)
      delete this.data.flattenBlocks[id]
    }
  }

  findParentsChildren = ({
    id,
    parentID,
    editType,
  }: {
    id: string
    parentID: string | null
    editType: string | null
  }) => {
    let indexOfId: number | undefined
    let parentArray
    // Search for index of the element inside parent's children array
    if (editType === "section") {
      parentArray = this.data.blocks
      indexOfId = parentArray.findIndex((section) => section?.id === id)
    } else {
      if (parentID) {
        const parent = this.getElement(parentID)
        const parentProps = parent?.props as ICanvasBlockProps
        if (parentProps?.children) {
          parentArray = parentProps.children
          indexOfId = parentArray.findIndex((a) => typeof a === "object" && a?.id === id)
        }
      }
    }

    return {
      indexOfId,
      parentArray,
    }
  }

  @action
  moveLeft = (
    {
      id,
      parentID,
      editType,
    }: {
      id: string
      parentID: string | null
      editType: string | null
    },
    fromHistory: boolean = false,
    withScroll: boolean = true
  ) => {
    const { indexOfId, parentArray } = this.findParentsChildren({ id, parentID, editType })

    if (typeof indexOfId === "number" && indexOfId !== -1 && indexOfId > 0) {
      ;[parentArray[indexOfId], parentArray[indexOfId - 1]] = [
        parentArray[indexOfId - 1],
        parentArray[indexOfId],
      ]
      this.onPortfolioChange({
        redo: {
          name: "moveLeft",
          data: { id, parentID, editType },
        },
        undo: {
          name: "moveRight",
          data: { id, parentID, editType },
        },
        fromHistory,
        withScroll: false,
      })

      if (withScroll) {
        this.sectionsRef.current
          ?.querySelectorAll(".builder-block")
          ?.[indexOfId - 1]?.scrollIntoView({ block: "start" })
        window.scrollBy(0, -100)
      }
    }
  }

  @action
  moveRight = (
    {
      id,
      parentID,
      editType,
    }: {
      id: string
      parentID: string | null
      editType: string | null
    },
    fromHistory: boolean = false,
    withScroll: boolean = true
  ) => {
    const { indexOfId, parentArray } = this.findParentsChildren({ id, parentID, editType })

    if (typeof indexOfId === "number" && indexOfId !== -1 && indexOfId < parentArray.length - 1) {
      ;[parentArray[indexOfId + 1], parentArray[indexOfId]] = [
        parentArray[indexOfId],
        parentArray[indexOfId + 1],
      ]
      this.onPortfolioChange({
        redo: {
          name: "moveRight",
          data: { id, parentID, editType },
        },
        undo: {
          name: "moveLeft",
          data: { id, parentID, editType },
        },
        fromHistory,
        withScroll: false,
      })
      console.log(this.sectionsRef.current?.querySelectorAll(".builder-block")[indexOfId + 1])
      if (withScroll) {
        setTimeout(() => {
          this.sectionsRef.current
            ?.querySelectorAll(".builder-block")
            ?.[indexOfId + 1]?.scrollIntoView({ block: "start" })
          window.scrollBy(0, -100)
        }, 0)
      }
    }
  }

  @action
  setIsSaveButtonLoading = (value: boolean) => {
    this.isSaveButtonLoading = value
  }

  @action
  savePortfolio = async ({
    e,
    session,
    updatePortfolioMutation,
  }: {
    e?: KeyboardEvent
    session: ClientSession
    updatePortfolioMutation: MutateFunction<
      Portfolio | undefined,
      unknown,
      IUpdatePortfolio,
      unknown
    >
  }) => {
    e && e.preventDefault()
    const {
      data: { name, id, blocks, palette },
      hasPortfolioChanged,
    } = this
    if (name && id && hasPortfolioChanged) {
      this.setIsSaveButtonLoading(true)
      const portfolio = {
        data: deflate(blocks),
        name,
        id,
        palette: palette as Prisma.JsonObject,
      }
      if (session.userId) {
        await updatePortfolioMutation?.(portfolio)
      } else {
        localStorage?.setItem(`portfolio-${id}`, deflate(portfolio))
      }
      this.hasPortfolioChanged = false
      this.setIsSaveButtonLoading(false)
    }
  }

  @action
  changePalette = (
    { paletteKey, value }: { paletteKey: string; value: string },
    fromHistory: boolean = false
  ) => {
    if (this.data.palette?.[paletteKey]) {
      const oldValue = this.data.palette[paletteKey]
      this.data.palette[paletteKey] = value
      this.onPortfolioChange({
        redo: {
          name: "changePalette",
          data: { paletteKey, value },
        },
        undo: {
          name: "changePalette",
          data: { paletteKey, value: oldValue },
        },
        fromHistory,
      })
    }
  }

  /////////// COMPUTED /////////////
  @computed get isCanvasEmpty() {
    return this.data.blocks.length === 0
  }

  @computed get sectionsCount() {
    return this.data.blocks.length
  }
}

const BuildStore = new Build()

export { BuildStore }

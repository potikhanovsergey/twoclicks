import { ClientSession } from "@blitzjs/auth"
import { MutateFunction, useMutation } from "@blitzjs/rpc"
import { Portfolio, Prisma, Session } from "@prisma/client"
import updatePortfolio, { IUpdatePortfolio } from "app/portfolios/mutations/updatePortfolio"
import { setCookie } from "cookies-next"
import { deflate, traverseAddIDs } from "helpers"
import { makeAutoObservable, action, computed, autorun, reaction } from "mobx"
import { ICanvasBlock, ICanvasBlockProps, ICanvasData } from "types"

import { configure } from "mobx"
import React, { RefObject } from "react"

configure({
  enforceActions: "never",
})

const defaultPalette = {
  primary: "violet",
  // secondary: "blue",
  // accent: "teal",
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

class Build {
  data: ICanvasData = getInitialData()
  shouldRefetchLiked: boolean = false
  blockTypeFilter: string = "all"
  hasPortfolioChanged: boolean = false

  isSaveButtonLoading: boolean = false

  sectionToBeAddedIndex: number | null = null
  activeEditToolbars: { [key: string]: boolean } = {}
  openedPalette: string | null = null

  sectionsRef: RefObject<HTMLDivElement>

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
  @action
  setData = (data: ICanvasData) => {
    this.data = {
      ...this.data,
      ...data,
    }
    traverseAddIDs(BuildStore.data.blocks)
  }

  @action
  resetData = () => {
    this.data = getInitialData()
  }

  @action
  setBlockTypeFilter = (filter: string) => {
    this.blockTypeFilter = filter
  }
  @action
  push = (block: ICanvasBlock) => {
    if (this.sectionToBeAddedIndex === null) {
      this.data.blocks.push(block)
      traverseAddIDs(BuildStore.data.blocks[BuildStore.data.blocks.length - 1])
    } else {
      this.data.blocks.splice(this.sectionToBeAddedIndex, 0, block)
      traverseAddIDs(BuildStore.data.blocks[this.sectionToBeAddedIndex])
      this.sectionToBeAddedIndex = null
    }
    this.hasPortfolioChanged = true
  }

  @action
  pushFlatten = (block: ICanvasBlock) => {
    this.data.flattenBlocks[block.id] = block
  }

  getElement = (id: string) => this.data.flattenBlocks[id]

  @action
  changeProp = ({ id, newProps }: { id: string; newProps: ICanvasBlockProps }) => {
    const el = this.getElement(id)
    if (el) {
      const elProps = el?.props as ICanvasBlockProps
      this.hasPortfolioChanged = true
      el.props = {
        ...elProps,
        ...newProps,
      }
    }
  }

  @action
  deleteElement = ({ id, parentID }: { id: string; parentID?: string | null }) => {
    if (parentID) {
      const parent = this.getElement(parentID)
      const parentProps = parent?.props as ICanvasBlockProps
      if (parentProps?.children) {
        this.hasPortfolioChanged = true
        if (Array.isArray(parentProps.children)) {
          parentProps.children = parentProps.children.filter((c: ICanvasBlock) => id !== c.id)
        } else {
          parentProps.children = []
        }
        delete this.data.flattenBlocks[id]
      }
    } else {
      this.hasPortfolioChanged = true
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
  moveLeft = ({
    id,
    parentID,
    editType,
  }: {
    id: string
    parentID: string | null
    editType: string | null
  }) => {
    const { indexOfId, parentArray } = this.findParentsChildren({ id, parentID, editType })

    if (typeof indexOfId === "number" && indexOfId !== -1 && indexOfId > 0) {
      ;[parentArray[indexOfId], parentArray[indexOfId - 1]] = [
        parentArray[indexOfId - 1],
        parentArray[indexOfId],
      ]
      this.hasPortfolioChanged = true
      this.sectionsRef.current
        ?.querySelectorAll(".builder-block")
        ?.[indexOfId - 1]?.scrollIntoView({ block: "start" })
      window.scrollBy(0, -100)
    }
  }

  @action
  moveRight = ({
    id,
    parentID,
    editType,
  }: {
    id: string
    parentID: string | null
    editType: string | null
  }) => {
    const { indexOfId, parentArray } = this.findParentsChildren({ id, parentID, editType })

    if (typeof indexOfId === "number" && indexOfId !== -1 && indexOfId < parentArray.length - 1) {
      ;[parentArray[indexOfId + 1], parentArray[indexOfId]] = [
        parentArray[indexOfId],
        parentArray[indexOfId + 1],
      ]
      this.hasPortfolioChanged = true
      console.log(this.sectionsRef.current?.querySelectorAll(".builder-block")[indexOfId + 1])
      setTimeout(() => {
        this.sectionsRef.current
          ?.querySelectorAll(".builder-block")
          ?.[indexOfId + 1]?.scrollIntoView({ block: "start" })
        window.scrollBy(0, -100)
      }, 0)
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
  changePalette = ({ paletteKey, value }: { paletteKey: string; value: string }) => {
    if (this.data.palette?.[paletteKey]) {
      this.data.palette[paletteKey] = value
      this.hasPortfolioChanged = true
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

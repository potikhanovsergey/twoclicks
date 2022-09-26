import { ClientSession } from "@blitzjs/auth"
import { MutateFunction } from "@blitzjs/rpc"
import { Page, Prisma } from "@prisma/client"
import { IUpdatePage } from "app/build-pages/mutations/updatePage"
import { deflate, traverseAddIDs, traverseDeleteIDs } from "helpers"
import { makeAutoObservable, action, computed } from "mobx"
import { ICanvasBlock, ICanvasBlockProps, ICanvasData } from "types"

import { configure } from "mobx"
import { RefObject } from "react"
import { defaultSavePageError, defaultSavePageSuccess } from "notifications"
import { showNotification } from "@mantine/notifications"
import { AppStore } from "store"

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
  hasPageChanged: boolean = false

  isSaveButtonLoading: boolean = false
  isImageUploading: string | null = null

  insertIndex: number | null = null
  activeEditToolbars: { [key: string]: boolean } = {}

  openedAction: {
    [key: string]: string
  } = {}

  unlockedElements: {
    [key: string]: boolean
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
  resetHistoryOfChanges = () => {
    this.undoStack = []
    this.redoStack = []
  }

  @action resetBuilderStore = () => {
    this.resetHistoryOfChanges()
    this.isSaveButtonLoading = false
    this.hasPageChanged = false
    this.isImageUploading = null
    this.activeEditToolbars = {}
    this.insertIndex = null
  }
  @action
  onPageChange = (action?: IActionHistoryItem) => {
    this.hasPageChanged = true
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
    traverseAddIDs(this.data.blocks)
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
      insertIndex,
      parentID,
    }: { block: ICanvasBlock; insertIndex?: number | null; parentID?: string },
    fromHistory: boolean = false
  ) => {
    if (parentID) {
      const parent = this.getElement(parentID)
      if (parent) {
        const parentProps = parent?.props as ICanvasBlockProps
        const parentChildren = parentProps.children as ICanvasBlock[]
        if (insertIndex === null || insertIndex === undefined) {
          parentChildren.push(block)
        } else {
          parentChildren.splice(insertIndex, 0, block)
          this.insertIndex = null
        }
        traverseAddIDs(parent)
      }
    } else {
      if (insertIndex === null || insertIndex === undefined) {
        this.data.blocks.push(block)
      } else {
        this.data.blocks.splice(insertIndex, 0, block)
        this.insertIndex = null
      }
      traverseAddIDs(this.data.blocks)
    }

    const memoBlock = JSON.parse(JSON.stringify(block))

    this.onPageChange({
      redo: {
        name: "push",
        data: { block: memoBlock, insertIndex },
      },
      undo: {
        name: "deleteElement",
        data: { id: memoBlock.id, parentID },
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
  changeType = (
    { id, type, editType }: { id: string; type: string; editType: string },
    fromHistory: boolean = false
  ) => {
    const el = this.getElement(id)
    if (el) {
      const oldType = el.type
      const oldEditType = el.editType
      el.type = type
      el.editType = editType

      this.onPageChange({
        redo: {
          name: "changeType",
          data: { id, type, editType },
        },
        undo: {
          name: "changeType",
          data: { id, type: oldType, editType: oldEditType },
        },
        fromHistory,
      })
    }
  }

  @action
  changeProp = (
    { id, newProps }: { id: string; newProps: ICanvasBlockProps },
    fromHistory: boolean = false
  ) => {
    const el = this.getElement(id)
    if (el) {
      const elProps = el?.props as ICanvasBlockProps
      const oldProps = {}

      const undoProps = {}

      for (let prop in newProps) {
        if (!elProps[prop]) {
          oldProps[prop] = "undefined"
        }
        undoProps[prop] = elProps[prop] === undefined ? "undefined" : elProps[prop]
      }

      this.onPageChange({
        redo: {
          name: "changeProp",
          data: { id, newProps: JSON.parse(JSON.stringify(newProps)) },
        },
        undo: {
          name: "changeProp",
          data: { id, newProps: JSON.parse(JSON.stringify(undoProps)) },
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
    const elementToBeDeleted = this.getElement(id)
    if (parentID) {
      const parent = this.getElement(parentID)
      const parentProps = parent?.props as ICanvasBlockProps
      const parentChildren = parentProps?.children as ICanvasBlock[] | ICanvasBlock
      if (parentChildren) {
        let insertIndex: number | null = null
        if (Array.isArray(parentChildren)) {
          insertIndex = parentChildren.findIndex((el) => el.id === id)
          parentProps.children = parentChildren.filter((c: ICanvasBlock) => id !== c.id)
        } else {
          parentProps.children = []
        }

        this.onPageChange({
          redo: {
            name: "deleteElement",
            data: { id, parentID },
          },
          undo: {
            name: "push",
            data: { block: JSON.parse(JSON.stringify(elementToBeDeleted)), insertIndex, parentID },
          },
          fromHistory,
        })
        traverseDeleteIDs(elementToBeDeleted)
      }
    } else {
      const index = this.data.blocks.findIndex((b) => b.id === id)

      this.onPageChange({
        redo: {
          name: "deleteElement",
          data: { id, parentID },
        },
        undo: {
          name: "push",
          data: {
            block: JSON.parse(JSON.stringify(this.getElement(id))),
            insertIndex: index,
          },
        },
        fromHistory,
      })
      this.data.blocks = this.data.blocks.filter((b) => typeof b !== "string" && id !== b?.id)
      traverseDeleteIDs(elementToBeDeleted)
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
      this.onPageChange({
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
      this.onPageChange({
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
  savePage = async ({
    e,
    session,
    updatePageMutation,
  }: {
    e?: KeyboardEvent
    session: ClientSession
    updatePageMutation: MutateFunction<Page | undefined, unknown, IUpdatePage, unknown>
  }) => {
    try {
      e && e.preventDefault()
      const {
        data: { name, id, blocks, palette },
        hasPageChanged,
      } = this
      if (name && id && hasPageChanged) {
        this.setIsSaveButtonLoading(true)
        const page = {
          data: deflate(blocks),
          name,
          id,
          palette: palette as Prisma.JsonObject,
        }
        let p
        if (session.userId) {
          p = await updatePageMutation?.(page)
        } else {
          localStorage?.setItem(`page-${id}`, deflate(page))
        }
        this.hasPageChanged = false
        this.setIsSaveButtonLoading(false)
        showNotification(defaultSavePageSuccess)
        const indexOfP = AppStore.pages.findIndex((storePage) => storePage.id === id)
        if (indexOfP !== -1) {
          AppStore.pages.splice(indexOfP, 1, p || page)
        }
        return p || page
      }
    } catch (e) {
      showNotification({
        ...defaultSavePageError,
      })
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
      this.onPageChange({
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

  @computed get isUndoActive() {
    return Boolean(this.undoStack.length)
  }

  @computed get isRedoActive() {
    return Boolean(this.redoStack.length)
  }
}

const BuildStore = new Build()

export { BuildStore }

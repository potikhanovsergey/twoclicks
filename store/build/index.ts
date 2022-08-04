import { traverseAddIDs } from "helpers"
import { makeAutoObservable, action, computed } from "mobx"
import { ICanvasBlock, ICanvasBlockProps, ICanvasData } from "types"

class Build {
  data: ICanvasData = {
    name: null,
    id: null,
    blocks: [],
    flattenBlocks: {},
  }
  shouldRefetchLiked: boolean = false
  blockTypeFilter: string = "all"
  sectionsCount: number = 0
  hasPortfolioChanged: boolean = false

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
  @action
  setData = (data: ICanvasData) => {
    this.data = data
    traverseAddIDs(BuildStore.data.blocks)
  }
  @action
  setBlockTypeFilter = (filter: string) => {
    this.blockTypeFilter = filter
  }
  @action
  push = (block: ICanvasBlock) => {
    this.data.blocks.push(block)
    this.sectionsCount++
    this.hasPortfolioChanged = true
    traverseAddIDs(BuildStore.data.blocks[BuildStore.data.blocks.length - 1])
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
    console.log("element deleted", id, parentID)
  }

  @action
  moveLeft = ({ id, parentID }: { id: string; parentID: string | null }) => {
    if (parentID) {
      this.hasPortfolioChanged = true
      const parent = this.getElement(parentID)
      const parentProps = parent?.props as ICanvasBlockProps
      if (parentProps?.children) {
        let indexOfId = parentProps.children.findIndex((a) => typeof a === "object" && a?.id === id)
        if (indexOfId !== -1 && indexOfId > 0) {
          ;[parentProps.children[indexOfId], parentProps.children[indexOfId - 1]] = [
            parentProps.children[indexOfId - 1],
            parentProps.children[indexOfId],
          ]
        }
      }
    }
  }

  @action
  moveRight = ({ id, parentID }: { id: string; parentID: string | null }) => {
    if (parentID) {
      this.hasPortfolioChanged = true
      const parent = this.getElement(parentID)
      const parentProps = parent?.props as ICanvasBlockProps
      if (parentProps?.children) {
        let indexOfId = parentProps.children.findIndex((a) => typeof a === "object" && a?.id === id)
        if (indexOfId !== -1 && indexOfId < parentProps.children.length - 1) {
          ;[parentProps.children[indexOfId + 1], parentProps.children[indexOfId]] = [
            parentProps.children[indexOfId],
            parentProps.children[indexOfId + 1],
          ]
        }
      }
    }
  }

  /////////// COMPUTED /////////////
  @computed get isCanvasEmpty() {
    return this.data.blocks.length === 0
  }
}

export const BuildStore = new Build()

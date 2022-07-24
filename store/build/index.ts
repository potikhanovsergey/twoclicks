import { BuildingBlock } from "@prisma/client"
import { PortfolioMock } from "db/mocks"
import { makeAutoObservable, action, computed } from "mobx"
import { ICanvasBlock, ICanvasBlockProps, ICanvasData } from "types"

class Build {
  data: ICanvasData = {
    blocks: PortfolioMock.data,
    flattenBlocks: {},
  }
  shouldRefetchLiked: boolean = false
  blockTypeFilter: string = "all"

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
  @action
  setBlockTypeFilter = (filter: string) => {
    this.blockTypeFilter = filter
  }
  @action
  push = (block: ICanvasBlock) => {
    this.data.blocks.push(block)
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
      if (elProps && elProps !== newProps) {
        el.props = {
          ...elProps,
          ...newProps,
        }
      }
    }
  }

  @action
  deleteElement = ({ id, parentID }: { id: string; parentID?: string | null }) => {
    if (parentID) {
      const parent = this.getElement(parentID)
      const parentProps = parent?.props as ICanvasBlockProps
      if (parentProps?.children) {
        parentProps.children = parentProps.children.filter((c: ICanvasBlock) => id !== c.id)
        delete this.data.flattenBlocks[id]
      }
    } else {
      this.data.blocks = this.data.blocks.filter((b) => typeof b !== "string" && id !== b?.id)
      delete this.data.flattenBlocks[id]
    }
  }

  /////////// COMPUTED /////////////
  @computed get isCanvasEmpty() {
    return this.data.blocks.length === 0
  }
}

export const BuildStore = new Build()

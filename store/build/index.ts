import { ClientSession } from "@blitzjs/auth"
import { MutateFunction, useMutation } from "@blitzjs/rpc"
import { Portfolio, Prisma, Session } from "@prisma/client"
import updatePortfolio, { IUpdatePortfolio } from "app/portfolios/mutations/updatePortfolio"
import { setCookie } from "cookies-next"
import { deflate, traverseAddIDs } from "helpers"
import { makeAutoObservable, action, computed, autorun, reaction } from "mobx"
import { ICanvasBlock, ICanvasBlockProps, ICanvasData } from "types"

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
    this.data.blocks.push(block)
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
    if (editType === "section") {
      const indexOfId = this.data.blocks.findIndex((section) => section?.id === id)
      if (indexOfId !== -1 && indexOfId > 0) {
        ;[this.data.blocks[indexOfId], this.data.blocks[indexOfId - 1]] = [
          this.data.blocks[indexOfId - 1],
          this.data.blocks[indexOfId],
        ]
        this.hasPortfolioChanged = true
      }
    } else {
      if (parentID) {
        const parent = this.getElement(parentID)
        const parentProps = parent?.props as ICanvasBlockProps
        if (parentProps?.children) {
          let indexOfId = parentProps.children.findIndex(
            (a) => typeof a === "object" && a?.id === id
          )
          if (indexOfId !== -1 && indexOfId > 0) {
            ;[parentProps.children[indexOfId], parentProps.children[indexOfId - 1]] = [
              parentProps.children[indexOfId - 1],
              parentProps.children[indexOfId],
            ]
            this.hasPortfolioChanged = true
          }
        }
      }
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
    if (editType === "section") {
      const indexOfId = this.data.blocks.findIndex((section) => section?.id === id)
      if (indexOfId !== -1 && indexOfId < this.data.blocks.length - 1) {
        ;[this.data.blocks[indexOfId + 1], this.data.blocks[indexOfId]] = [
          this.data.blocks[indexOfId],
          this.data.blocks[indexOfId + 1],
        ]
        this.hasPortfolioChanged = true
      }
    } else {
      if (parentID) {
        const parent = this.getElement(parentID)
        const parentProps = parent?.props as ICanvasBlockProps
        if (parentProps?.children) {
          let indexOfId = parentProps.children.findIndex(
            (a) => typeof a === "object" && a?.id === id
          )
          if (indexOfId !== -1 && indexOfId < parentProps.children.length - 1) {
            ;[parentProps.children[indexOfId + 1], parentProps.children[indexOfId]] = [
              parentProps.children[indexOfId],
              parentProps.children[indexOfId + 1],
            ]
            this.hasPortfolioChanged = true
          }
        }
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
        setCookie(`portfolio-${id}`, deflate(portfolio))
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

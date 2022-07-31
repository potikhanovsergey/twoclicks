import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { BuildingBlock, Role, User } from "db"

/// ### CANVAS STARTS ###

export type ICanvasModalType = "components" | "sections"
export interface IFilterButton {
  value: string
  text: string
}

export interface IPortfolio {
  id?: string
  name: string
  data: BuildingBlock[]
}

export type IBuildingBlockMock = Omit<BuildingBlock, "id" | "createdAt" | "updatedAt">

export type ICanvasBuildingBlockComponent =
  | "button"
  | "group"
  | "stack"
  | "textInput"
  | "tabs"
  | "tab"

export interface ICanvasBlockProps {
  [key: string]: any
  children?: ICanvasElement[]
}

export type ICanvasBlock = Omit<BuildingBlock, "createdAt" | "updatedAt">

export type ICanvasElement = ICanvasBlock | undefined | string | null // Element can be either block, string (text), or nothing

export interface ICanvasData {
  blocks: ICanvasBlock[]
  flattenBlocks: {
    [key: string]: ICanvasBlock
  }
}

export interface IFilterButton {
  value: string
  text: string
}

interface IPages {
  [key: string]: ICanvasBlock[]
}

export interface IBuildingBlocksData {
  components: {
    [key: string]: {
      lastPage: number | null
      totalResults: number | null
      totalPages: number | null
      pages: IPages
    }
  }
  sections: {
    [key: string]: {
      lastPage: number | null
      totalResults: number | null
      totalPages: number | null
      pages: IPages
    }
  }
}
// ### CANVAS ENDS ###

// ### BLITZ STARTS ###
declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
// ### BLITZ ENDS ###

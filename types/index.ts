import { ReactNode } from "react"
import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { BuildingBlock, User } from "db"

/// ### CANVAS STARTS ###
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

export interface ICanvasBlock {
  // Block that contains something else
  id: string
  component: string
  editType?: string | null
  props: ICanvasBlockProps
}

export type ICanvasElement = BuildingBlock | undefined | string | null // Element can be either block, string (text), or nothing

export interface ICanvasData {
  blocks: ICanvasElement[]
  flattenBlocks: {
    [key: string]: ICanvasBlock | null
  }
}

export type ICanvasModalType = "components" | "sections"

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
export type Role = "ADMIN" | "USER"

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

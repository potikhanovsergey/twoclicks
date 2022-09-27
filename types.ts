import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { BuildingBlock, Page, Role, User } from "db"
import { ExtendedCustomColors } from "pages/_app"

/// ### CANVAS STARTS ###

export type ICanvasModalType = "components" | "sections"
export interface IFilterButton {
  value: string
  text: string
}

export type ICanvasPalette = {
  [key: string]: ExtendedCustomColors
}
export interface IPage {
  id: string
  name: string
  data: BuildingBlock[]
  palette: ICanvasPalette
  theme: "inherit" | "light" | "dark"
  createdAt?: Date
  updatedAt?: Date
  isPublished: boolean
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
  children?: ICanvasElement[] | ICanvasElement
}

export type ICanvasBlock = Omit<BuildingBlock, "createdAt" | "updatedAt"> & {
  disableCopy?: boolean
  sectionLike?: boolean
}

export type ICanvasElement = ICanvasBlock | undefined | string | null // Element can be either block, string (text), or nothing

export interface ICanvasData {
  blocks: ICanvasBlock[]
  flattenBlocks: {
    [key: string]: ICanvasBlock
  }
  id: string | null
  name: string | null
  palette: ICanvasPalette
  theme: "inherit" | "light" | "dark"
  isPublished?: boolean
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

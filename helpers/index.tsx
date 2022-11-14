import { MantineTheme } from "@mantine/core"
import React from "react"
import shortid from "shortid"
import { BuildStore } from "store/build"
import { ExtendedCustomColors } from "pages/_app"
import WithEditable from "app/build/WithEditable"
import { ICanvasPalette, IThemeSettings } from "types"
import TextEditor from "app/core/components/TextEditor"
import RenderJSXFromBlock from "app/core/components/RenderJSXFromBlock"

export const TraverseProp = ({
  propValue,
  prop,
  shouldFlat,
  parentID,
  withContentEditable,
  withEditToolbar,
  withThemeSettings,
  themeSettings,
  type,
  sectionIndex,
  withMobx = false,
}: {
  propValue: any
  prop: string
  shouldFlat: boolean
  parentID: string
  withContentEditable: boolean
  withEditToolbar: boolean
  withThemeSettings: boolean
  themeSettings?: IThemeSettings
  type: string
  sectionIndex?: number
  withMobx?: boolean
}) => {
  if (prop === "children" && typeof propValue === "string" && withContentEditable) {
    if (type.includes("button") || type.includes("badge")) {
      return (
        <WithEditable key={parentID} parentID={parentID} withContentEditable={withContentEditable}>
          {propValue}
        </WithEditable>
      )
    } else {
      return <TextEditor key={parentID} initialHtml={propValue} parentID={parentID} />
    }
  }

  if (propValue && typeof propValue === "object" && propValue.type) {
    if (!propValue?.id) propValue.id = shortid.generate()
    return (
      <RenderJSXFromBlock
        key={propValue.id}
        element={propValue}
        childrenProp={prop}
        withMobx={withMobx}
        shouldFlat={shouldFlat}
        parentID={parentID}
        withContentEditable={withContentEditable}
        withEditToolbar={withEditToolbar}
        withThemeSettings={withThemeSettings}
        themeSettings={themeSettings}
        sectionIndex={sectionIndex}
      />
    )
  } else {
    return propValue
  }
}

export const textElements = ["text", "title"]

export interface TypeEditLabelValue {
  label: string
  value: string
  editType: string
}

export const PaletteTypePropColor: {
  [key: string]: {
    prop: string
    color: string
  }
} = {
  "@mantine/core/button": {
    prop: "color",
    color: "primary",
  },
  "@mantine/core/themeicon": {
    prop: "color",
    color: "primary",
  },
  "@mantine/core/actionicon": {
    prop: "color",
    color: "primary",
  },
  "@mantine/core/text": {
    prop: "color",
    color: "text",
  },
  "@mantine/core/title": {
    prop: "color",
    color: "text",
  },
  "@mantine/core/badge": {
    prop: "color",
    color: "primary",
  },
  "@mantine/core/divider": {
    prop: "color",
    color: "primary",
  },
}

export const TypeVariants: {
  [key: string]: string[]
} = {
  "@mantine/core/button": ["gradient", "filled", "outline", "light", "subtle", "default"],
  "@mantine/core/themeicon": ["filled", "light", "outline", "gradient", "default"],
  "@mantine/core/actionicon": ["transparent", "subtle", "filled", "light", "outline", "default"],
  "@mantine/core/text": ["gradient", "filled"],
  "@mantine/core/title": ["gradient", "filled"],
  "@mantine/core/badge": ["gradient", "filled", "light", "outline", "dot", "default"],
  "@mantine/core/divider": ["dashed", "dotted", "solid"],
}

export const sizes = ["xs", "sm", "md", "lg", "xl"]

export const defaultGradients = [
  "@mantine/core/themeicon",
  "@mantine/core/actionicon",
  "@mantine/core/button",
  "@mantine/core/badge",
]

export const defaultVariants = [
  "@mantine/core/themeicon",
  "@mantine/core/actionicon",
  "@mantine/core/button",
  "@mantine/core/badge",
]

export const TypeSizes: {
  [key: string]: string[]
} = {
  "@mantine/core/button": sizes,
  "@mantine/core/text": sizes,
  "@mantine/core/themeicon": sizes,
  "@mantine/core/actionicon": sizes,
  "@mantine/core/badge": sizes,
  "@mantine/core/divider": sizes,
}

export const TypeRadius: {
  [key: string]: string[]
} = {
  "@mantine/core/button": sizes,
  "@mantine/core/image": sizes,
  "@mantine/core/themeicon": sizes,
  "@mantine/core/actionicon": sizes,
  "@mantine/core/badge": sizes,
}

export const TypeGradients: {
  [key: string]: boolean
} = {
  "@mantine/core/button": true,
  "@mantine/core/themeicon": true,
  "@mantine/core/actionicon": true,
  "@mantine/core/text": true,
  "@mantine/core/title": true,
  "@mantine/core/badge": true,
}

export const TypeIcons: {
  [key: string]: string[]
} = {
  "@mantine/core/button": ["leftIcon", "rightIcon"],
  "@mantine/core/badge": ["leftSection", "rightSection"],
}

export const TypeLinks: {
  [key: string]: boolean
} = {
  "@mantine/core/button": true,
  "@mantine/core/image": true,
  "@mantine/core/actionicon": true,
  "@mantine/core/themeicon": true,
}

export const TypeLinkUpload: {
  [key: string]: boolean
} = {
  "@mantine/core/image": true,
  youtubeframe: true,
}

export function getPaletteByType(type: string) {
  return PaletteTypePropColor[type]
}

export function getVariantsByType(type: string) {
  return TypeVariants[type]
}

export function getSizesByType(type: string) {
  return TypeSizes[type]
}

export function getRadiusesByType(type: string) {
  return TypeRadius[type]
}

export function getGradientsByType(type: string) {
  return TypeGradients[type]
}

const keepNames = ["MediaQuery", "SlideImage", "ColorCircle"]

const getElementType = (value) => {
  if (typeof value === "function") {
    // if (keepNames.includes(value?.name) && !value?.displayName) {
    //   return value.name
    // }

    if (value?.displayName) return value.displayName

    // react-icon (and maybe some other components) has type value of function, thus it needs to be rendered to retrieve it's name and props
    const c = value()
    const name = c?.type?.displayName || c?.type?.name || value?.name
    if (name === "IconBase") {
      return {
        typeName: name,
        props: c.props,
      }
    }
    return name
  }
  if (typeof value === "string") return value
  if (typeof value === "object") return value.displayName || value.name
  return null
}

export function serialize(element: any) {
  const replacer = (key, value) => {
    switch (key) {
      case "_owner":
      case "_store":
      case "ref":
      case "key":
        return
      case "type":
        const type = getElementType(value)
        return type && type.toLowerCase ? type.toLowerCase() : type
      default:
        return value
    }
  }
  const obj = JSON.parse(JSON.stringify(element, replacer))
  traverseJSXChangeType(obj)
  return JSON.stringify(obj)
}

function traverseJSXChangeType(obj) {
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      if (obj[k]?.type?.typeName) {
        obj[k].props = obj[k].type.props
        obj[k].type = obj[k].type.typeName
      }
      traverseJSXChangeType(obj[k])
    }
  }
}

export function traverseDeleteIDs(obj) {
  if (obj && typeof obj === "object") {
    for (let k in obj) {
      if (k === "id") continue
      traverseDeleteIDs(obj[k])
    }
  }
  if (typeof obj === "object" && obj?.id && BuildStore.data.flattenBlocks[obj.id]) {
    delete BuildStore.data.flattenBlocks[obj.id]
  }
}

export function traverseAddIDs(obj, withNewIDs?: boolean) {
  if (obj && typeof obj === "object") {
    for (let k in obj) {
      if (k === "id") continue
      traverseAddIDs(obj[k], withNewIDs)
    }
  }
  if (typeof obj === "object" && (obj?.editType || obj?.props?.children)) {
    if (!obj.id || withNewIDs) obj.id = shortid.generate()
    BuildStore.pushFlatten(obj)
  }
}

export const getHexFromThemeColor: ({
  theme,
  color,
}: {
  theme: MantineTheme
  color: ExtendedCustomColors
}) => string = ({ theme, color }) => {
  return (
    theme.colors?.[color]?.[typeof theme.primaryShade === "number" ? theme.primaryShade : 5] ||
    color
  )
}

export const getHexesFromThemeColors: (theme: MantineTheme) => string[] = (theme) => {
  return Object.keys(theme.colors).map((color: ExtendedCustomColors) =>
    getHexFromThemeColor({ theme, color })
  )
}

export const getThemeColorValueArray: ({
  theme,
  shade,
}: {
  theme: MantineTheme
  shade?: number
}) => { color: string; value: string }[] = ({ theme, shade }) => {
  const themeColors = Object.keys(theme.colors)
  const colorShade =
    shade && shade >= 0 && shade < 10
      ? shade
      : typeof theme.primaryShade === "number"
      ? theme.primaryShade
      : 5

  return themeColors.map((color: ExtendedCustomColors) => {
    return {
      color,
      value: theme.colors[color][colorShade],
    }
  })
}

export function getBase64(file: File, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = callback
  // reader.onerror = function (error) {
  //   // console.log("File Reader Error: ", error)
  // }
}

export function storageAvailable() {
  if (typeof localStorage === "object") {
    try {
      localStorage.setItem("localStorageAvailabilityTest", "1")
      localStorage.removeItem("localStorageAvailabilityTest")
      return true
    } catch (e) {
      Storage.prototype._setItem = Storage.prototype.setItem
      Storage.prototype.setItem = function () {}
      return false
    }
  }
  return false
}

export function parseYoutubeURL(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}

export function isTextElement(type: string | null) {
  if (!type) return false
  return textElements.some((el) => type.includes(el))
}

export const isValidObjectID = new RegExp("^[0-9a-fA-F]{24}$")

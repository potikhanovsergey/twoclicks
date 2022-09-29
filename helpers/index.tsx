import { MantineTheme } from "@mantine/core"
import dynamic from "next/dynamic"
import React, { useMemo } from "react"
import shortid from "shortid"
import { ICanvasBlockProps, ICanvasBlock, IPage } from "types"
import WithEditToolbar from "app/build/WithEditToolbar"
import { BuildStore } from "store/build"
import { ExtendedCustomColors } from "pages/_app"
import WithEditable from "app/build/WithEditable"
import { ICanvasPalette } from "types"
import Link from "next/link"
import { IconPickerProps } from "app/core/components/base/IconPicker"
import { canvasBuildingBlocks } from "./blocks"
import TextEditor from "app/core/components/TextEditor"
import { observer } from "mobx-react-lite"

const IconPicker = dynamic<IconPickerProps>(() =>
  import("app/core/components/base/IconPicker").then((module) => module)
)

const traverseProp = ({
  propValue,
  prop,
  shouldFlat,
  parentID,
  withContentEditable,
  withEditToolbar,
  withPalette,
  palette,
  type,
}: {
  propValue: any
  prop: string
  shouldFlat: boolean
  parentID: string
  withContentEditable: boolean
  withEditToolbar: boolean
  withPalette: boolean
  palette: ICanvasPalette | undefined
  type: string
}) => {
  if (prop === "children" && typeof propValue === "string" && withContentEditable) {
    if (type.includes("button") || type.includes("badge")) {
      return (
        <WithEditable parentID={parentID} withContentEditable={withContentEditable}>
          {propValue}
        </WithEditable>
      )
    } else {
      return (
        <TextEditor
          initialHtml={propValue}
          onChange={(html) => {
            let parent = BuildStore.data.flattenBlocks[parentID]
            if (parent) {
              BuildStore.changeProp({ id: parentID, newProps: { children: html } })
            }
          }}
        />
      )
    }
  }

  if (propValue && typeof propValue === "object" && propValue.type) {
    return (
      <RenderJSXFromBlock
        element={propValue}
        shouldFlat={shouldFlat}
        parentID={parentID}
        withContentEditable={withContentEditable}
        withEditToolbar={withEditToolbar}
        withPalette={withPalette}
        palette={palette}
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
}

export const TypeVariants: {
  [key: string]: string[]
} = {
  "@mantine/core/button": ["gradient", "filled", "outline", "light", "subtle"],
  "@mantine/core/themeicon": ["filled", "light", "outline", "gradient", "default"],
  "@mantine/core/actionicon": ["transparent", "subtle", "filled", "light", "outline", "default"],
  "@mantine/core/text": ["gradient", "filled"],
  "@mantine/core/title": ["gradient", "filled"],
  "@mantine/core/badge": ["gradient", "filled", "light", "outline", "dot"],
}

const sizes = ["xs", "sm", "md", "lg", "xl"]

export const TypeSizes: {
  [key: string]: string[]
} = {
  "@mantine/core/button": sizes,
  "@mantine/core/text": sizes,
  "@mantine/core/themeicon": sizes,
  "@mantine/core/actionicon": sizes,
  "@mantine/core/badge": sizes,
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
  return PaletteTypePropColor[type.toLowerCase()]
}

export function getVariantsByType(type: string) {
  return TypeVariants[type.toLowerCase()]
}

export function getSizesByType(type: string) {
  return TypeSizes[type.toLowerCase()]
}

export function getRadiusesByType(type: string) {
  return TypeRadius[type.toLowerCase()]
}

export function getGradientsByType(type: string) {
  return TypeGradients[type.toLowerCase()]
}

export const RenderJSXFromBlock = observer(
  ({
    element,
    shouldFlat = false,
    parentID = null,
    withContentEditable = false,
    withEditToolbar = false,
    withPalette = false,
    sectionIndex,
    palette,
  }: {
    element: ICanvasBlock
    shouldFlat?: boolean
    parentID?: string | null
    withContentEditable?: boolean
    withEditToolbar?: boolean
    withPalette?: boolean
    sectionIndex?: number
    palette?: ICanvasPalette
  }) => {
    const el = JSON.parse(JSON.stringify(element)) as ICanvasBlock // to not modify element in the arguments
    el.type = el.type.toLowerCase()
    const TagName = canvasBuildingBlocks[el.type] || el.type // if neither of the above, then the element is a block with children and the recursive call is needed.

    const props = useMemo(() => {
      const newProps = el.props as ICanvasBlockProps // not only children, byt any other element's prop can be React.Node or JSX.Element.
      // We need to traverse it to make sure all props are rendered as they should

      if (
        ["@mantine/core/button", "@mantine/core/themeicon", "@mantine/core/actionicon"].includes(
          el.type
        ) &&
        withContentEditable
      ) {
        newProps.component = "span"
      }

      if (withPalette) {
        if (getPaletteByType(el.type) && !newProps[getPaletteByType(el.type).prop]) {
          newProps[getPaletteByType(el.type).prop] = palette?.[getPaletteByType(el.type).color]
        }
      }

      for (const prop in newProps) {
        if (Array.isArray(newProps[prop])) {
          for (let i = 0; i < newProps[prop].length; i++) {
            newProps[prop][i] = traverseProp({
              propValue: newProps[prop][i],
              prop,
              shouldFlat,
              parentID: el.id,
              withContentEditable,
              withEditToolbar,
              withPalette,
              palette,
              type: el.type,
            })
          }
        } else {
          const traversedProp = traverseProp({
            propValue: newProps[prop],
            prop,
            shouldFlat,
            parentID: el.id,
            withContentEditable,
            withEditToolbar,
            withPalette,
            palette,
            type: el.type,
          })
          if (traversedProp) {
            newProps[prop] = traversedProp
          }
        }
      }
      return newProps
    }, [el])

    if (withEditToolbar && el?.editType === "icon") {
      return (
        <IconPicker
          key={el.id}
          icon={<TagName {...props} />}
          onChange={(icon) => {
            if (icon?.props) {
              let newProps = icon.props as ICanvasBlockProps
              BuildStore.changeProp({ id: el.id, newProps })
            }
          }}
        />
      )
    }

    if (withEditToolbar && el.editType) {
      return (
        <WithEditToolbar
          key={el.id}
          parentID={parentID}
          props={props}
          sectionIndex={sectionIndex}
          element={el}
        >
          <TagName {...props} />
        </WithEditToolbar>
      )
    }

    const { children, ...restProps } = props

    if (typeof children === "string" && !el.type.includes("button") && !el.type.includes("badge")) {
      return <TagName key={el.id} {...restProps} dangerouslySetInnerHTML={{ __html: children }} />
    }

    if (props.component === "a" && props.href) {
      const { href, ...restOfProps } = props
      return (
        <Link passHref key={el.id} href={href}>
          <TagName {...restOfProps} />
        </Link>
      )
    } else {
      return <TagName key={el.id} {...props} />
    }
  }
)

const getElementType = (value) => {
  if (typeof value === "function") {
    if (value?.name === "MediaQuery") {
      return value.name
    }

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
        return type
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
  reader.onerror = function (error) {
    console.log("File Reader Error: ", error)
  }
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

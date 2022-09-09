import {
  ButtonProps,
  StackProps,
  GroupProps,
  TextInputProps,
  TextProps,
  Box,
  TitleProps,
  ContainerProps,
  ImageProps,
  MantineTheme,
  MediaQueryProps,
  ThemeIconProps,
  SimpleGridProps,
  ColProps,
  GridProps,
  OverlayProps,
} from "@mantine/core"
import dynamic from "next/dynamic"
import React, { ReactNode } from "react"
import shortid from "shortid"
import { ICanvasElement, ICanvasBlockProps, ICanvasBlock, IPortfolio } from "types"
import WithEditToolbar from "app/build/WithEditToolbar"
import { BuildStore } from "store/build"
import zlib from "zlib"
import { IconBaseProps } from "react-icons"
import { ExtendedCustomColors } from "pages/_app"
import WithEditable from "app/build/WithEditable"
import { ICanvasPalette } from "types"
import IconPicker from "app/core/components/base/IconPicker"
import { e } from "@blitzjs/auth/dist/index-57d74361"
import Quill from "app/core/components/base/Quill"

type CanvasButtonProps = ButtonProps & React.ComponentPropsWithoutRef<"button">

export const canvasBuildingBlocks = {
  "@mantine/core/button": dynamic<CanvasButtonProps>(() =>
    import("@mantine/core").then((module) => module.Button)
  ),
  "@mantine/core/stack": dynamic<StackProps>(() =>
    import("@mantine/core").then((module) => module.Stack)
  ),
  "@mantine/core/group": dynamic<GroupProps>(() =>
    import("@mantine/core").then((module) => module.Group)
  ),
  "@mantine/core/textinput": dynamic<TextInputProps>(() =>
    import("@mantine/core").then((module) => module.TextInput)
  ),
  "@mantine/core/text": dynamic<TextProps>(() =>
    import("@mantine/core").then((module) => module.Text)
  ),
  "@mantine/core/title": dynamic<TitleProps>(() =>
    import("@mantine/core").then((module) => module.Title)
  ),
  "@mantine/core/container": dynamic<ContainerProps>(() =>
    import("@mantine/core").then((module) => module.Container)
  ),
  "@mantine/core/image": dynamic<ImageProps>(() =>
    import("@mantine/core").then((module) => module.Image)
  ),
  "@mantine/core/box": dynamic<ImageProps>(() =>
    import("@mantine/core").then((module) => module.Box)
  ),
  "@mantine/core/themeicon": dynamic<ThemeIconProps>(() =>
    import("@mantine/core").then((module) => module.ThemeIcon)
  ),
  "@mantine/core/simplegrid": dynamic<SimpleGridProps>(() =>
    import("@mantine/core").then((module) => module.SimpleGrid)
  ),
  "@mantine/core/grid": dynamic<GridProps>(() =>
    import("@mantine/core").then((module) => module.Grid)
  ),
  "@mantine/core/col": dynamic<ColProps>(() =>
    import("@mantine/core").then((module) => module.Col)
  ),
  "@mantine/core/overlay": dynamic<OverlayProps>(() =>
    import("@mantine/core").then((module) => module.Overlay)
  ),
  mediaquery: dynamic<MediaQueryProps>(() =>
    import("@mantine/core").then((module) => module.MediaQuery)
  ),
  iconbase: dynamic<IconBaseProps>(() => import("react-icons").then((module) => module.IconBase)),
  "@skillcase/mantineTest": dynamic(() =>
    import("app/build/sections/MantineTest").then((module) => module)
  ),
  mantinetest: dynamic(() => import("app/build/sections/MantineTest").then((module) => module)),
}

function traverseProp({
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
}) {
  if (prop === "children" && typeof propValue === "string" && withContentEditable) {
    const typeLC = type.toLowerCase()
    if (typeLC.includes("button") || typeLC.includes("title")) {
      return (
        <WithEditable
          parentID={parentID}
          withContentEditable={withContentEditable}
          key={shortid.generate()}
        >
          {propValue}
        </WithEditable>
      )
    }
    return (
      <Quill
        defaultValue={propValue as string}
        placeholder="Enter text"
        onBlur={(_, _1, editor) => {
          const html = editor.getHTML()
          let parent = BuildStore.data.flattenBlocks[parentID]
          const begining = html.substring(0, 3)
          const end = html.substring(html.length - 4, html.length)
          const insideTag = html.substring(3, html.length - 4)
          if (parent) {
            if (
              propValue !== html &&
              !(begining === "<p>" && end === "</p>" && insideTag === propValue)
            ) {
              BuildStore.changeProp({ id: parentID, newProps: { children: html } })
            }
          }
        }}
      />
    )
  }
  if (propValue && typeof propValue === "object" && propValue.type) {
    return renderJSXFromBlock({
      element: propValue,
      shouldFlat,
      parentID,
      withContentEditable,
      withEditToolbar,
      withPalette,
      palette,
    })
  } else {
    return propValue
  }
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
}

export const TypeVariants: {
  [key: string]: string[]
} = {
  "@mantine/core/button": ["gradient", "filled", "outline", "light", "subtle"],
  "@mantine/core/themeicon": ["filled", "light", "outline", "gradient"],
}

const sizes = ["xs", "sm", "md", "lg", "xl"]

export const TypeSizes: {
  [key: string]: string[]
} = {
  "@mantine/core/button": sizes,
  "@mantine/core/text": sizes,
  "@mantine/core/themeicon": sizes,
}

export const TypeRadius: {
  [key: string]: string[]
} = {
  "@mantine/core/button": sizes,
  "@mantine/core/image": sizes,
  "@mantine/core/themeicon": sizes,
}

export const TypeGradients: {
  [key: string]: boolean
} = {
  "@mantine/core/button": true,
  "@mantine/core/themeicon": true,
}

export const TypeIcons: {
  [key: string]: string[]
} = {
  "@mantine/core/button": ["leftIcon", "rightIcon"],
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

export function renderJSXFromBlock({
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
}) {
  // recursive function that returns JSX of JSON data provided.
  if (!element) return <></> // the deepest call of recursive function, when the element's parent has no props.children;

  // TODO: It's questionable if we need these lines
  // if (typeof element === "string") {
  //   return (
  //     <WithEditable parentID={parentID} withContentEditable={withContentEditable}>
  //       {element}
  //     </WithEditable>
  //   )
  // }

  const el = JSON.parse(JSON.stringify(element)) as ICanvasBlock // to not modify element in the arguments
  const TagName = canvasBuildingBlocks[element?.type?.toLowerCase()] || el.type // if neither of the above, then the element is a block with children and the recursive call is needed.
  const props = el.props as ICanvasBlockProps // Json type in prisma doesn't allow link types to its properties, we have to link in that way

  // not only children, byt any other element's prop can be React.Node or JSX.Element.
  // We need to traverse it to make sure all props are rendered as they should
  for (const prop in props) {
    if (Array.isArray(props[prop])) {
      for (let i = 0; i < props[prop].length; i++) {
        props[prop][i] = traverseProp({
          propValue: props[prop][i],
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
        propValue: props[prop],
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
        props[prop] = traversedProp
      }
    }
  }

  if (withPalette) {
    const type = el.type
    if (getPaletteByType(type) && !props[getPaletteByType(type).prop]) {
      props[getPaletteByType(type).prop] = palette?.[getPaletteByType(type).color]
    }
  }

  if (
    ["@mantine/core/button", "@mantine/core/themeicon", "@mantine/core/actionicon"].includes(
      el.type.toLowerCase()
    ) &&
    withContentEditable
  ) {
    props.component = "span"
  }

  // if (el.type.toLowerCase() === "@mantine/core/image") {
  //   props.withPlaceholder = true
  // }

  if (withEditToolbar && el?.editType === "icon") {
    return (
      <IconPicker
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
        id={el.id}
        parentID={parentID}
        key={shortid.generate()}
        editType={el.editType}
        name={el.name}
        type={el.type}
        props={props}
        sectionIndex={sectionIndex}
        element={element}
      >
        <TagName {...props} />
      </WithEditToolbar>
    )
  }

  const { children, ...restProps } = props

  if (typeof children === "string" && !el.type?.toLowerCase().includes("button")) {
    return (
      <TagName
        key={shortid.generate()}
        {...restProps}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    )
  }

  return <TagName key={shortid.generate()} {...props} />
}

export const deflate = (data) => {
  const dataBuffer = Buffer.from(JSON.stringify(data))
  return zlib.deflateSync(dataBuffer).toString("base64")
}

export const inflateBase64 = (str: string) => {
  return JSON.parse(zlib.inflateSync(Buffer.from(str, "base64")).toString())
}
const getElementType = (value) => {
  if (typeof value === "function") {
    // react-icon (and maybe some other components) has type value of function, thus it needs to be rendered to retrieve it's name and props
    if (value?.name === "MediaQuery") {
      return value.name
    }
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

export const formatDate = (inputDate) => {
  let date, month, year
  date = inputDate.getDate()
  month = inputDate.getMonth() + 1
  year = inputDate.getFullYear()
  date = date.toString().padStart(2, "0")
  month = month.toString().padStart(2, "0")
  return `${date}/${month}/${year}`
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

export function traverseAddIDs(obj) {
  if (typeof obj === "object" && obj?.type) {
    if (!obj.id) obj.id = shortid.generate()
    BuildStore.pushFlatten(obj)
  }
  if (obj && typeof obj === "object") {
    for (let k in obj) {
      if (k === "id") continue
      if (typeof obj[k] === "object" && obj[k]?.type) {
        if (!obj.id) obj.id = shortid.generate()
        BuildStore.pushFlatten(obj[k])
      }
      traverseAddIDs(obj[k])
    }
  }
}

export function getPortfolioWithInflatedData(portfolio) {
  return {
    ...portfolio,
    data: inflateBase64(portfolio.data),
  } as IPortfolio
}

export function getPortfolioWithDeflatedData(portfolio) {
  return {
    ...portfolio,
    data: deflate(portfolio.data),
  } as IPortfolio & { data: string }
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

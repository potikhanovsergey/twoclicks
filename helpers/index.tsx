import {
  ButtonProps,
  StackProps,
  GroupProps,
  TextInputProps,
  TextProps,
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
  CardProps,
  BadgeProps,
  AspectRatioProps,
  ActionIconProps,
} from "@mantine/core"
import dynamic from "next/dynamic"
import React from "react"
import shortid from "shortid"
import { ICanvasBlockProps, ICanvasBlock, IPage } from "types"
import WithEditToolbar from "app/build/WithEditToolbar"
import { BuildStore } from "store/build"
import zlib from "zlib"
import { IconBaseProps } from "react-icons"
import { ExtendedCustomColors } from "pages/_app"
import WithEditable from "app/build/WithEditable"
import { ICanvasPalette } from "types"
import { ReactQuillProps } from "react-quill"
import Link from "next/link"
import { IconPickerProps } from "app/core/components/base/IconPicker"

const IconPicker = dynamic<IconPickerProps>(() =>
  import("app/core/components/base/IconPicker").then((module) => module)
)

const Quill = dynamic<ReactQuillProps & { type: string }>(
  () => import("app/core/components/base/Quill").then((module) => module),
  {
    ssr: false,
  }
)

type CanvasButtonProps = ButtonProps & React.ComponentPropsWithoutRef<"button">

export const canvasBuildingBlocks = {
  "@mantine/core/button": dynamic<CanvasButtonProps>(() =>
    import("@mantine/core/cjs/Button/Button").then((module) => module.Button)
  ),
  "@mantine/core/stack": dynamic<StackProps>(() =>
    import("@mantine/core/cjs/Stack/Stack").then((module) => module.Stack)
  ),
  "@mantine/core/group": dynamic<GroupProps>(() =>
    import("@mantine/core/cjs/Group/Group").then((module) => module.Group)
  ),
  "@mantine/core/textinput": dynamic<TextInputProps>(() =>
    import("@mantine/core/cjs/TextInput/TextInput").then((module) => module.TextInput)
  ),
  "@mantine/core/text": dynamic<TextProps>(() =>
    import("@mantine/core/cjs/Text/Text").then((module) => module.Text)
  ),
  "@mantine/core/title": dynamic<TitleProps>(() =>
    import("@mantine/core/cjs/Title/Title").then((module) => module.Title)
  ),
  "@mantine/core/container": dynamic<ContainerProps>(() =>
    import("@mantine/core/cjs/Container/Container").then((module) => module.Container)
  ),
  "@mantine/core/image": dynamic<ImageProps>(() =>
    import("@mantine/core/cjs/Image/Image").then((module) => module.Image)
  ),
  "@mantine/core/box": dynamic<ImageProps>(() =>
    import("@mantine/core/cjs/Box/Box").then((module) => module.Box)
  ),
  "@mantine/core/themeicon": dynamic<ThemeIconProps>(() =>
    import("@mantine/core/cjs/ThemeIcon/ThemeIcon").then((module) => module.ThemeIcon)
  ),
  "@mantine/core/simplegrid": dynamic<SimpleGridProps>(() =>
    import("@mantine/core/cjs/SimpleGrid/SimpleGrid").then((module) => module.SimpleGrid)
  ),
  "@mantine/core/grid": dynamic<GridProps>(() =>
    import("@mantine/core/cjs/Grid/Grid").then((module) => module.Grid)
  ),
  "@mantine/core/col": dynamic<ColProps>(() =>
    import("@mantine/core/cjs/Grid/Col/Col").then((module) => module.Col)
  ),
  "@mantine/core/overlay": dynamic<OverlayProps>(() =>
    import("@mantine/core/cjs/Overlay/Overlay").then((module) => module.Overlay)
  ),
  "@mantine/core/badge": dynamic<BadgeProps>(() =>
    import("@mantine/core/cjs/Badge/Badge").then((module) => module.Badge)
  ),
  "@mantine/core/card": dynamic<CardProps>(() =>
    import("@mantine/core/cjs/Card/Card").then((module) => module.Card)
  ),
  "@mantine/core/aspectratio": dynamic<AspectRatioProps>(() =>
    import("@mantine/core/cjs/AspectRatio/AspectRatio").then((module) => module.AspectRatio)
  ),
  "@mantine/core/actionicon": dynamic<ActionIconProps>(() =>
    import("@mantine/core/cjs/ActionIcon/ActionIcon").then((module) => module.ActionIcon)
  ),
  mediaquery: dynamic<MediaQueryProps>(() =>
    import("@mantine/core/cjs/MediaQuery/MediaQuery").then((module) => module.MediaQuery)
  ),
  iconbase: dynamic<IconBaseProps>(() => import("react-icons").then((module) => module.IconBase)),
  youtubeframe: dynamic(() => import("app/core/components/YoutubeFrame")),
}

const WithEditableTypes = ["button", "badge"]

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
  const typeLC = type.toLowerCase()

  if (prop === "children" && typeof propValue === "string" && withContentEditable) {
    if (WithEditableTypes.some((t) => typeLC.includes(t))) {
      // elements that are listed inside WithEditableTypes const
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
        key={shortid.generate()}
        type={typeLC}
        defaultValue={propValue || ""}
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
    return RenderJSXFromBlock({
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

export function RenderJSXFromBlock({
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

  const el = JSON.parse(JSON.stringify(element)) as ICanvasBlock // to not modify element in the arguments
  const typeLC = el.type?.toLowerCase()
  const TagName = canvasBuildingBlocks[typeLC] || el.type // if neither of the above, then the element is a block with children and the recursive call is needed.
  const props = el.props as ICanvasBlockProps // Json type in prisma doesn't allow link types to its properties, we have to link in that way

  if (typeLC.includes("badge")) {
    console.log(TagName, props, <TagName {...props} />)
  }

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
          type: typeLC,
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
        type: typeLC,
      })
      if (traversedProp) {
        props[prop] = traversedProp
      }
    }
  }

  if (withPalette) {
    if (getPaletteByType(typeLC) && !props[getPaletteByType(typeLC).prop]) {
      props[getPaletteByType(typeLC).prop] = palette?.[getPaletteByType(typeLC).color]
    }
  }

  if (
    ["@mantine/core/button", "@mantine/core/themeicon", "@mantine/core/actionicon"].includes(
      typeLC
    ) &&
    withContentEditable
  ) {
    props.component = "span"
  }

  // if (typeLC.includes("image")) {
  //   props.withPlaceholder = true
  // }

  if (withEditToolbar && el?.editType === "icon") {
    return (
      <IconPicker
        key={shortid.generate()}
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
        type={typeLC}
        props={props}
        sectionIndex={sectionIndex}
        element={element}
      >
        <TagName {...props} />
      </WithEditToolbar>
    )
  }

  const { children, ...restProps } = props

  if (typeof children === "string" && !typeLC.includes("button") && !typeLC.includes("badge")) {
    return (
      <TagName
        key={shortid.generate()}
        {...restProps}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    )
  }

  if (props.component === "a" && props.href) {
    const { href, ...restOfProps } = props
    return (
      <Link passHref key={shortid.generate()} href={href}>
        <TagName {...restOfProps} />
      </Link>
    )
  } else {
    return <TagName key={shortid.generate()} {...props} />
  }
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

export function traverseAddIDs(obj) {
  if (obj && typeof obj === "object") {
    for (let k in obj) {
      if (k === "id") continue
      traverseAddIDs(obj[k])
    }
  }
  if (typeof obj === "object" && (obj?.editType || obj?.props?.children)) {
    if (!obj.id) obj.id = shortid.generate()
    BuildStore.pushFlatten(obj)
  }
}

export function getPageWithInflatedData(page) {
  return {
    ...page,
    data: inflateBase64(page.data),
  } as IPage
}

export function getPageWithDeflatedData(page) {
  return {
    ...page,
    data: deflate(page.data),
  } as IPage & { data: string }
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

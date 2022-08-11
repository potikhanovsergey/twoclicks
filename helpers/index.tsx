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
} from "@mantine/core"
import dynamic from "next/dynamic"
import React, { ReactNode } from "react"
import shortid from "shortid"
import { ICanvasElement, ICanvasBlockProps, ICanvasBlock, IPortfolio } from "types"
import WithEditToolbar from "app/build/WithEditToolbar"
import { BuildStore } from "store/build"
import zlib from "zlib"
import { IconBaseProps } from "react-icons"
import { useMutation } from "@blitzjs/rpc"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { useSession } from "@blitzjs/auth"
import { ExtendedCustomColors } from "pages/_app"

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
  "@mantine/core/textInput": dynamic<TextInputProps>(() =>
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
  iconbase: dynamic<IconBaseProps>(() => import("react-icons").then((module) => module.IconBase)),
}

export const WithEditable = ({ children, parentID, withContentEditable }) => {
  const [updatePortfolioMutation] = useMutation(updatePortfolio)
  const session = useSession()
  const { savePortfolio } = BuildStore
  return (
    <Box
      contentEditable={Boolean(withContentEditable)}
      className="content-editable"
      suppressContentEditableWarning
      component="span"
      spellCheck={false}
      sx={({}) => ({
        ":empty": { paddingRight: "16px" },
        display: "inline-block",
        minWidth: "30px",
        outline: "none",
        wordBreak: "break-word",
      })}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onPaste={(e) => {
        // Prevent the default action
        e.preventDefault()

        // Get the copied text from the clipboard
        const text = e.clipboardData
          ? (e.originalEvent || e).clipboardData.getData("text/plain")
          : ""

        // Insert text at the current position of caret
        const range = document.getSelection()?.getRangeAt(0)
        if (range) {
          range.deleteContents()

          const textNode = document.createTextNode(text)
          range.insertNode(textNode)
          range.selectNodeContents(textNode)
          range.collapse(false)

          const selection = window.getSelection()
          if (selection) {
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
      }}
      onKeyDown={(e) => {
        ;(e.ctrlKey || e.metaKey) &&
          ![`c`, `v`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `z`].includes(e.key) &&
          e.preventDefault()

        const el = e.target
        const parentButton = el?.closest("button")
        if (parentButton && e.key === "Enter") {
          e.preventDefault()
        }
        // 32 = space button
        if (parentButton && e.which === 32) {
          e.preventDefault()
          // Insert text at the current position of caret
          const range = document.getSelection()?.getRangeAt(0)
          if (range) {
            range.deleteContents()

            const textNode = document.createTextNode(" ")
            range.insertNode(textNode)
            range.selectNodeContents(textNode)
            range.collapse(false)

            const selection = window.getSelection()
            if (selection) {
              selection.removeAllRanges()
              selection.addRange(range)
            }
          }
        }
        if (
          e.key === "s" &&
          (navigator?.userAgentData?.platform.match("mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault()
          void savePortfolio({ session, updatePortfolioMutation })
        }
      }}
      onBlur={(e) => {
        if (e?.target?.innerText) {
          let parent = BuildStore.data.flattenBlocks[parentID]
          if (parent) {
            let parentProps = parent.props as ICanvasBlockProps
            if (parentProps?.children !== e.target.innerText) {
              BuildStore.changeProp({ id: parentID, newProps: { children: e.target.innerText } })
            }
          }
        }
      }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}

function traverseProp({
  propValue,
  prop,
  shouldFlat,
  parentID,
  withContentEditable,
  withEditToolbar,
  withPalette,
}) {
  if (prop === "children" && typeof propValue === "string" && withContentEditable)
    return (
      <WithEditable parentID={parentID} withContentEditable={withContentEditable}>
        {propValue}
      </WithEditable>
    )
  if (propValue && typeof propValue === "object" && propValue.type) {
    return renderJSXFromBlock({
      element: propValue,
      shouldFlat,
      parentID,
      withContentEditable,
      withEditToolbar,
      withPalette,
    })
  } else {
    return propValue
  }
}

const PaletteTypePropColor: {
  [key: string]: {
    prop: string
    color: string
  }
} = {
  "@mantine/core/button": {
    prop: "color",
    color: "primary",
  },
}

export function renderJSXFromBlock({
  element,
  shouldFlat = false,
  parentID = null,
  withContentEditable = false,
  withEditToolbar = false,
  withPalette = false,
}: {
  element: ICanvasElement
  shouldFlat?: boolean
  parentID?: string | null
  withContentEditable?: boolean
  withEditToolbar?: boolean
  withPalette?: boolean
}) {
  // recursive function that returns JSX of JSON data provided.
  if (!element) return <></> // the deepest call of recursive function, when the element's parent has no props.children;

  // TODO: It's questionable if we need these lines
  if (typeof element === "string") {
    return (
      <WithEditable parentID={parentID} withContentEditable={withContentEditable}>
        {element}
      </WithEditable>
    )
  }

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
      })
      if (traversedProp) {
        props[prop] = traversedProp
      }
    }
  }

  if (withPalette) {
    const lcType = el.type.toLowerCase()
    if (PaletteTypePropColor[lcType] && !props[PaletteTypePropColor[lcType].prop]) {
      props[PaletteTypePropColor[lcType].prop] =
        BuildStore.data.palette?.[PaletteTypePropColor[lcType].color]
    }
    // if (el.type.toLowerCase().match("button") && !props.color) {
    //   props.color = BuildStore.data.palette?.primary
    // }
  }

  if (withEditToolbar && (element.editType === "element" || element.editType === "section")) {
    return (
      <WithEditToolbar
        id={el.id}
        parentID={parentID}
        key={shortid.generate()}
        editType={el.editType}
      >
        <TagName {...props} />
      </WithEditToolbar>
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
    const c = value()
    const name = c?.type?.displayName || c?.type?.name
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
    obj.id = shortid.generate()
    BuildStore.pushFlatten(obj)
  }
  if (obj && typeof obj === "object") {
    for (let k in obj) {
      if (k === "id") continue
      if (typeof obj[k] === "object" && obj[k]?.type) {
        obj[k].id = shortid.generate()
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

import {
  ButtonProps,
  StackProps,
  GroupProps,
  TextInputProps,
  TabsProps,
  TabProps,
  Text,
  TextProps,
  Box,
  TitleProps,
  ContainerProps,
  ImageProps,
} from "@mantine/core"
import dynamic from "next/dynamic"
import React, { ReactNode, useRef } from "react"
import shortid from "shortid"
// import { CanvasStore } from "../../../store/build"
import { ICanvasElement, ICanvasBlockProps, ICanvasBlock } from "types"
import WithElementEdit from "app/build/WithElementEdit"
import { BuildStore } from "store/build"
import zlib from "zlib"
import { Portfolio } from "@prisma/client"
import { IconBase, IconBaseProps } from "react-icons"
import { VscLayers } from "react-icons/vsc"

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
      onKeyDown={(e) => {
        const el = e.target
        const parentButton = el.closest("button")
        if (parentButton && e.key === "Enter") {
          e.preventDefault()
        }
        // 32 = space button
        if (parentButton && e.which === 32) {
          e.preventDefault()
          document.execCommand("insertText", false, " ") // todo: remove deprecated command
        }
      }}
      onBlur={(e) => {
        if (e?.target?.innerHTML) {
          let parent = BuildStore.data.flattenBlocks[parentID]
          if (parent) {
            let parentProps = parent.props as ICanvasBlockProps
            if (parentProps?.children !== e.target.innerHTML) {
              BuildStore.changeProp({ id: parentID, newProps: { children: e.target.innerHTML } })
            }
          }
        }
      }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}

export const recursiveTagName = ({
  element,
  shouldFlat = false,
  parentID = null,
  withContentEditable = false,
}: {
  element: ICanvasElement
  shouldFlat?: boolean
  parentID?: string | null
  withContentEditable?: boolean
}) => {
  // recursive function that returns JSX of JSON data provided.
  if (!element) return <></> // the deepest call of recursive function, when the element's parent has no props.children;
  if (typeof element === "string")
    return (
      <WithEditable parentID={parentID} withContentEditable={withContentEditable}>
        {element}
      </WithEditable>
    )

  const el = JSON.parse(JSON.stringify(element)) as ICanvasBlock
  const TagName = canvasBuildingBlocks[element?.type?.toLowerCase?.()] || element.type // if neither of the above, then the element is a block with children and the recursive call is needed.
  const props = JSON.parse(JSON.stringify(el.props)) as ICanvasBlockProps // Json type in prisma doesn't allow link types to its properties, we have to link in that way

  for (const prop in props) {
    // Любой проп может быть JSX элементом, который нужно отрендерить (нужно переписать логику с children сюда, но чилдренам передавать parentID)
    if (prop === "children") continue
    const propValue = props[prop]
    if (
      typeof propValue === "object" &&
      propValue.type &&
      canvasBuildingBlocks[propValue?.type?.toLowerCase?.()]
    ) {
      console.log("Тут ломается иконка", props[prop])
      props[prop] = recursiveTagName({
        element: propValue,
        shouldFlat: false,
        withContentEditable: false,
      })
      console.log(props[prop])
    }
  }

  const children: ReactNode | undefined = props?.children ? (
    typeof props.children === "string" ? (
      <WithEditable parentID={element.id} withContentEditable={withContentEditable}>
        {props.children}
      </WithEditable>
    ) : Array.isArray(props?.children) ? (
      props.children.map((child: ICanvasElement) => {
        const key = shortid.generate()
        return React.cloneElement(
          recursiveTagName({
            element: child,
            shouldFlat,
            parentID: typeof element === "string" ? undefined : element?.id,
            withContentEditable,
          }),
          { key }
        ) // looking for array of children in recursion;
      })
    ) : (
      React.cloneElement(
        recursiveTagName({
          element: props.children,
          shouldFlat,
          parentID: element.id,
          withContentEditable,
        })
      )
    )
  ) : undefined

  if (shouldFlat) {
    BuildStore.pushFlatten(element)
  }
  if (element.editType === "element") {
    return (
      <WithElementEdit id={element.id} parentID={parentID} key={element.id}>
        <TagName {...props}>{children}</TagName>
      </WithElementEdit>
    )
  }
  return (
    <TagName key={element.id} {...props}>
      {children}
    </TagName>
  )
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
    const c = value()
    const name = c?.type?.displayName || c?.type?.name
    console.log("C", c)
    if (name === "IconBase") {
      console.log("ICON BASE", c)
      return [name, c.props]
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
        return getElementType(value)
      default:
        return value
    }
  }
  const obj = JSON.parse(JSON.stringify(element, replacer))
  traverseJSON(obj)
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

function traverseJSON(obj) {
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      if (Array.isArray(obj[k]?.type)) {
        obj[k].props = obj[k].type[1]
        obj[k].type = obj[k].type[0]
      }
      traverseJSON(obj[k])
      // traverseJSON(obj[k].props);
    } else {
      // base case, stop recurring
    }
  }
}

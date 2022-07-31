import {
  ButtonProps,
  StackProps,
  GroupProps,
  TextInputProps,
  TabsProps,
  TabProps,
  Text,
  TextProps,
} from "@mantine/core"
import dynamic from "next/dynamic"
import React, { ReactNode, useRef } from "react"
import shortid from "shortid"
// import { CanvasStore } from "../../../store/build"
import { ICanvasElement, ICanvasBlockProps } from "types"
import WithElementEdit from "app/build/WithElementEdit"
import { BuildStore } from "store/build"
import zlib from "zlib"

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
}

export const recursiveTagName = ({
  element,
  shouldFlat = false,
  parentID = null,
}: {
  element: ICanvasElement
  shouldFlat?: boolean
  parentID?: string | null
  isTextEditable?: boolean
}) => {
  // recursive function that returns JSX of JSON data provided.
  if (!element) return <></> // the deepest call of recursive function, when the element's parent has no props.children;
  if (typeof element === "string") return <>{element}</>

  const TagName = canvasBuildingBlocks[element.type] // if neither of the above, then the element is a block with children and the recursive call is needed.
  const props = element.props as ICanvasBlockProps // Json type in prisma doesn't allow link types to its properties, we have to link in that way

  const children: ReactNode | undefined = props.children
    ? typeof props.children === "string"
      ? props.children
      : props.children.map((child: ICanvasElement) => {
          const key = shortid.generate()
          return React.cloneElement(
            recursiveTagName({ element: child, shouldFlat, parentID: element.id }),
            { key }
          ) // looking for array of children in recursion;
        })
    : undefined

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
  if (typeof value === "string") return value
  if (typeof value === "object" && value?.displayName) return value.displayName
  return null
}

export function serialize(element: JSX.Element) {
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

  return JSON.stringify(element, replacer)
}

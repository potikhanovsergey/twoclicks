import {
  ButtonProps,
  StackProps,
  GroupProps,
  TextInputProps,
  TabsProps,
  TabProps,
} from "@mantine/core"
import dynamic from "next/dynamic"
import React, { ReactNode } from "react"
import shortid from "shortid"
// import { CanvasStore } from "../../../store/build"
import { ICanvasElement, ICanvasBlock } from "types"
import WithElementEdit from "app/build/WithElementEdit"

export const canvasBuildingBlocks = {
  button: dynamic<ButtonProps<"button">>(() =>
    import("@mantine/core").then((module) => module.Button)
  ),
  stack: dynamic<StackProps>(() => import("@mantine/core").then((module) => module.Stack)),
  group: dynamic<GroupProps>(() => import("@mantine/core").then((module) => module.Group)),
  textInput: dynamic<TextInputProps>(() =>
    import("@mantine/core").then((module) => module.TextInput)
  ),
  tabs: dynamic<TabsProps>(() => import("@mantine/core").then((module) => module.Tabs)),
  tab: dynamic<TabProps>(() => import("@mantine/core").then((module) => module.Tab)),
}

export const recursiveTagName = (
  element: ICanvasElement,
  shouldFlat: boolean = false,
  parentID: string | null = null
) => {
  // recursive function that returns JSX of JSON data provided.
  if (!element) return <></> // the deepest call of recursive function, when the element's parent has no props.children;
  if (typeof element === "string") return <>{element}</>
  const TagName = canvasBuildingBlocks[element.component] // if neither of the above, then the element is a block with children and the recursive call is needed.
  const children: undefined | ReactNode = !Array.isArray(element?.props?.children)
    ? undefined // self closing elements can't contain children inside
    : element.props.children.map((child: ICanvasBlock) => {
        const key = shortid.generate()
        return React.cloneElement(recursiveTagName(child, shouldFlat, element.id), { key }) // looking for array of children in recursion
      })
  if (shouldFlat) {
    // CanvasStore.pushFlatten(element) // todo: push flatten
  }
  if (element.editType === "element") {
    return (
      <WithElementEdit id={element.id} parentID={parentID} key={element.id}>
        <TagName {...element.props}>{children}</TagName>
      </WithElementEdit>
    )
  }
  return (
    <TagName key={element.id} {...element.props}>
      {children}
    </TagName>
  )
}
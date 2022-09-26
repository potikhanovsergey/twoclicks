import { ActionIcon, Tooltip } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { BiCopy } from "@react-icons/all-files/bi/BiCopy"
import { traverseAddIDs } from "helpers"
import { ICanvasBlockProps, ICanvasBlock } from "types"

interface IElementCopyButton {
  parentID: string | null
  element: ICanvasBlock
}

const ElementCopyButton = ({ parentID, element }: IElementCopyButton) => {
  const { deleteElement } = BuildStore
  const { t } = useTranslation("build")

  const handleElementCopy = () => {
    let insertIndex
    if (parentID) {
      const parent = BuildStore.data.flattenBlocks[parentID]
      const parentProps = parent?.props as ICanvasBlockProps
      const parentChildren = parentProps?.children as ICanvasBlock[] | ICanvasBlock

      if (parentChildren) {
        if (Array.isArray(parentChildren)) {
          const elIndex =
            parentChildren.findIndex && parentChildren.findIndex((el) => el.id === element.id)
          if (typeof elIndex === "number" && elIndex !== -1) {
            insertIndex = elIndex
          }
        } else {
          parentProps.children = [element]
        }
      }
    } else if (element.editType === "section") {
      insertIndex = BuildStore.data.blocks.findIndex((el) => el.id === element.id)
    }

    const copy = JSON.parse(JSON.stringify(element))
    traverseAddIDs(copy, true)
    BuildStore.push({
      block: {
        ...(copy as ICanvasBlock),
      },
      parentID,
      insertIndex,
    })
  }
  return (
    <Tooltip label="Duplicate" withArrow position={element.editType === "section" ? "left" : "top"}>
      <ActionIcon variant="subtle" color="violet" onClick={handleElementCopy}>
        <BiCopy />
      </ActionIcon>
    </Tooltip>
  )
}

export default ElementCopyButton

import { ActionIcon, Tooltip } from "@mantine/core"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BuildStore } from "store/build"

interface IElementDeleteButton {
  id: string
  parentID: string | null
  editType: string | null
}

const ElementDeleteButton = ({ id, parentID, editType }: IElementDeleteButton) => {
  const { deleteElement } = BuildStore
  return (
    <Tooltip
      label={editType === "section" ? "Delete section" : "Delete"}
      color="violet"
      withArrow
      position={editType === "section" ? "left" : "top"}
    >
      <ActionIcon
        color="red"
        size="md"
        onClick={() => {
          deleteElement({ id, parentID })
        }}
      >
        <RiDeleteBin6Line />
      </ActionIcon>
    </Tooltip>
  )
}

export default ElementDeleteButton
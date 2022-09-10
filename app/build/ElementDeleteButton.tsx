import { ActionIcon, Tooltip } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BuildStore } from "store/build"

interface IElementDeleteButton {
  id: string
  parentID: string | null
  editType: string | null
}

const ElementDeleteButton = ({ id, parentID, editType }: IElementDeleteButton) => {
  const { deleteElement } = BuildStore
  const { t } = useTranslation("pagesBuild")
  return (
    <Tooltip
      label={editType === "section" ? t("delete section") : t("delete")}
      withArrow
      position={editType === "section" ? "left" : "top"}
    >
      <ActionIcon
        color="red"
        size="md"
        onClick={() => {
          if (editType === "section") {
            deleteElement({ id, parentID })
          }
        }}
      >
        <RiDeleteBin6Line />
      </ActionIcon>
    </Tooltip>
  )
}

export default ElementDeleteButton

import { ActionIcon, Tooltip } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { RiDeleteBin6Line } from "@react-icons/all-files/ri/RiDeleteBin6Line"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"

interface IElementDeleteButton {
  parentID: string | null
  element: ICanvasBlock
  childrenProp?: string
}

const ElementDeleteButton = ({
  parentID,
  element,
  childrenProp = "children",
}: IElementDeleteButton) => {
  const { deleteElement } = BuildStore
  const { t } = useTranslation("build")
  return (
    <Tooltip
      label={element.editType === "section" ? t("delete section") : t("delete")}
      withArrow
      position={element.editType === "section" ? "left" : "top"}
    >
      <ActionIcon
        color="red"
        radius={0}
        onClick={() => {
          deleteElement({ id: element.id, parentID, childrenProp })
        }}
      >
        <RiDeleteBin6Line />
      </ActionIcon>
    </Tooltip>
  )
}

export default ElementDeleteButton

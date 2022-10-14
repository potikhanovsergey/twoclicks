import { ActionIcon, Tooltip } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"

import { AiOutlineVerticalAlignTop } from "@react-icons/all-files/ai/AiOutlineVerticalAlignTop"
import { CgScrollV } from "@react-icons/all-files/cg/CgScrollV"

interface IHeaderFixedEdit {
  element: ICanvasBlock
}

const HeaderFixedEdit = ({ element }: IHeaderFixedEdit) => {
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")
  return (
    <Tooltip
      position="left"
      withArrow
      label={element.props.fixed ? "Scrolls with page" : "Stays on top"}
    >
      <ActionIcon
        size="sm"
        variant="subtle"
        onClick={() => {
          changeProp({
            id: element.id,
            newProps: {
              fixed: !element.props.fixed,
            },
          })
          console.log(BuildStore.getElement(element.id))
        }}
      >
        {element.props.fixed ? <CgScrollV /> : <AiOutlineVerticalAlignTop />}
      </ActionIcon>
    </Tooltip>
  )
}

export default observer(HeaderFixedEdit)

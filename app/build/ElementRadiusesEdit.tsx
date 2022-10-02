import { ActionIcon, Button, Stack } from "@mantine/core"
import { getRadiusesByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { AiOutlineRadiusBottomleft } from "@react-icons/all-files/ai/AiOutlineRadiusBottomleft"
interface IElementRadiusesEdit {
  element: ICanvasBlock
}

const ElementRadiusesEdit = ({ element }: IElementRadiusesEdit) => {
  const radiuses = element.type ? getRadiusesByType(element.type) : undefined
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")

  return radiuses ? (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[element.id] === "radius",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[element.id] = "radius"
        },
      }}
      tooltipProps={{
        label: t("radius"),
        position: element.sectionLike ? "left" : "top",
        children: (
          <ActionIcon color="violet">
            <AiOutlineRadiusBottomleft />
          </ActionIcon>
        ),
      }}
      dropdownProps={{
        children: (
          <Stack spacing={0} align="stretch">
            {radiuses.map((radius) => (
              <Button
                variant="subtle"
                size="sm"
                compact
                key={radius}
                disabled={
                  element.props?.radius === undefined
                    ? radius === "filled"
                    : radius === element.props?.radius
                }
                onClick={() => [
                  changeProp({
                    id: element.id,
                    newProps: { radius },
                  }),
                ]}
              >
                {radius}
              </Button>
            ))}
          </Stack>
        ),
      }}
    />
  ) : (
    <></>
  )
}

export default observer(ElementRadiusesEdit)

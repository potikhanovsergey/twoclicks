import { ActionIcon, Button, Stack } from "@mantine/core"
import { getRadiusesByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { AiOutlineRadiusBottomleft } from "@react-icons/all-files/ai/AiOutlineRadiusBottomleft"
interface IElementRadiusesEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
}

const ElementRadiusesEdit = ({ type, props, id }: IElementRadiusesEdit) => {
  const radiuses = type ? getRadiusesByType(type) : undefined
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")

  return radiuses ? (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[id] === "radius",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[id] = "radius"
        },
      }}
      tooltipProps={{
        label: t("radius"),
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
                  props?.radius === undefined ? radius === "filled" : radius === props?.radius
                }
                onClick={() => [
                  changeProp({
                    id,
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

import { ActionIcon, Button, Stack } from "@mantine/core"
import { getSizesByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { GiResize } from "@react-icons/all-files/gi/GiResize"

interface IElementSizesEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
}

const ElementSizesEdit = ({ type, props, id }: IElementSizesEdit) => {
  const sizes = type ? getSizesByType(type) : undefined
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")
  return sizes ? (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[id] === "size",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[id] = "size"
        },
      }}
      tooltipProps={{
        label: t("sizes"),
        children: (
          <ActionIcon color="violet">
            <GiResize />
          </ActionIcon>
        ),
      }}
      dropdownProps={{
        children: (
          <Stack spacing={0} align="stretch">
            {sizes.map((size) => (
              <Button
                variant="subtle"
                size="sm"
                compact
                key={size}
                disabled={props?.size === undefined ? size === "filled" : size === props?.size}
                onClick={() => {
                  changeProp({
                    id,
                    newProps: { size },
                  })
                }}
              >
                {size}
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

export default observer(ElementSizesEdit)

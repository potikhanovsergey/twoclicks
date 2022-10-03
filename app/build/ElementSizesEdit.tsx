import { ActionIcon, Button, Stack } from "@mantine/core"
import { getSizesByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { GiResize } from "@react-icons/all-files/gi/GiResize"
import { useMemo } from "react"

interface IElementSizesEdit {
  element: ICanvasBlock
}

const ElementSizesEdit = ({ element }: IElementSizesEdit) => {
  const sizes = useMemo(() => {
    return getSizesByType(element.type)
  }, [element.type])

  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")
  return (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[element.id] === "size",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[element.id] = "size"
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
                disabled={
                  element.props?.size === undefined
                    ? size === "filled"
                    : size === element.props?.size
                }
                onClick={() => {
                  changeProp({
                    id: element.id,
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
  )
}

export default observer(ElementSizesEdit)

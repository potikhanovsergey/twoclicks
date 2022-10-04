import { ActionIcon, Slider, Stack, Text } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { FaArrowsAlt } from "@react-icons/all-files/fa/FaArrowsAlt"
import { useRef } from "react"

interface IElementPaddingEdit {
  element: ICanvasBlock
}

const ElementPaddingEdit = ({ element }: IElementPaddingEdit) => {
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")

  const pickerTimeout = useRef<NodeJS.Timeout | null>(null)

  const changePadding = ({ value, prop }: { value?: number; prop: string }) => {
    changeProp({
      id: element.id,
      newProps: {
        [prop]: value,
      },
    })
  }

  return (
    <ToolbarMenu
      menuProps={{
        width: 196,
        defaultOpened: openedAction?.[element.id]?.includes("padding"),
        position: element.editType === "section" ? "left" : undefined,
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[element.id] = "padding"
        },
      }}
      tooltipProps={{
        label: "Paddings",
        position: element.editType === "section" ? "left" : undefined,
        children: (
          <ActionIcon color="violet">
            <FaArrowsAlt />
          </ActionIcon>
        ),
      }}
      dropdownProps={{
        py: 8,
        px: 12,
        children: (
          <>
            <Text weight="bold">Edit padding</Text>
            <Stack spacing={8} align="stretch">
              <div>
                <Text>Top</Text>
                <Slider
                  label={(value) => `${value} px`}
                  defaultValue={element.props.pt}
                  min={0}
                  max={200}
                  onChange={(value) => {
                    pickerTimeout.current && clearTimeout(pickerTimeout.current)
                    pickerTimeout.current = setTimeout(() => {
                      changePadding({ value, prop: "pt" })
                    }, 100)
                  }}
                />
              </div>
              <div>
                <Text>Bottom</Text>
                <Slider
                  label={(value) => `${value} px`}
                  defaultValue={element.props.pb}
                  onChange={(value) => {
                    pickerTimeout.current && clearTimeout(pickerTimeout.current)
                    pickerTimeout.current = setTimeout(() => {
                      changePadding({ value, prop: "pb" })
                    }, 100)
                  }}
                  min={0}
                  max={200}
                />
              </div>
            </Stack>
          </>
        ),
      }}
    />
  )
}

export default observer(ElementPaddingEdit)

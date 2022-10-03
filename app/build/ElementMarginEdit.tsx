import { ActionIcon, Slider, Stack, Text } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { FaArrowsAlt } from "@react-icons/all-files/fa/FaArrowsAlt"
import { useRef } from "react"

interface IElementMarginEdit {
  element: ICanvasBlock
}

const ElementMarginEdit = ({ element }: IElementMarginEdit) => {
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")

  const pickerTimeout = useRef<NodeJS.Timeout | null>(null)

  const changeMargin = ({ value, prop }: { value?: number; prop: string }) => {
    // pickerTimeout.current && clearTimeout(pickerTimeout.current)
    // pickerTimeout.current = setInterval(() => {
    changeProp({
      id: element.id,
      newProps: {
        [prop]: value,
      },
    })
    // }, 25)
  }

  return (
    <ToolbarMenu
      menuProps={{
        width: 196,
        defaultOpened: openedAction?.[element.id]?.includes("margin"),
        position: element.editType === "section" || element.sectionLike ? "left" : undefined,
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[element.id] = "margin"
        },
      }}
      tooltipProps={{
        label: "Margins",
        position: element.editType === "section" || element.sectionLike ? "left" : undefined,
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
            <Text weight="bold">Edit margin</Text>
            <Stack spacing={8} align="stretch">
              <div>
                <Text>Top</Text>
                <Slider
                  label={(value) => `${value} px`}
                  defaultValue={element.props.mt}
                  min={0}
                  max={200}
                  onChange={(value) => {
                    pickerTimeout.current && clearTimeout(pickerTimeout.current)
                    pickerTimeout.current = setTimeout(() => {
                      changeMargin({ value, prop: "mt" })
                    }, 100)
                  }}
                />
              </div>
              <div>
                <Text>Bottom</Text>
                <Slider
                  label={(value) => `${value} px`}
                  defaultValue={element.props.mb}
                  onChange={(value) => {
                    pickerTimeout.current && clearTimeout(pickerTimeout.current)
                    pickerTimeout.current = setTimeout(() => {
                      changeMargin({ value, prop: "mb" })
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

export default observer(ElementMarginEdit)

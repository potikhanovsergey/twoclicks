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
  type: "m" | "p"
  y?: boolean
  x?: boolean
}

const ElementPaddingEdit = ({ element, type, y, x }: IElementPaddingEdit) => {
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
        label: "Spacings",
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
            <Text weight="bold">Edit {type === "m" ? "margin" : "padding"}</Text>
            <Stack spacing={8} align="stretch">
              {y && (
                <>
                  <div>
                    <Text>Top</Text>
                    <Slider
                      label={(value) => `${value} px`}
                      defaultValue={element.props[`${type}t`]}
                      min={0}
                      max={200}
                      onChange={(value) => {
                        pickerTimeout.current && clearTimeout(pickerTimeout.current)
                        pickerTimeout.current = setTimeout(() => {
                          changePadding({ value, prop: `${type}t` })
                        }, 100)
                      }}
                    />
                  </div>
                  <div>
                    <Text>Bottom</Text>
                    <Slider
                      label={(value) => `${value} px`}
                      defaultValue={element.props[`${type}b`]}
                      onChange={(value) => {
                        pickerTimeout.current && clearTimeout(pickerTimeout.current)
                        pickerTimeout.current = setTimeout(() => {
                          changePadding({ value, prop: `${type}b` })
                        }, 100)
                      }}
                      min={0}
                      max={200}
                    />
                  </div>
                </>
              )}
              {x && (
                <>
                  <div>
                    <Text>Left</Text>
                    <Slider
                      label={(value) => `${value} px`}
                      defaultValue={element.props[`${type}l`]}
                      onChange={(value) => {
                        pickerTimeout.current && clearTimeout(pickerTimeout.current)
                        pickerTimeout.current = setTimeout(() => {
                          changePadding({ value, prop: `${type}l` })
                        }, 100)
                      }}
                      min={0}
                      max={200}
                    />
                  </div>
                  <div>
                    <Text>Right</Text>
                    <Slider
                      label={(value) => `${value} px`}
                      defaultValue={element.props[`${type}r`]}
                      onChange={(value) => {
                        pickerTimeout.current && clearTimeout(pickerTimeout.current)
                        pickerTimeout.current = setTimeout(() => {
                          changePadding({ value, prop: `${type}r` })
                        }, 100)
                      }}
                      min={0}
                      max={200}
                    />
                  </div>
                </>
              )}
            </Stack>
          </>
        ),
      }}
    />
  )
}

export default observer(ElementPaddingEdit)

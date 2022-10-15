import { Button, Stack } from "@mantine/core"
import { TypeEditLabelValue } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

interface IElementTypeEdit {
  element: ICanvasBlock
  types: TypeEditLabelValue[]
}

const ElementTypeEdit = ({ types, element }: IElementTypeEdit) => {
  const { changeType, openedAction } = BuildStore
  const { t } = useTranslation("build")
  return (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[element.id] === "type",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction = {
            [element.id]: "type",
          }
        },
      }}
      tooltipProps={{
        label: t("sizes"),
        children: (
          <Button compact size="xs" variant="light" radius={0}>
            Type
          </Button>
        ),
      }}
      dropdownProps={{
        children: (
          <Stack spacing={0} align="stretch">
            {types.map((t) => (
              <Button
                variant="subtle"
                size="sm"
                compact
                key={t.value}
                disabled={t.value === element.type}
                onClick={() => {
                  changeType({
                    id: element.id,
                    type: t.value,
                    editType: t.editType,
                  })
                }}
              >
                {t.label}
              </Button>
            ))}
          </Stack>
        ),
      }}
    />
  )
}

export default observer(ElementTypeEdit)

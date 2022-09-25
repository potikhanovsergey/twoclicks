import { Button, Stack } from "@mantine/core"
import { TypeEditLabelValue } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

interface IElementTypeEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
  types: TypeEditLabelValue[]
}

const ElementTypeEdit = ({ id, types, type }: IElementTypeEdit) => {
  const { changeType, openedAction } = BuildStore
  const { t } = useTranslation("build")
  return (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[id] === "type",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[id] = "type"
        },
      }}
      tooltipProps={{
        label: t("sizes"),
        children: (
          <Button compact size="xs" variant="light">
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
                disabled={t.value === type}
                onClick={() => {
                  changeType({
                    id,
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

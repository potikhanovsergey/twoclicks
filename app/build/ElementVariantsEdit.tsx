import { ActionIcon, Button, Stack } from "@mantine/core"
import { getVariantsByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { FaMagic } from "@react-icons/all-files/fa/FaMagic"
interface IElementVariantsEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
}

const ElementVariantsEdit = ({ type, props, id }: IElementVariantsEdit) => {
  const variants = type ? getVariantsByType(type) : undefined
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("pagesBuild")
  return variants ? (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[id] === "variant",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[id] = "variant"
        },
      }}
      tooltipProps={{
        label: t("variants"),
        children: (
          <ActionIcon color="violet">
            <FaMagic />
          </ActionIcon>
        ),
      }}
      dropdownProps={{
        children: (
          <Stack spacing={0} align="flex-start">
            {variants.map((variant) => (
              <Button
                variant="subtle"
                size="sm"
                styles={{
                  inner: {
                    justifyContent: "flex-start",
                  },
                }}
                fullWidth
                compact
                key={variant}
                disabled={
                  props?.variant === undefined ? variant === "filled" : variant === props?.variant
                }
                onClick={() => [
                  changeProp({
                    id,
                    newProps: { variant },
                  }),
                ]}
              >
                {t(variant)}
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

export default observer(ElementVariantsEdit)

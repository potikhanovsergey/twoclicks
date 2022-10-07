import { ActionIcon, Button, Stack } from "@mantine/core"
import { getVariantsByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { FaMagic } from "@react-icons/all-files/fa/FaMagic"
import { useMemo } from "react"
interface IElementVariantsEdit {
  element: ICanvasBlock
}

const ElementVariantsEdit = ({ element }: IElementVariantsEdit) => {
  const variants = useMemo(() => {
    return getVariantsByType(element.type)
  }, [element.type])
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("build")
  return (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[element.id] === "variant",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction = {
            [element.id]: "variant",
          }
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
            {["inherit", ...variants].map((variant) => (
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
                  element.props?.variant === undefined
                    ? variant === "inherit"
                    : variant === element.props?.variant
                }
                onClick={() => [
                  changeProp({
                    id: element.id,
                    newProps: { variant: variant === "inherit" ? "undefined" : variant },
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
  )
}

export default observer(ElementVariantsEdit)

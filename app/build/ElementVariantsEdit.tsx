import { Tooltip, ActionIcon, Menu, Button, Stack } from "@mantine/core"
import { getVariantsByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { FaMagic } from "react-icons/fa"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

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
    <Menu
      position="top"
      offset={0}
      defaultOpened={openedAction?.[id] === "variant"}
      onOpen={() => {
        BuildStore.openedAction[id] = "variant"
      }}
      onClose={() => (BuildStore.openedAction = {})}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <div>
          <Tooltip label={t("variants")} color="violet" withArrow>
            <ActionIcon color="violet">
              <FaMagic />
            </ActionIcon>
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown p={0}>
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
      </Menu.Dropdown>
    </Menu>
  ) : (
    <></>
  )
}

export default observer(ElementVariantsEdit)

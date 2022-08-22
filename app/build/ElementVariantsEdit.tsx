import { Tooltip, ActionIcon, Menu, Button, Stack } from "@mantine/core"
import { getVariantsByType } from "helpers"
import { observer } from "mobx-react-lite"
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
          <Tooltip label="Variants" color="violet" withArrow>
            <ActionIcon color="violet">
              <FaMagic style={{ fill: "url(#violet-red-gradient)" }} />
            </ActionIcon>
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown p={0}>
        <Stack spacing={0} align="stretch">
          {variants.map((variant) => (
            <Button
              sx={({}) => ({ textTransform: "capitalize" })}
              variant="subtle"
              size="sm"
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
              {variant}
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
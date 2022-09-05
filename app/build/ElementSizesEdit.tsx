import { Tooltip, ActionIcon, Menu, Button, Stack } from "@mantine/core"
import { getSizesByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { GiResize } from "react-icons/gi"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

interface IElementSizesEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
}

const ElementSizesEdit = ({ type, props, id }: IElementSizesEdit) => {
  const sizes = type ? getSizesByType(type) : undefined
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("pagesBuild")
  return sizes ? (
    <Menu
      position="top"
      offset={0}
      defaultOpened={openedAction?.[id] === "size"}
      onOpen={() => {
        BuildStore.openedAction[id] = "size"
      }}
      onClose={() => (BuildStore.openedAction = {})}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <div>
          <Tooltip label={t("sizes")} color="violet" withArrow>
            <ActionIcon color="violet">
              <GiResize style={{ fill: "url(#violet-red-gradient)" }} />
            </ActionIcon>
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown p={0}>
        <Stack spacing={0} align="stretch">
          {sizes.map((size) => (
            <Button
              variant="subtle"
              size="sm"
              compact
              key={size}
              disabled={props?.size === undefined ? size === "filled" : size === props?.size}
              onClick={() => [
                changeProp({
                  id,
                  newProps: { size },
                }),
              ]}
            >
              {size}
            </Button>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <></>
  )
}

export default observer(ElementSizesEdit)

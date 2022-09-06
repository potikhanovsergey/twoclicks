import { Tooltip, ActionIcon, Menu, Button, Stack } from "@mantine/core"
import { getRadiusesByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { AiOutlineRadiusBottomleft } from "react-icons/ai"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

interface IElementRadiusesEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
}

const ElementRadiusesEdit = ({ type, props, id }: IElementRadiusesEdit) => {
  const radiuses = type ? getRadiusesByType(type) : undefined
  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("pagesBuild")
  return radiuses ? (
    <Menu
      position="top"
      offset={0}
      defaultOpened={openedAction?.[id] === "radius"}
      onOpen={() => {
        BuildStore.openedAction[id] = "radius"
      }}
      onClose={() => (BuildStore.openedAction = {})}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <div>
          <Tooltip label={t("radius")} color="violet" withArrow>
            <ActionIcon color="violet">
              <AiOutlineRadiusBottomleft />
            </ActionIcon>
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown p={0}>
        <Stack spacing={0} align="stretch">
          {radiuses.map((radius) => (
            <Button
              variant="subtle"
              size="sm"
              compact
              key={radius}
              disabled={
                props?.radius === undefined ? radius === "filled" : radius === props?.radius
              }
              onClick={() => [
                changeProp({
                  id,
                  newProps: { radius },
                }),
              ]}
            >
              {radius}
            </Button>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <></>
  )
}

export default observer(ElementRadiusesEdit)

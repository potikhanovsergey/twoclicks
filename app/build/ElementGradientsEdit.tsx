import { Tooltip, Box, useMantineTheme, ActionIcon, Center, Group, Menu } from "@mantine/core"
import { getHexFromThemeColor, getGradientsByType } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { HiArrowNarrowRight } from "react-icons/hi"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import PaletteItem from "./PaletteItem"

interface IElementGradientsEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
}

const ElementGradientsEdit = ({ type, props, id }: IElementGradientsEdit) => {
  const gradients = type ? getGradientsByType(type) : undefined
  const theme = useMantineTheme()

  const { changeProp, openedAction } = BuildStore
  const { t } = useTranslation("pagesBuild")
  return gradients && props?.variant === "gradient" ? (
    <Menu
      position="top"
      offset={0}
      defaultOpened={openedAction?.[id]?.includes("gradient")}
      onOpen={() => {
        BuildStore.openedAction[id] = "gradient"
      }}
      onClose={() => (BuildStore.openedAction = {})}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <div>
          <Tooltip label={t("gradient")} color="violet" withArrow>
            <Center sx={{ height: "100%", cursor: "pointer" }}>
              <ActionIcon>
                <Box
                  sx={(theme) => ({
                    background: theme.fn.linearGradient(
                      theme.defaultGradient.deg || 45,
                      theme.colors?.[props?.gradient?.from]?.[5] ||
                        theme.colors[theme.defaultGradient.from][5],
                      theme.colors?.[props?.gradient?.to]?.[5] ||
                        theme.colors[theme.defaultGradient.to][5]
                    ),
                    width: "65%",
                    height: "65%",
                    borderRadius: theme.radius.xs,
                  })}
                />
              </ActionIcon>
            </Center>
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown p={4}>
        <Group noWrap spacing={4}>
          <Tooltip label={t("change 'from' color")} color="violet" withArrow>
            <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
              <PaletteItem
                defaultOpened={openedAction?.[id] === "gradient-from"}
                onOpen={() => {
                  BuildStore.openedAction[id] = "gradient-from"
                }}
                popoverPosition="top"
                offset={6}
                color={getHexFromThemeColor({
                  theme,
                  color: props?.gradient?.from || theme.defaultGradient.from,
                })}
                onColorChange={(value) => {
                  changeProp({
                    id,
                    newProps: {
                      gradient: {
                        ...props.gradient,
                        from: value,
                      },
                    },
                  })
                }}
              />
            </Box>
          </Tooltip>
          <HiArrowNarrowRight />
          <Tooltip label={t("change 'to' color")} color="violet" withArrow>
            <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
              <PaletteItem
                defaultOpened={openedAction?.[id] === "gradient-to"}
                onOpen={() => {
                  BuildStore.openedAction[id] = "gradient-to"
                }}
                popoverPosition="top"
                offset={6}
                color={getHexFromThemeColor({
                  theme,
                  color: props?.gradient?.to || theme.defaultGradient.to,
                })}
                onColorChange={(value) => {
                  changeProp({
                    id,
                    newProps: {
                      gradient: {
                        ...props.gradient,
                        to: value,
                      },
                    },
                  })
                }}
              />
            </Box>
          </Tooltip>
        </Group>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <></>
  )
}

export default observer(ElementGradientsEdit)

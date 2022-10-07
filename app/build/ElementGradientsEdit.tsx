import {
  Tooltip,
  Box,
  useMantineTheme,
  ActionIcon,
  Center,
  Group,
  Stack,
  Button,
} from "@mantine/core"
import { getHexFromThemeColor } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"
import PaletteItem from "./PaletteItem"
import ToolbarMenu from "./ToolbarMenu"
import { IoClose } from "@react-icons/all-files/io5/IoClose"

interface IElementGradientsEdit {
  element: ICanvasBlock
}

const ElementGradientsEdit = ({ element }: IElementGradientsEdit) => {
  const theme = useMantineTheme()
  const {
    changeProp,
    openedAction,
    data: { themeSettings },
  } = BuildStore
  const { t } = useTranslation("build")

  return (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[element.id]?.includes("gradient"),
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction = {
            [element.id]: "gradient",
          }
        },
      }}
      tooltipProps={{
        label: t("gradient"),
        children: (
          <Center sx={{ height: "100%", cursor: "pointer" }}>
            <ActionIcon>
              <Box
                sx={(theme) => ({
                  background: theme.fn.linearGradient(
                    theme.defaultGradient.deg || 45,
                    theme.colors?.[element.props?.gradient?.from]?.[5] ||
                      theme.colors[themeSettings.gradient.from][5],
                    theme.colors?.[element.props?.gradient?.to]?.[5] ||
                      theme.colors[themeSettings.gradient.to][5]
                  ),
                  width: "65%",
                  height: "65%",
                  borderRadius: theme.radius.xs,
                })}
              />
            </ActionIcon>
          </Center>
        ),
      }}
      dropdownProps={{
        p: 4,
        children: (
          <Stack spacing={4}>
            {element.props.gradient && (
              <Button
                variant="light"
                compact
                size="xs"
                onClick={() => {
                  changeProp({
                    id: element.id,
                    newProps: {
                      gradient: "undefined",
                    },
                  })
                }}
                rightIcon={<IoClose />}
              >
                Reset
              </Button>
            )}
            <Group noWrap spacing={4}>
              <Tooltip label={t("change 'from' color")} withArrow>
                <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
                  <PaletteItem
                    defaultOpened={openedAction?.[element.id] === "gradient-from"}
                    onOpen={() => {
                      BuildStore.openedAction = {
                        [element.id]: "gradient-from",
                      }
                    }}
                    popoverPosition="top"
                    offset={6}
                    color={getHexFromThemeColor({
                      theme,
                      color: element.props?.gradient?.from || themeSettings.gradient.from,
                    })}
                    onColorChange={(value) => {
                      changeProp({
                        id: element.id,
                        newProps: {
                          gradient: {
                            ...element.props.gradient,
                            from: value,
                          },
                        },
                      })
                    }}
                  />
                </Box>
              </Tooltip>
              <HiArrowNarrowRight color={theme.colorScheme === "dark" ? "white" : "black"} />
              <Tooltip label={t("change 'to' color")} withArrow>
                <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
                  <PaletteItem
                    defaultOpened={openedAction?.[element.id] === "gradient-to"}
                    onOpen={() => {
                      BuildStore.openedAction = {
                        [element.id]: "gradient-to",
                      }
                    }}
                    popoverPosition="top"
                    offset={6}
                    color={getHexFromThemeColor({
                      theme,
                      color: element.props?.gradient?.to || themeSettings.gradient.to,
                    })}
                    onColorChange={(value) => {
                      changeProp({
                        id: element.id,
                        newProps: {
                          gradient: {
                            ...element.props.gradient,
                            to: value,
                          },
                        },
                      })
                    }}
                  />
                </Box>
              </Tooltip>
            </Group>
          </Stack>
        ),
      }}
    />
  )
}

export default observer(ElementGradientsEdit)

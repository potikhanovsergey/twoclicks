import {
  useMantineTheme,
  Popover,
  Text,
  Tooltip,
  ActionIcon,
  Stack,
  Group,
  Button,
  MantineNumberSize,
  Box,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import { getHexFromThemeColor, sizes } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { FaPalette } from "react-icons/fa"
import { BuildStore } from "store/build"
import { IThemeSettings } from "types"
import PaletteItem from "./PaletteItem"
import PaletteItems from "./PaletteItems"
import ThemeChanger from "./ThemeChanger"

const PageSettings = observer(() => {
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  const [popoverOpened, setPopoverOpened] = useState(false)

  const { hovered: iconHovered, ref: iconRef } = useHover<HTMLButtonElement>()
  const { t } = useTranslation("build")

  const {
    data: { themeSettings },
  } = BuildStore
  return (
    <Popover onChange={setPopoverOpened} opened={popoverOpened} width={196}>
      <Popover.Target>
        <Tooltip label="Page settings" position="bottom" opened={iconHovered && !popoverOpened}>
          <ActionIcon
            onClick={() => setPopoverOpened((o) => !o)}
            size={30}
            color="dark"
            variant={dark ? ("white" as "filled") : "filled"}
            ref={iconRef}
          >
            <FaPalette />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown py={4} px={8}>
        <Text weight="bold">Default settings</Text>
        <Stack spacing={8}>
          <Group position="apart" align="center">
            <Text size="sm">{t("palette")}:</Text>
            <PaletteItems />
          </Group>
          <Group position="apart" align="center">
            <Text size="sm">Radius:</Text>
            <Popover>
              <Popover.Target>
                <Button
                  size="xs"
                  variant="filled"
                  color="violet"
                  compact
                  radius={themeSettings.radius}
                >
                  {themeSettings.radius}
                </Button>
              </Popover.Target>
              <Popover.Dropdown p={4}>
                <Stack spacing={4}>
                  {sizes.map((radius) => (
                    <Button
                      compact
                      disabled={radius === themeSettings.radius}
                      key={radius}
                      variant="light"
                      size="xs"
                      onClick={() => {
                        BuildStore.changeThemeSettings(
                          { radius: radius as MantineNumberSize },
                          false
                        )
                      }}
                    >
                      {radius}
                    </Button>
                  ))}
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Group position="apart" align="center">
            <Text size="sm">Variant:</Text>
            <Popover>
              <Popover.Target>
                <Button size="xs" compact variant={themeSettings.variant}>
                  {themeSettings.variant}
                </Button>
              </Popover.Target>
              <Popover.Dropdown p={4}>
                <Stack spacing={4}>
                  {["filled", "outline", "light", "gradient", "default"].map(
                    (variant: IThemeSettings["variant"]) => (
                      <Button
                        compact
                        disabled={variant === themeSettings.variant}
                        key={variant}
                        variant="light"
                        size="xs"
                        onClick={() => {
                          BuildStore.changeThemeSettings({ variant }, false)
                        }}
                      >
                        {variant}
                      </Button>
                    )
                  )}
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Group position="apart" align="center">
            <Text size="sm">Gradient:</Text>
            <Popover>
              <Popover.Target>
                <Button
                  size="xs"
                  compact
                  variant="gradient"
                  gradient={{ from: themeSettings.gradient.from, to: themeSettings.gradient.to }}
                >
                  from &gt; to
                </Button>
              </Popover.Target>
              <Popover.Dropdown p={4}>
                <Group noWrap spacing={4}>
                  <Tooltip label={t("change 'from' color")} withArrow>
                    <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
                      <PaletteItem
                        popoverPosition="bottom"
                        offset={6}
                        color={getHexFromThemeColor({
                          theme,
                          color: themeSettings?.gradient?.from || theme.defaultGradient.from,
                        })}
                        onColorChange={(value) => {
                          BuildStore.changeThemeSettings(
                            {
                              gradient: {
                                ...themeSettings.gradient,
                                from: value,
                              },
                            },
                            false
                          )
                        }}
                      />
                    </Box>
                  </Tooltip>
                  <HiArrowNarrowRight color={theme.colorScheme === "dark" ? "white" : "black"} />
                  <Tooltip label={t("change 'to' color")} withArrow>
                    <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
                      <PaletteItem
                        popoverPosition="bottom"
                        offset={6}
                        color={getHexFromThemeColor({
                          theme,
                          color: themeSettings?.gradient?.to || theme.defaultGradient.to,
                        })}
                        onColorChange={(value) => {
                          BuildStore.changeThemeSettings(
                            {
                              gradient: {
                                ...themeSettings.gradient,
                                to: value,
                              },
                            },
                            false
                          )
                        }}
                      />
                    </Box>
                  </Tooltip>
                </Group>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Group position="apart" align="center">
            <Text size="sm">Theme changer:</Text>
            <ThemeChanger />
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
})

export default PageSettings

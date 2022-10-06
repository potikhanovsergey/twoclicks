import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Group,
  Skeleton,
  Tooltip,
  Text,
  HoverCard,
  Box,
  TextInput,
  Stack,
  ScrollArea,
  Popover,
  LoadingOverlay,
  useMantineTheme,
  MantineNumberSize,
} from "@mantine/core"
import { useClickOutside, useFullscreen, useHover } from "@mantine/hooks"
import updatePage from "app/build-pages/mutations/updatePage"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect, useMemo, useState } from "react"
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit"
import { AiOutlineFullscreen } from "@react-icons/all-files/ai/AiOutlineFullscreen"
import { AiOutlineFullscreenExit } from "@react-icons/all-files/ai/AiOutlineFullscreenExit"

import { AppStore } from "store"
import { BuildStore } from "store/build"
import PaletteItems from "./PaletteItems"
import PageLink from "./PageLink"
import TogglePublishPage from "./TogglePublishPage"
import ViewportButtons from "./ViewportButtons"
import { AiOutlineLink } from "@react-icons/all-files/ai/AiOutlineLink"

import HistoryButtons from "./HistoryButtons"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"

import { IoMdCheckmark } from "@react-icons/all-files/io/IoMdCheckmark"

import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown"
import SaveButton from "./SaveButton"
import { ImSun } from "@react-icons/all-files/im/ImSun"
import { IPage, IThemeSettings } from "types"
import { RiMoonClearFill } from "@react-icons/all-files/ri/RiMoonClearFill"
import { FaPalette } from "@react-icons/all-files/fa/FaPalette"
import { getHexFromThemeColor, sizes } from "helpers"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import PaletteItem from "./PaletteItem"

const AuthorizedActions = observer(() => {
  const session = useSession()
  const {
    data: { id },
  } = BuildStore
  return session.userId ? <>{id && <TogglePublishPage id={id} />}</> : <></>
})

const themeChangerVariants = [
  {
    label: "Website theme",
    value: "inherit",
  },
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
]

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

const ThemeChanger = observer(() => {
  const {
    data: { theme: pageTheme, id },
  } = BuildStore

  const [updatePageMutation, { isLoading }] = useMutation(updatePage)
  const session = useSession()
  const theme = useMantineTheme()

  const handleChangeTheme = async (newTheme) => {
    if (id) {
      let page
      if (session.userId) {
        page = await updatePageMutation({
          id,
          theme: newTheme,
        })
      }
      if (page) {
        BuildStore.data.theme = page.theme as IPage["theme"]
      } else if (!session.userId) {
        BuildStore.data.theme = newTheme
      }
    }
  }

  const { hovered, ref } = useHover<HTMLButtonElement>()
  const [opened, setOpened] = useState(false)
  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Tooltip
          label="Page theme"
          position="bottom"
          withArrow
          opened={hovered && !opened}
          onClick={() => setOpened((o) => !o)}
        >
          <ActionIcon color="dark" ref={ref}>
            {pageTheme === "light" || (pageTheme === "inherit" && theme.colorScheme === "light") ? (
              <ImSun width={20} height={20} />
            ) : (
              <RiMoonClearFill width={20} height={20} />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown p={8}>
        <LoadingOverlay visible={isLoading} loaderProps={{ size: 16 }} />
        <Text weight="bold" mb={4}>
          Page theme
        </Text>
        <Stack spacing={4}>
          {themeChangerVariants.map((item) => (
            <Button
              compact
              fullWidth
              key={item.value}
              disabled={item.value === pageTheme}
              onClick={() => handleChangeTheme(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
})

const ObservedPageName = observer(() => {
  const session = useSession()
  const {
    data: { name, id, customID, isPublished },
  } = BuildStore

  const [inputVisible, setInputVisible] = useState(false)
  const [editName, setEditName] = useState(name)
  const editNameOutsideRef = useClickOutside(() => setInputVisible(false))
  const [updatePageMutation, { isLoading: isUpdatingPage, isSuccess: hasSuccessfullyUpdatedPage }] =
    useMutation(updatePage)

  useEffect(() => {
    setEditName(name)
  }, [name])

  const current = useMemo(() => {
    return AppStore.pages?.find((p) => p.id === id)
  }, [id])

  const rest = useMemo(() => {
    return current ? AppStore.pages.filter((p) => p.id !== current.id) : undefined
  }, [current])

  useEffect(() => {
    if (hasSuccessfullyUpdatedPage) {
      setInputVisible(false)
      if (editName) {
        BuildStore.data.name = editName
        if (current) {
          current.name = editName
        }
      }
    }
  }, [hasSuccessfullyUpdatedPage])

  const { t } = useTranslation("build")

  return session.userId ? (
    <HoverCard shadow="lg" width={312} openDelay={300}>
      <HoverCard.Target>
        <Group align="center" spacing={4}>
          {isPublished && <AiOutlineLink />}
          <Text>{name}</Text>
          <FiChevronDown />
        </Group>
      </HoverCard.Target>
      <HoverCard.Dropdown p={8} style={{ overflow: "hidden" }}>
        <ScrollArea.Autosize
          maxHeight={160}
          type="never"
          offsetScrollbars
          styles={{ viewport: { padding: 0 } }}
        >
          {current && (
            <Stack spacing={4}>
              <Text weight="bold">Current page:</Text>
              {id && isPublished && <PageLink id={customID || id} withEllipsis={true} />}

              <Group noWrap spacing={4} mb="sm">
                {!inputVisible ? (
                  <>
                    <Button
                      variant="light"
                      size="xs"
                      fullWidth
                      disabled
                      rightIcon={isPublished ? <AiOutlineLink /> : undefined}
                    >
                      {current.name}
                    </Button>
                    <Tooltip
                      label={t("edit site name")}
                      position="bottom"
                      withArrow
                      withinPortal
                      zIndex={301}
                    >
                      <ActionIcon
                        color="dark"
                        variant="filled"
                        size={30}
                        onClick={() => {
                          setInputVisible(true)
                        }}
                      >
                        <AiOutlineEdit />
                      </ActionIcon>
                    </Tooltip>
                  </>
                ) : (
                  <Group spacing={4} ref={editNameOutsideRef} noWrap style={{ width: "100%" }}>
                    <TextInput
                      size="xs"
                      value={editName || ""}
                      onChange={(evt) => {
                        setEditName(evt.currentTarget.value)
                      }}
                      maxLength={32}
                      sx={{ width: "100%", flexGrow: 1 }}
                    />
                    <ActionIcon
                      color="dark"
                      size={30}
                      disabled={editName === name || !editName?.length}
                      loading={isUpdatingPage}
                      onClick={() => {
                        if (id && editName?.length) {
                          void updatePageMutation({ name: editName, id })
                        }
                      }}
                    >
                      <IoMdCheckmark />
                    </ActionIcon>
                  </Group>
                )}
              </Group>
              {rest && rest.length > 0 ? (
                <>
                  <Text weight="bold">Other pages:</Text>
                  {rest.map((p) => (
                    <Link passHref href={`/build/${p.id}`} key={p.id}>
                      <Button
                        variant="light"
                        size="xs"
                        component="a"
                        rightIcon={p.isPublished ? <AiOutlineLink /> : undefined}
                      >
                        {p.name}
                      </Button>
                    </Link>
                  ))}
                </>
              ) : (
                <Text size="sm">Other pages will be here when you add them</Text>
              )}
            </Stack>
          )}
        </ScrollArea.Autosize>
      </HoverCard.Dropdown>
    </HoverCard>
  ) : (
    <></>
  )
})

const BuilderHeader = ({ className }: { className?: string }) => {
  // const { t } = useTranslation('build');
  const { toggle, fullscreen } = useFullscreen()
  const { hovered: fullscreenHovered, ref: fullscreenRef } = useHover<HTMLButtonElement>()
  const { t } = useTranslation("build")

  return (
    <Center className={className} sx={{ paddingRight: "var(--removed-scroll-width, 0px)" }}>
      <Container size="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Group spacing={8} align="center">
            <Suspense fallback={<Skeleton height={32} width={90} />}>
              <AuthorizedActions />
            </Suspense>
            <PageSettings />
          </Group>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(calc(-50% - (var(--removed-scroll-width, 0px) / 2)), -50%)",
            }}
          >
            <ObservedPageName />
          </Box>
          <Group spacing={8}>
            <HistoryButtons color="dark" size={30} variant="filled" />
            <ViewportButtons color="dark" size={30} />
            <Tooltip
              label={fullscreen ? t("turn off fullscreen mode") : t("turn on fullscreen mode")}
              withArrow
              position="bottom"
              opened={fullscreenHovered}
            >
              <ActionIcon onClick={toggle} color="dark" size={30} ref={fullscreenRef}>
                {fullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
              </ActionIcon>
            </Tooltip>
            <Suspense fallback={<Skeleton height={32} width={90} />}>
              <SaveButton />
            </Suspense>
          </Group>
        </Group>
      </Container>
    </Center>
  )
}

export default observer(BuilderHeader)

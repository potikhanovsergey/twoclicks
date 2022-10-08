import { useSession } from "@blitzjs/auth"
import {
  ActionIcon,
  Center,
  Container,
  Group,
  Skeleton,
  Tooltip,
  Box,
  Text,
  Popover,
  useMantineTheme,
  Stack,
} from "@mantine/core"
import { useFullscreen, useHover } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import React, { Suspense, useState } from "react"
import { AiOutlineFullscreen } from "@react-icons/all-files/ai/AiOutlineFullscreen"
import { AiOutlineFullscreenExit } from "@react-icons/all-files/ai/AiOutlineFullscreenExit"

import { BuildStore } from "store/build"
import TogglePublishPage from "./TogglePublishPage"
import ViewportButtons from "./ViewportButtons"

import HistoryButtons from "./HistoryButtons"
import useTranslation from "next-translate/useTranslation"

import SaveButton from "./SaveButton"
import PageName from "./PageName"
import PageThemeSettings from "./PageThemeSettings"
import { HiCog } from "@react-icons/all-files/hi/HiCog"

const AuthorizedActions = observer(() => {
  const session = useSession()
  const {
    data: { id },
  } = BuildStore
  return session.userId ? <>{id && <TogglePublishPage id={id} />}</> : <></>
})

const PageSettings = observer(() => {
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  const [popoverOpened, setPopoverOpened] = useState(false)

  const { hovered: iconHovered, ref: iconRef } = useHover<HTMLButtonElement>()
  const { t } = useTranslation("build")
  const session = useSession()
  return session.userId ? (
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
            <HiCog />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown py={4} px={8}>
        <Text weight="bold">Page settings</Text>
        <Stack spacing={8}>
          <Group>
            <Text size="sm"></Text>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
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
            <Suspense fallback={<Skeleton height={32} width={90} />}>
              <PageSettings />
            </Suspense>
            <PageThemeSettings />
          </Group>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(calc(-50% - (var(--removed-scroll-width, 0px) / 2)), -50%)",
            }}
          >
            <PageName />
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

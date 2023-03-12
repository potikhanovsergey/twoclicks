import { useSession } from "@blitzjs/auth"
import { ActionIcon, Center, Container, Group, Skeleton, Tooltip, Box, Text } from "@mantine/core"
import { useFullscreen, useHover } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import React, { Suspense, useMemo, useState } from "react"
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
import { FaCog } from "@react-icons/all-files/fa/FaCog"
import TogglePublishPage2 from "./TogglePublishPage2"
import { AppStore } from "store"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const BuilderHeader = ({ className }: { className?: string }) => {
  // const { t } = useTranslation('build');
  const { toggle, fullscreen } = useFullscreen()
  const { hovered: fullscreenHovered, ref: fullscreenRef } = useHover<HTMLButtonElement>()
  const { t } = useTranslation("build")
  const session = useSession()
  const {
    data: { id },
  } = BuildStore
  const user = useCurrentUser()

  const pageWithUser = useMemo(() => {
    const currentPage = AppStore.pages.find((p) => p.id === id)
    return user && currentPage
      ? {
          ...currentPage,
          user: {
            name: user.name,
            avatar: user.avatar,
          },
        }
      : null
  }, [id, user])

  return (
    <Center className={className} sx={{ paddingRight: "var(--removed-scroll-width, 0px)" }}>
      <Container size="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Group spacing={8} align="center">
            {pageWithUser && <TogglePublishPage2 leftIcon={<FaCog />} page={pageWithUser} />}
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
            {session.userId ? <PageName /> : <Text>Authorize to see more features 🙂</Text>}
          </Box>
          <Group spacing={8}>
            <HistoryButtons size={30} variant="light" />
            <ViewportButtons variant="light" size={30} />
            <Tooltip
              label={fullscreen ? t("turn off fullscreen mode") : t("turn on fullscreen mode")}
              withArrow
              position="bottom"
              opened={fullscreenHovered}
            >
              <ActionIcon onClick={toggle} variant="light" size={30} ref={fullscreenRef}>
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

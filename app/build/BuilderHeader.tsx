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
  Box,
  Stack,
  Popover,
  LoadingOverlay,
  useMantineTheme,
  MantineNumberSize,
} from "@mantine/core"
import { useFullscreen, useHover } from "@mantine/hooks"
import updatePage from "app/build-pages/mutations/updatePage"
import { observer } from "mobx-react-lite"
import React, { Suspense, useState } from "react"
import { AiOutlineFullscreen } from "@react-icons/all-files/ai/AiOutlineFullscreen"
import { AiOutlineFullscreenExit } from "@react-icons/all-files/ai/AiOutlineFullscreenExit"

import { BuildStore } from "store/build"
import PaletteItems from "./PaletteItems"
import TogglePublishPage from "./TogglePublishPage"
import ViewportButtons from "./ViewportButtons"

import HistoryButtons from "./HistoryButtons"
import useTranslation from "next-translate/useTranslation"

import SaveButton from "./SaveButton"
import { ImSun } from "@react-icons/all-files/im/ImSun"
import { IPage, IThemeSettings } from "types"
import { RiMoonClearFill } from "@react-icons/all-files/ri/RiMoonClearFill"
import { FaPalette } from "@react-icons/all-files/fa/FaPalette"
import { getHexFromThemeColor, sizes } from "helpers"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import PaletteItem from "./PaletteItem"
import PageName from "./PageName"
import PageSettings from "./PageSettings"

const AuthorizedActions = observer(() => {
  const session = useSession()
  const {
    data: { id },
  } = BuildStore
  return session.userId ? <>{id && <TogglePublishPage id={id} />}</> : <></>
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

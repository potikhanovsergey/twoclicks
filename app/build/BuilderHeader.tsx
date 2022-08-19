import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Skeleton,
  Tooltip,
  useMantineTheme,
  Text,
  HoverCard,
  Box,
} from "@mantine/core"
import { useFullscreen, useHotkeys, useHover } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect } from "react"
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
import { FaSave } from "react-icons/fa"
import { MdOutlinePreview } from "react-icons/md"
import { AppStore } from "store"
import { BuildStore } from "store/build"
import PaletteItems from "./PaletteItems"
import PortfolioLink from "./PortfolioLink"
import PreviewButton from "./PreviewButton"
import SaveButton from "./SaveButton"
import TogglePublishPortfilio from "./TogglePublishPortfolio"
import ViewportButtons from "./ViewportButtons"

const AuthorizedActions = observer(() => {
  const session = useSession()
  const {
    data: { id },
  } = BuildStore
  return session.userId ? <>{id && <TogglePublishPortfilio id={id} />}</> : <></>
})

const ObservedPreviewPortfolio = observer(() => {
  const { isCanvasEmpty } = BuildStore

  return !isCanvasEmpty ? (
    <Tooltip label="Preview mode" position="bottom-start" color="violet" withArrow>
      <PreviewButton variant="light" color="violet" size={30}>
        <MdOutlinePreview size={16} />
      </PreviewButton>
    </Tooltip>
  ) : (
    <></>
  )
})

const ObservedPortfolioName = observer(() => {
  const session = useSession()
  const {
    data: { name, id },
  } = BuildStore

  const isPublished = AppStore.portfolios.find((p) => p.id === id)?.isPublished
  return session.userId && isPublished ? (
    <HoverCard shadow="xl">
      <HoverCard.Target>
        <Text>{name}</Text>
      </HoverCard.Target>
      <HoverCard.Dropdown p={8}>
        {id && <PortfolioLink id={id} withEllipsis={false} />}
      </HoverCard.Dropdown>
    </HoverCard>
  ) : (
    <>
      <Text>{name}</Text>
    </>
  )
})

const BuilderHeader = ({ className }: { className?: string }) => {
  // const { t } = useTranslation('pagesBuild');
  const theme = useMantineTheme()
  const { toggle, fullscreen } = useFullscreen()
  const { hovered: fullscreenHovered, ref: fullscreenRef } = useHover<HTMLButtonElement>()

  return (
    <Center className={className}>
      <Container size="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Group spacing={8} align="center">
            <Suspense
              fallback={
                <Group>
                  <Skeleton height={32} width={90} />
                  <Skeleton height={32} width={90} />
                </Group>
              }
            >
              <AuthorizedActions />
            </Suspense>
            <ObservedPreviewPortfolio />
            <PaletteItems />
          </Group>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ObservedPortfolioName />
          </Box>
          <Group spacing={8}>
            <ViewportButtons color="violet" size={30} variant="light" />
            <Tooltip
              color="violet"
              label="Toggle fullscreen mode"
              withArrow
              position="bottom"
              opened={fullscreenHovered}
            >
              <ActionIcon
                onClick={toggle}
                color="violet"
                variant="light"
                size={30}
                ref={fullscreenRef}
              >
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

export default BuilderHeader

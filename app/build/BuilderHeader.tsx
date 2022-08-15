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
} from "@mantine/core"
import { useFullscreen, useHotkeys, useHover } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect } from "react"
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
import { FaSave } from "react-icons/fa"
import { BuildStore } from "store/build"
import PaletteItems from "./PaletteItems"
import PortfolioLink from "./PortfolioLink"
import SaveButton from "./SaveButton"
import TogglePublishPortfilio from "./TogglePublishPortfolio"

const AuthorizedActions = () => {
  const session = useSession()

  return session.userId ? (
    <>
      {BuildStore.data.id && <PortfolioLink id={BuildStore.data.id} withEllipsis={true} />}
      <TogglePublishPortfilio />
    </>
  ) : (
    <></>
  )
}

const BuilderHeader = ({ className }: { className?: string }) => {
  // const { t } = useTranslation('pagesBuild');
  const theme = useMantineTheme()
  const { toggle, fullscreen } = useFullscreen()
  const { hovered: fullscreenHovered, ref: fullscreenRef } = useHover<HTMLButtonElement>()

  return (
    <Center className={className}>
      <Container size="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Group spacing={32} align="center">
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
            <PaletteItems />
          </Group>
          <Group spacing={8}>
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
                variant="filled"
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

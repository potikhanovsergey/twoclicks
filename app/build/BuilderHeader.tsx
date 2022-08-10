import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Group,
  Loader,
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
import TogglePublishPortfilio from "./TogglePublishPortfolio"

const SaveButton = observer(() => {
  const session = useSession()
  const [updatePortfolioMutation, { isLoading, isSuccess }] = useMutation(updatePortfolio)

  const { hasPortfolioChanged, savePortfolio, isSaveButtonLoading, setIsSaveButtonLoading } =
    BuildStore
  useHotkeys([["mod+S", (e) => savePortfolio({ e, session, updatePortfolioMutation })]])

  useEffect(() => {
    setIsSaveButtonLoading(isLoading)
  }, [isLoading])
  return (
    <Button
      loading={isSaveButtonLoading}
      onClick={() => savePortfolio({ session, updatePortfolioMutation })}
      disabled={!hasPortfolioChanged}
      variant={hasPortfolioChanged ? "gradient" : "default"}
      gradient={{ from: "violet", to: "teal", deg: 35 }}
      size="xs"
      leftIcon={<FaSave size={15} />}
    >
      Сохранить изменения
    </Button>
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
          <Group spacing={32} align="center">
            {BuildStore.data.id && <PortfolioLink id={BuildStore.data.id} withEllipsis={true} />}
            <TogglePublishPortfilio />
            <PaletteItems />
          </Group>
          <Group spacing={8}>
            <Tooltip
              label="Toggle fullscreen mode"
              withArrow
              position="bottom"
              opened={fullscreenHovered}
            >
              <ActionIcon onClick={toggle} color="violet" variant="filled" ref={fullscreenRef}>
                {fullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
              </ActionIcon>
            </Tooltip>
            <Suspense fallback={<Loader />}>
              <SaveButton />
            </Suspense>
          </Group>
        </Group>
      </Container>
    </Center>
  )
}

export default BuilderHeader

import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import {
  ActionIcon,
  Anchor,
  Button,
  Center,
  ColorPicker,
  ColorSwatch,
  Container,
  CopyButton,
  Group,
  Loader,
  Popover,
  Switch,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { useClickOutside, useFullscreen, useHotkeys } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { setCookie } from "cookies-next"
import { deflate } from "helpers"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect, useState } from "react"
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
import { BiCheckDouble, BiCopy } from "react-icons/bi"
import { FaSave } from "react-icons/fa"
import { BuildStore } from "store/build"
import PaletteItems from "./PaletteItems"
import PortfolioLink from "./PortfolioLink"

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

  return (
    <Center className={className}>
      <Container size="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Group spacing={32} align="center">
            {BuildStore.data.id && <PortfolioLink id={BuildStore.data.id} withEllipsis={true} />}
            <Switch label="Publish" radius="xl" color="violet" />
            <PaletteItems />
          </Group>
          <Group spacing={8}>
            <ActionIcon onClick={toggle} color="violet" variant="filled">
              {fullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
            </ActionIcon>
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

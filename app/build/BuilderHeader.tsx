import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import {
  ActionIcon,
  Anchor,
  Button,
  Center,
  ColorSwatch,
  Container,
  CopyButton,
  Group,
  Loader,
  Switch,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { useFullscreen, useHotkeys } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { setCookie } from "cookies-next"
import { deflate } from "helpers"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect, useState } from "react"
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
import { BiCheckDouble, BiCopy } from "react-icons/bi"
import { FaSave } from "react-icons/fa"
import { BuildStore } from "store/build"
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
      leftIcon={<FaSave />}
    >
      Сохранить изменения
    </Button>
  )
})

const BuilderHeader = ({ className }: { className?: string }) => {
  // const { t } = useTranslation('pagesBuild');
  const [colors] = useState(["violet", "primary", "accent"])
  const theme = useMantineTheme()
  const { toggle, fullscreen } = useFullscreen()

  return (
    <Center className={className}>
      <Container size="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Group spacing={32} align="center">
            {BuildStore.data.id && <PortfolioLink id={BuildStore.data.id} withEllipsis={true} />}
            <Switch label="Publish" radius="xl" color="violet" />
            <Group spacing={8} align="center">
              <Text size="sm">Palette:</Text>
              <Group spacing={4}>
                {colors.map((c) => {
                  const color = theme.colors[c]
                  if (color) return <ColorSwatch radius="xs" color={color[5]} key={c} />
                  return <></>
                })}
              </Group>
            </Group>
          </Group>
          <Group spacing={4}>
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

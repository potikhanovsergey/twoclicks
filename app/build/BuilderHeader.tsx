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
import { useHotkeys } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { setCookie } from "cookies-next"
import { deflate } from "helpers"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect, useState } from "react"
import { BiCheckDouble, BiCopy } from "react-icons/bi"
import { FaSave } from "react-icons/fa"
import { BuildStore } from "store/build"

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

  return (
    <Center className={className}>
      <Container size="xl">
        <Group style={{ width: "100%" }} position="apart">
          <Group spacing={32}>
            <Group spacing={4}>
              <Anchor color="blue" target="_blank">
                https://cubeproject.com/p/potikhanov
              </Anchor>
              <CopyButton value="https://cubeproject.com/p/potikhanov" timeout={10000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Link copied" : "Copy link"} withArrow position="top">
                    <ActionIcon color={copied ? "teal" : "gray"} onClick={copy} size="sm">
                      {copied ? <BiCheckDouble size={16} /> : <BiCopy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
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

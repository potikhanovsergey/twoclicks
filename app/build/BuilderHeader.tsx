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
  ThemeIcon,
  TextInput,
} from "@mantine/core"
import { useClickOutside, useFullscreen, useHotkeys, useHover } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
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
import { AiOutlineLink } from "react-icons/ai"
import HistoryButtons from "./HistoryButtons"
import { IoCheckmarkOutline } from "react-icons/io5"
import useTranslation from "next-translate/useTranslation"

const AuthorizedActions = observer(() => {
  const session = useSession()
  const {
    data: { id },
  } = BuildStore
  return session.userId ? <>{id && <TogglePublishPortfilio id={id} />}</> : <></>
})

const ObservedPreviewPortfolio = observer(() => {
  const { isCanvasEmpty } = BuildStore
  const { t } = useTranslation("pagesBuild")

  return !isCanvasEmpty ? (
    <Tooltip label={t("preview mode")} position="bottom-start" color="violet" withArrow>
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
        <Group align="center" spacing={4}>
          <AiOutlineLink />
          <Text>{name}</Text>
        </Group>
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
  const { toggle, fullscreen } = useFullscreen()
  const { hovered: fullscreenHovered, ref: fullscreenRef } = useHover<HTMLButtonElement>()
  const [inputVisible, setInputVisible] = useState(false)
  const {
    data: { name, id },
  } = BuildStore
  const [editName, setEditName] = useState(name)
  const editNameOutsideRef = useClickOutside(() => setInputVisible(false))
  const [
    updatePortfolioMutation,
    { isLoading: isUpdatingPortfolio, isSuccess: hasSuccessfullyUpdatedPortfolio },
  ] = useMutation(updatePortfolio)

  useEffect(() => {
    setEditName(name)
  }, [name])

  useEffect(() => {
    if (hasSuccessfullyUpdatedPortfolio) {
      setInputVisible(false)
      BuildStore.data.name = editName
    }
  }, [hasSuccessfullyUpdatedPortfolio])

  const { t } = useTranslation("pagesBuild")

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
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {!inputVisible ? (
              <Group spacing={4} align="center">
                <ObservedPortfolioName />
                <Tooltip label={t("edit site name")} position="bottom" color="violet" withArrow>
                  <ActionIcon
                    color="violet"
                    variant="light"
                    onClick={() => {
                      setInputVisible(true)
                    }}
                  >
                    <AiOutlineEdit />
                  </ActionIcon>
                </Tooltip>
              </Group>
            ) : (
              <Group spacing={4} ref={editNameOutsideRef}>
                <TextInput
                  size="xs"
                  value={editName || ""}
                  onChange={(evt) => {
                    setEditName(evt.currentTarget.value)
                  }}
                  maxLength={32}
                />
                <Tooltip label={t("edit site name")} position="bottom" color="violet" withArrow>
                  <div>
                    <ActionIcon
                      color="violet"
                      variant="light"
                      disabled={editName === name || !editName?.length}
                      loading={isUpdatingPortfolio}
                      onClick={() => {
                        if (id && editName?.length) {
                          void updatePortfolioMutation({ name: editName, id })
                        }
                      }}
                    >
                      <IoCheckmarkOutline />
                    </ActionIcon>
                  </div>
                </Tooltip>
              </Group>
            )}
          </Box>
          <Group spacing={8}>
            <HistoryButtons color="violet" size={30} variant="filled" />
            <ViewportButtons color="violet" size={30} />
            <Tooltip
              color="violet"
              label={fullscreen ? t("turn off fullscreen mode") : t("turn on fullscreen mode")}
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

export default observer(BuilderHeader)
function setOpened(arg0: boolean): void {
  throw new Error("Function not implemented.")
}

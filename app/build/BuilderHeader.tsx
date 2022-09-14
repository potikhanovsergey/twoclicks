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
  Stack,
  ScrollArea,
} from "@mantine/core"
import { useClickOutside, useFullscreen, useHotkeys, useHover } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { observer } from "mobx-react-lite"
import React, { Suspense, useEffect, useMemo, useState } from "react"
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
import { FiChevronDown } from "react-icons/fi"
import Link from "next/link"

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

  const { portfolios } = AppStore

  const [inputVisible, setInputVisible] = useState(false)
  const [editName, setEditName] = useState(name)
  const editNameOutsideRef = useClickOutside(() => setInputVisible(false))
  const [
    updatePortfolioMutation,
    { isLoading: isUpdatingPortfolio, isSuccess: hasSuccessfullyUpdatedPortfolio },
  ] = useMutation(updatePortfolio)

  useEffect(() => {
    setEditName(name)
  }, [name])

  const dividedPortfolios = useMemo(() => {
    const portfolio = portfolios?.find((p) => p.id === id)
    if (!portfolio) return null
    return {
      current: portfolio,
      rest: portfolios.filter((p) => p.id !== portfolio.id),
    }
  }, [portfolios, id])

  useEffect(() => {
    if (hasSuccessfullyUpdatedPortfolio) {
      setInputVisible(false)
      if (editName) {
        BuildStore.data.name = editName
        if (dividedPortfolios?.current) {
          dividedPortfolios.current.name = editName
        }
      }
    }
  }, [hasSuccessfullyUpdatedPortfolio])

  const { t } = useTranslation("pagesBuild")

  return session.userId ? (
    <HoverCard shadow="lg" width={312}>
      <HoverCard.Target>
        <Group align="center" spacing={4}>
          {dividedPortfolios?.current?.isPublished && <AiOutlineLink />}
          <Text>{name}</Text>
          <FiChevronDown />
        </Group>
      </HoverCard.Target>
      <HoverCard.Dropdown p={8}>
        <ScrollArea.Autosize
          maxHeight={160}
          type="never"
          offsetScrollbars
          styles={{ viewport: { padding: 0 } }}
        >
          {dividedPortfolios && (
            <Stack spacing={4}>
              <Text weight="bold">Current page:</Text>
              {id && dividedPortfolios?.current?.isPublished && (
                <PortfolioLink id={id} withEllipsis />
              )}

              <Group noWrap spacing={4} mb="sm">
                {!inputVisible ? (
                  <>
                    <Button variant="light" size="xs" fullWidth disabled>
                      {dividedPortfolios.current.name}
                    </Button>
                    <Tooltip
                      label={t("edit site name")}
                      position="bottom"
                      withArrow
                      withinPortal
                      zIndex={301}
                    >
                      <ActionIcon
                        color="violet"
                        variant="light"
                        size={30}
                        onClick={() => {
                          setInputVisible(true)
                        }}
                      >
                        <AiOutlineEdit />
                      </ActionIcon>
                    </Tooltip>
                  </>
                ) : (
                  <Group spacing={4} ref={editNameOutsideRef} noWrap style={{ width: "100%" }}>
                    <TextInput
                      size="xs"
                      value={editName || ""}
                      onChange={(evt) => {
                        setEditName(evt.currentTarget.value)
                      }}
                      maxLength={32}
                      sx={{ width: "100%", flexGrow: 1 }}
                    />
                    <ActionIcon
                      color="violet"
                      variant="light"
                      size={30}
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
                  </Group>
                )}
              </Group>
              {dividedPortfolios.rest.length > 0 ? (
                <>
                  <Text weight="bold">Other pages:</Text>
                  {dividedPortfolios.rest.map((p) => (
                    <Link passHref href={`/build/${p.id}`} key={p.id}>
                      <Button variant="light" size="xs" component="a">
                        {p.name}
                      </Button>
                    </Link>
                  ))}
                </>
              ) : (
                <Text size="sm">Other pages will be here when you add them</Text>
              )}
            </Stack>
          )}
        </ScrollArea.Autosize>
      </HoverCard.Dropdown>
    </HoverCard>
  ) : (
    <></>
  )
})

const BuilderHeader = ({ className }: { className?: string }) => {
  // const { t } = useTranslation('pagesBuild');
  const { toggle, fullscreen } = useFullscreen()
  const { hovered: fullscreenHovered, ref: fullscreenRef } = useHover<HTMLButtonElement>()
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
            <ObservedPortfolioName />
          </Box>
          <Group spacing={8}>
            <HistoryButtons color="violet" size={30} variant="filled" />
            <ViewportButtons color="violet" size={30} />
            <Tooltip
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

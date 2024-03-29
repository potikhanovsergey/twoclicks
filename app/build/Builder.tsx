import {
  Stack,
  Button,
  createStyles,
  Container,
  Text,
  Modal,
  useMantineTheme,
  Group,
  MantineProvider,
  Loader,
  Center,
  Box,
} from "@mantine/core"
import React, { RefObject, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"
import BuilderHeader from "./BuilderHeader"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import { useElementSize, useLocalStorage } from "@mantine/hooks"
import { useMutation } from "@blitzjs/rpc"
import updatePage from "app/build-pages/mutations/updatePage"
import IPhone from "../../assets/IPhone7.png"

import { ICanvasBlock, ICanvasData, ICanvasPalette, IPage, IThemeSettings } from "types"
import { autorun } from "mobx"
import { baseURL } from "pages/_app"
import useTranslation from "next-translate/useTranslation"
import BuilderBlocks from "./BuilderBlocks"
import { storageAvailable } from "helpers"
import dynamic from "next/dynamic"

const Onboarding = dynamic(() => import("./Onboarding"))

const useStyles = createStyles((theme) => ({
  builder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
    paddingTop: "40px",
  },
  canvasContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  canvas: {
    boxShadow: theme.colorScheme === "dark" ? theme.shadows.sm : theme.other.lightShadow,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  header: {
    position: "fixed",
    left: 0,
    right: 0,
    top: "var(--layout-header-height)",
    zIndex: 301,
    minHeight: "40px",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    boxShadow: theme.colorScheme === "dark" ? theme.shadows.md : theme.other.lightShadow,
  },
  onboarding: {
    position: "sticky",
    bottom: "12px",
    marginLeft: "-48px",
    height: 0,
    transform: "translateY(-40px)",
  },
}))

const SaveRedirectButton = observer(() => {
  const session = useSession()
  const router = useRouter()

  const {
    savePage,
    data: { id: pageID },
  } = BuildStore

  const [updatePageMutation] = useMutation(updatePage)

  const handleSaveAndRedirect = async () => {
    void savePage({ session, updatePageMutation })
    void router.push(`/auth/?next=/build/${pageID}`)
  }

  const { t } = useTranslation("build")

  return <Button onClick={handleSaveAndRedirect}>{t("save and go to the auth page")}</Button>
})

const Canvas = ({ parentRef }: { parentRef: RefObject<HTMLDivElement> }) => {
  // const { ref: onboardingRef, width: onboardingWidth } = useElementSize() // ONBOARDING

  // const [containerWidth, setContainerWidth] = useState(0)
  // useLayoutEffect(() => {
  //   if (parentRef.current) {
  //     setContainerWidth(parentRef.current.offsetWidth)
  //   }
  // }, [])

  const {
    isCanvasEmpty,
    data: { theme },
  } = BuildStore
  const session = useSession()
  const { classes } = useStyles()
  return (
    <Stack spacing={0} className={classes.canvas} style={{ height: "100%" }}>
      <BuilderBlocks />
      {/* {session.userId ? (
        <div
          ref={onboardingRef}
          className={classes.onboarding}
          style={{
            left: `calc((100vw - ${containerWidth}px) / 2 - ${onboardingWidth}px - 8px)`,
            marginTop: isCanvasEmpty ? "24px" : 0,
          }}
        >
          <Onboarding />
        </div>
      ) : (
        <></>
      )} */}
    </Stack>
  )
}

const SaveAndRedirectModal = () => {
  const session = useSession()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  const { t } = useTranslation("build")

  return (
    <Modal
      opened={BuildStore.sectionsCount >= 3 && !session.userId}
      onClose={() => 1}
      overlayColor={dark ? theme.colors.dark[9] : theme.colors.dark[9]}
      overlayOpacity={0.6}
      overlayBlur={0.8}
      withCloseButton={false}
      zIndex={1000}
      centered
      radius="md"
      styles={{
        root: {
          top: "var(--layout-header-height)",
        },
        overlay: {
          top: "var(--layout-header-height)",
          "> div": {
            top: 0,
          },
        },
      }}
    >
      <Stack align="center">
        <Group align="center" spacing={8} noWrap>
          <Text weight="bold" size="lg">
            {t("please, register or authorize to continue")}
          </Text>
        </Group>
        <SaveRedirectButton />
      </Stack>
    </Modal>
  )
}

const Builder = () => {
  // const { t } = useTranslation('build');

  const { classes } = useStyles()
  const theme = useMantineTheme()

  const { viewMode, isCanvasEmpty, data } = BuildStore
  const containerRef = useRef<HTMLDivElement>(null)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [, setPreviewPage] = useLocalStorage<{
    blocks: ICanvasBlock[]
    name: string | null
    theme: IPage["theme"]
    themeSettings: IThemeSettings
  }>({
    key: "preview-page",
  })

  const handleIframeLoad = () => {
    setPreviewPage({
      blocks: data.blocks,
      themeSettings: data.themeSettings,
      name: data.name,
      theme: data.theme,
    })
    const cssLink = document.createElement("link")
    cssLink.href = "/iframe.css"
    cssLink.rel = "stylesheet"
    cssLink.type = "text/css"
    iframeRef?.current?.contentWindow?.document.head.appendChild(cssLink)
  }

  useEffect(() => {
    autorun(() => {
      setPreviewPage({
        blocks: data.blocks,
        themeSettings: data.themeSettings,
        name: data.name,
        theme: data.theme,
      })
    })
  }, [data.blocks, data.name, data.palette, data.theme, data.themeSettings])

  const router = useRouter()

  useEffect(() => {
    const handleComplete = () => {
      BuildStore.hasPageChanged = false
    }

    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  })

  const { t } = useTranslation("build")

  const [isStorageAvailable, setIsStorageAvailable] = useState(false)

  useEffect(() => {
    setIsStorageAvailable(storageAvailable())
  }, [])

  return (
    <div className={classes.builder}>
      <BuilderHeader className={classes.header} />
      <MantineProvider
        inherit
        theme={{ colorScheme: data.theme === "inherit" ? theme.colorScheme : data.theme }}
      >
        <Container
          size="xl"
          px={64}
          py={viewMode === "mobile" ? 12 : 64}
          className={classes.canvasContainer}
          ref={containerRef}
        >
          <Center
            py={0}
            sx={{
              height: "100%",
              display: viewMode === "mobile" ? "flex" : "none",
            }}
          >
            {window !== undefined && isStorageAvailable ? (
              <Box
                sx={{
                  backgroundImage: `url(${IPhone.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "357px 760px",
                  width: "357px",
                  height: "760px",
                  overflow: "hidden",
                  transform: "scale(0.75)",
                  margin: "-85px 0",
                  "> iframe": {
                    width: "calc(357px - 37px)",
                    height: "calc(760px - 140px)",
                    border: "none",
                    borderRadius: "5px",
                    position: "relative",
                    top: "60px",
                    left: "18px",
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                }}
              >
                <iframe
                  tabIndex={-1}
                  onLoad={handleIframeLoad}
                  loading="lazy"
                  ref={iframeRef}
                  src={`${baseURL}/build-preview?hideScrollbar=true`}
                >
                  <Text>{t("browser iframe")}</Text>
                </iframe>
              </Box>
            ) : (
              <Text align="center" style={{ maxWidth: "45%" }}>
                Your web browser does not support storing settings locally. The most common cause of
                this is using <strong>Private Browsing/Incognito Mode</strong>. Some settings may
                not save or some features may not work properly for you.
              </Text>
            )}
          </Center>
          <Box
            sx={{
              display: viewMode !== "mobile" ? "block" : "none",
              height: "100%",
              ".builder-block ::selection": {
                background:
                  theme.colors?.[data?.themeSettings?.palette?.primary]?.[5] ||
                  theme.colors.primary[5],
                color: theme.white,
                WebkitTextFillColor: theme.white,
              },
            }}
          >
            <Canvas parentRef={containerRef} />
          </Box>
        </Container>
      </MantineProvider>
      <SaveAndRedirectModal />
    </div>
  )
}

export default observer(Builder)

import {
  Stack,
  Button,
  createStyles,
  Container,
  Text,
  Modal,
  useMantineTheme,
  ThemeIcon,
  Group,
  MantineProvider,
  Loader,
  Center,
  Box,
} from "@mantine/core"
import React, { Suspense, useEffect, useRef, useState, useTransition } from "react"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"
import BuilderHeader from "./BuilderHeader"
import Onboarding from "./Onboarding"
import { useSession } from "@blitzjs/auth"
import { MdOutlineEmojiNature } from "react-icons/md"
import { useRouter } from "next/router"
import { useElementSize, useLocalStorage } from "@mantine/hooks"
import { useMutation } from "@blitzjs/rpc"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import IPhone from "../../assets/IPhone7.png"

import { ICanvasBlock, ICanvasPalette } from "types"
import { autorun } from "mobx"
import { baseURL } from "pages/_app"
import useTranslation from "next-translate/useTranslation"
import BuilderBlocks from "./BuilderBlocks"

const useStyles = createStyles((theme) => ({
  builder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
  },
  canvasContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  canvas: {
    backgroundColor: theme.white,
    color: theme.black,
    boxShadow: theme.shadows.sm,
  },
  header: {
    position: "sticky",
    top: "var(--layout-header-height)",
    zIndex: 301,
    minHeight: "40px",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    boxShadow: theme.shadows.md,
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
    savePortfolio,
    data: { id: portfolioID },
  } = BuildStore

  const [updatePortfolioMutation] = useMutation(updatePortfolio)

  const handleSaveAndRedirect = () => {
    void savePortfolio({ session, updatePortfolioMutation })
    void router.push(`/auth/?next=/build/${portfolioID}`)
  }

  const { t } = useTranslation("pagesBuild")

  return (
    <Button color="violet" onClick={handleSaveAndRedirect}>
      {t("save and go to the auth page")}
    </Button>
  )
})

const Canvas = ({ containerWidth }: { containerWidth: number }) => {
  const { ref: onboardingRef, width: onboardingWidth } = useElementSize()

  const { isCanvasEmpty } = BuildStore
  const session = useSession()
  const { classes } = useStyles()
  return (
    <Stack
      spacing={0}
      className={classes.canvas}
      style={{ height: isCanvasEmpty ? "100%" : "auto" }}
    >
      <MantineProvider inherit theme={{ colorScheme: "light" }}>
        <BuilderBlocks />
      </MantineProvider>
      {session.userId ? (
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
      )}
    </Stack>
  )
}

const Builder = () => {
  // const { t } = useTranslation('pagesBuild');

  const { classes } = useStyles()
  const theme = useMantineTheme()

  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const session = useSession()

  const { viewMode, isCanvasEmpty, data } = BuildStore
  const { ref: containerRef, width: containerWidth } = useElementSize()

  const iframeRef = useRef(null)

  const [, setPreviewPortfolio] = useLocalStorage<{
    blocks: ICanvasBlock[]
    palette: ICanvasPalette
    name: string | null
  }>({
    key: "preview-portfolio",
  })

  const handleIframeLoad = () => {
    setPreviewPortfolio({ blocks: data.blocks, palette: data.palette, name: data.name })
  }

  useEffect(() => {
    autorun(() => {
      setPreviewPortfolio({ blocks: data.blocks, palette: data.palette, name: data.name })
    })
  }, [data.blocks, data.palette])

  const { t } = useTranslation("pagesBuild")

  return (
    <div className={classes.builder}>
      <BuilderHeader className={classes.header} />
      <Container
        size="xl"
        px={64}
        py={viewMode === "mobile" ? 12 : isCanvasEmpty ? 24 : 64}
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
                top: "55px",
                left: "18px",
              },
            }}
          >
            <iframe
              onLoad={handleIframeLoad}
              ref={iframeRef}
              src={`${baseURL}/build-preview?hideScrollbar=true`}
            >
              <Text>{t("browser iframe")}</Text>
            </iframe>
          </Box>
        </Center>
        <Suspense fallback={<Loader />}>
          <div style={{ display: viewMode !== "mobile" ? "block" : "none", height: "100%" }}>
            <Canvas containerWidth={containerWidth} />
          </div>
        </Suspense>
      </Container>

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
            <ThemeIcon color="violet" variant="light">
              <MdOutlineEmojiNature size={24} />
            </ThemeIcon>
          </Group>
          <SaveRedirectButton />
        </Stack>
      </Modal>
    </div>
  )
}

export default observer(Builder)

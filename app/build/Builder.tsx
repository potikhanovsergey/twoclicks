import {
  Stack,
  Button,
  createStyles,
  ScrollArea,
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
import React, { Suspense, useEffect, useRef } from "react"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"
import BuilderHeader from "./BuilderHeader"
import Onboarding from "./Onboarding"
import { useSession } from "@blitzjs/auth"
import { MdOutlineEmojiNature } from "react-icons/md"
import { useRouter } from "next/router"
import BuilderBlocks from "./BuilderBlocks"
import { useElementSize, useLocalStorage, useScrollLock } from "@mantine/hooks"
import { useMutation } from "@blitzjs/rpc"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { Context as ResponsiveContext } from "react-responsive"
import ConditionalWrapper from "app/core/components/ConditionalWrapper"
import IPhone from "../../assets/IPhone7.png"

import DeviceEmulator from "react-device-emulator"
import "react-device-emulator/lib/styles/style.css"
import { ICanvasBlock, ICanvasData, ICanvasPalette } from "types"
import { autorun } from "mobx"

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

  return (
    <Button color="violet" onClick={handleSaveAndRedirect}>
      Save and go to the auth page
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
  }>({
    key: "preview-portfolio",
  })

  const handleIframeLoad = () => {
    setPreviewPortfolio({ blocks: data.blocks, palette: data.palette })
  }

  useEffect(() => {
    autorun(() => {
      setPreviewPortfolio({ blocks: data.blocks, palette: data.palette })
    })
  }, [data.blocks, data.palette])

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
        {viewMode === "mobile" ? (
          <Center
            py={0}
            sx={{
              height: "100%",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${IPhone.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "310px 600px",
                height: "600px",
                width: "310px",
                overflow: "hidden",
                "> iframe": {
                  width: "calc(310px - 37px)",
                  height: "calc(600px - 140px)",
                  border: "none",
                  borderRadius: "5px",
                  position: "relative",
                  top: "70px",
                  left: "18px",
                },
              }}
            >
              <iframe
                onLoad={handleIframeLoad}
                ref={iframeRef}
                src="http://localhost:3000/preview/6303bddc8a6d3a811067bb1b?hideScrollbar=true"
              ></iframe>
            </Box>
          </Center>
        ) : (
          <Suspense fallback={<Loader />}>
            <Canvas containerWidth={containerWidth} />
          </Suspense>
        )}
      </Container>
      <Modal
        opened={BuildStore.sectionsCount >= 3 && !session.userId}
        onClose={() => 1}
        overlayColor={dark ? theme.colors.dark[9] : theme.colors.dark[9]}
        overlayOpacity={0.6}
        overlayBlur={1}
        withCloseButton={false}
        zIndex={99}
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
              Please, register or authorize to continue
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

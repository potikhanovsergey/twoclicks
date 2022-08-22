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
} from "@mantine/core"
import React, { Suspense, useRef } from "react"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"
import BuilderHeader from "./BuilderHeader"
import Onboarding from "./Onboarding"
import { useSession } from "@blitzjs/auth"
import { MdOutlineEmojiNature } from "react-icons/md"
import { useRouter } from "next/router"
import BuilderBlocks from "./BuilderBlocks"
import { useElementSize } from "@mantine/hooks"
import { useMutation } from "@blitzjs/rpc"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { DeviceFrameset } from "react-device-frameset"
import "react-device-frameset/styles/marvel-devices.min.css"
import { Context as ResponsiveContext } from "react-responsive"
import ConditionalWrapper from "app/core/components/ConditionalWrapper"

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

  const { viewMode, isCanvasEmpty } = BuildStore
  const { ref: containerRef, width: containerWidth } = useElementSize()
  return (
    <div className={classes.builder}>
      <BuilderHeader className={classes.header} />
      <Container
        size="xl"
        px={64}
        py={isCanvasEmpty ? 24 : 64}
        className={classes.canvasContainer}
        ref={containerRef}
      >
        <Suspense fallback={<Loader />}>
          <ConditionalWrapper
            condition={viewMode === "mobile"}
            wrap={(children) => (
              <Center
                style={{ height: "100%" }}
                py="xl"
                sx={{
                  height: "100%",
                  ".screen": { overflowY: "scroll" },
                }}
              >
                <ResponsiveContext.Provider value={{ width: 500 }}>
                  <DeviceFrameset device="HTC One" color="gold">
                    {children}
                  </DeviceFrameset>
                </ResponsiveContext.Provider>
              </Center>
            )}
          >
            <Canvas containerWidth={containerWidth} />
          </ConditionalWrapper>
        </Suspense>
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

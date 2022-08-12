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
} from "@mantine/core"
import React, { useContext, useEffect } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { deflate, renderJSXFromBlock } from "helpers"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"
import BuilderHeader from "./BuilderHeader"
import Onboarding from "./Onboarding"
import { useSession } from "@blitzjs/auth"
import { MdOutlineEmojiNature } from "react-icons/md"
import { setCookie } from "cookies-next"
import { useRouter } from "next/router"
import BuilderBlocks from "./BuilderBlocks"
import { useElementSize } from "@mantine/hooks"

const useStyles = createStyles((theme) => ({
  builder: {
    width: "100%",
    height: "calc(100vh - var(--layout-header-height))",
    display: "flex",
    flexFlow: "column",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
    // color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  canvasContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  canvasScroll: {
    width: "100%",
    height: "100%",
  },
  canvas: {
    backgroundColor: theme.white,
    color: theme.black,
    boxShadow: theme.shadows.sm,
    height: "100%",
  },
  header: {
    minHeight: "40px",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    boxShadow: theme.shadows.md,
  },
  onboarding: {
    position: "fixed",
    bottom: "16px",
  },
}))

const Builder = () => {
  // const { t } = useTranslation('pagesBuild');

  const { classes } = useStyles()
  const theme = useMantineTheme()

  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const session = useSession()
  const router = useRouter()

  const handleSaveAndRedirect = () => {
    const portfolio = {
      id: BuildStore.data.id,
      name: BuildStore.data.name,
      data: BuildStore.data.blocks,
    }
    setCookie(`portfolio-${BuildStore.data.id}`, deflate(portfolio))
    void router.push(`/auth/?next=/build/${portfolio.id}`)
  }

  const { ref: containerRef, width: containerWidth } = useElementSize()
  const { ref: onboardingRef, width: onboardingWidth } = useElementSize()

  return (
    <div className={classes.builder}>
      <BuilderHeader className={classes.header} />
      <ScrollArea
        className={classes.canvasScroll}
        styles={{
          viewport: {
            "> div": {
              height: "100%",
            },
          },
        }}
      >
        <Container size="xl" px={64} py={16} className={classes.canvasContainer} ref={containerRef}>
          <Stack spacing={0} className={classes.canvas}>
            <BuilderBlocks />
          </Stack>
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
        </Container>
      </ScrollArea>
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
          <Button color="violet" onClick={handleSaveAndRedirect}>
            Save and go to the auth page
          </Button>
        </Stack>
      </Modal>
    </div>
  )
}

export default Builder

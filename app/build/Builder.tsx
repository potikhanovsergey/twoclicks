import { useTranslation } from "next-i18next"
import {
  Stack,
  Button,
  createStyles,
  ScrollArea,
  Container,
  Text,
  Modal,
  Box,
  useMantineTheme,
  Center,
  ThemeIcon,
  Group,
} from "@mantine/core"
import React, { useContext, useEffect } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { inflateBase64, recursiveTagName } from "helpers"
import { BuildStore } from "store/build"
import { BuildingBlock } from "@prisma/client"
import { observer } from "mobx-react-lite"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createPortfolio from "app/portfolios/mutations/createPortfolio"
import getLatestPortfolio from "app/portfolios/queries/getLatestPortfolio"
import BuilderHeader from "./BuilderHeader"
import Onboarding from "./Onboarding"
import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { MdOutlineEmojiNature } from "react-icons/md"

const useStyles = createStyles((theme) => ({
  builder: {
    width: "100%",
    height: "calc(100vh - var(--build-header-height))",
    display: "flex",
    flexFlow: "column",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
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
    boxShadow: theme.shadows.sm,
    height: "100%",
  },
  header: {
    minHeight: "40px",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1],
    boxShadow: theme.shadows.md,
  },
  onboarding: {
    position: "absolute",
    left: "16px",
    bottom: "16px",
  },
}))
const BuilderBlocks = observer(() => {
  return (
    <>
      {BuildStore &&
        BuildStore.data.blocks.map((b, i) => {
          const TagName = recursiveTagName(b, true)
          if (TagName) {
            return TagName
          }
          return <React.Fragment key={i} />
        })}
    </>
  )
})

const Builder = () => {
  // const { t } = useTranslation('pagesBuild');
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const [latestPortfolio, { refetch: refetchLatestPortfolio }] = useQuery(
    getLatestPortfolio,
    null,
    { enabled: false }
  )
  const currentUser = useCurrentUser()
  const [createPortfolioMutation] = useMutation(createPortfolio)

  // ### Create user portfolio if it doesn't exist
  useEffect(() => {
    const createPortfolio = async () => {
      await createPortfolioMutation({ firstTime: true })
      void refetchLatestPortfolio()
    }
    if (currentUser && !currentUser.hasCreatedPortfolio) {
      if (!currentUser.hasCreatedPortfolio) {
        void createPortfolio()
      } else {
        void refetchLatestPortfolio()
      }
    }
  }, [currentUser])

  useEffect(() => {
    if (latestPortfolio?.data) {
      const inflatedData = inflateBase64(latestPortfolio.data)
      const dataBlocks = inflatedData as BuildingBlock[]
      BuildStore.data.blocks = dataBlocks
    }
  }, [latestPortfolio])

  const { classes } = useStyles()
  const theme = useMantineTheme()

  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const session = useSession()
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
        <Container size="xl" px={64} py={16} className={classes.canvasContainer}>
          <Stack spacing={0} className={classes.canvas}>
            <Text>{BuildStore.sectionsCount}</Text>
            <Text>{JSON.stringify(BuildStore.data.blocks)}</Text>
            <BuilderBlocks />
            <Button
              radius="xs"
              color="red"
              onClick={() =>
                setModalContext((prevValue: IModalContextValue) => ({
                  ...prevValue,
                  canvasSectionsModal: true,
                }))
              }
            >
              Add section
            </Button>
          </Stack>
          {session.userId ? (
            <div className={classes.onboarding}>
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
            top: "var(--build-header-height)",
          },
          overlay: {
            top: "var(--build-header-height)",
            "> div": {
              top: 0,
            },
          },
        }}
      >
        <Stack align="center">
          <Group align="center" spacing={8} noWrap>
            <Text weight="bold" size="lg">
              Please, register or authorize to continue{" "}
            </Text>
            <ThemeIcon color="violet" variant="light">
              <MdOutlineEmojiNature size={24} />
            </ThemeIcon>
          </Group>
          <Link passHref href="/auth/">
            <Button color="violet">Go to the auth page</Button>
          </Link>
        </Stack>
      </Modal>
    </div>
  )
}

export default Builder

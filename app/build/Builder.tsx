import { useTranslation } from "next-i18next"
import { Stack, Button, createStyles, ScrollArea, Container, useMantineTheme } from "@mantine/core"
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
    paddingTop: "16px",
    paddingBottom: "16px",
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
        <Container size="lg" className={classes.canvasContainer}>
          <Stack spacing={0} className={classes.canvas}>
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
        </Container>
      </ScrollArea>
    </div>
  )
}

export default Builder

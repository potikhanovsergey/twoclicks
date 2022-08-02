import { Stack, createStyles, Text, Button, MantineProvider, Loader, Center } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useContext, useEffect, useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
import CanvasComponentsModal from "app/core/components/modals/build/CanvasComponents"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
// import { useTranslation } from 'next-i18next';
import Builder from "app/build/Builder"
import { useRouter } from "next/router"
import { GetStaticPaths } from "next"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { BuildingBlock } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createPortfolio from "app/portfolios/mutations/createPortfolio"
import getLatestPortfolio from "app/portfolios/queries/getLatestPortfolio"
import { deflate, inflateBase64 } from "helpers"
import { BuildStore } from "store/build"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import { Ctx } from "@blitzjs/next"
import { PortfolioStarterMock } from "db/mocks"
import { IPortfolio } from "types"
import { getSession } from "@blitzjs/auth"

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colors.gray[1],
    color: theme.black,
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "var(--build-header-height)",
  },
}))

const BuildPage = ({ portfolio }: { portfolio: IPortfolio }) => {
  // const { t } = useTranslation('pagesBuild');
  const { classes } = useStyles()
  const [menuOpened, setMenuOpened] = useState(false)
  // const [latestPortfolio, { refetch: refetchLatestPortfolio }] = useQuery(
  //   getLatestPortfolio,
  //   null,
  //   { enabled: false }
  // )

  // const [portfolio] = useQuery(getPortfolioByID, { id: portfolioID })

  useEffect(() => {
    if (portfolio?.data) {
      BuildStore.data.blocks = portfolio.data
      BuildStore.data.name = portfolio.name
      BuildStore.data.id = portfolio.id
    }
  }, [portfolio])

  // const currentUser = useCurrentUser()
  // const [createPortfolioMutation] = useMutation(createPortfolio)

  // ### Create user portfolio if it doesn't exist
  // useEffect(() => {
  //   const createPortfolio = async () => {
  //     await createPortfolioMutation({ firstTime: true })
  //     void refetchLatestPortfolio()
  //   }
  //   if (currentUser && !currentUser.hasCreatedPortfolio) {
  //     if (!currentUser.hasCreatedPortfolio) {
  //       void createPortfolio()
  //     } else {
  //       void refetchLatestPortfolio()
  //     }
  //   }
  // }, [currentUser])

  // useEffect(() => {
  //   if (latestPortfolio?.data) {
  //     const inflatedData = inflateBase64(latestPortfolio.data)
  //     const dataBlocks = inflatedData as BuildingBlock[]
  //     BuildStore.data.blocks = dataBlocks
  //   }
  // }, [latestPortfolio])
  return (
    <>
      <LayoutHeader menuOpened={menuOpened} setMenuOpened={setMenuOpened} fixed />
      <main className={classes.main}>
        {portfolio ? (
          <Suspense fallback={<Loader />}>
            <Builder />
            <CanvasComponentsModal />
            <CanvasSectionsModal />
          </Suspense>
        ) : (
          <Center>
            <Text>Портфолио не найдено</Text>
          </Center>
        )}
      </main>
    </>
  )
}

BuildPage.suppressFirstRenderFlicker = true

export async function getServerSideProps(
  ctx: Ctx & { params: { portfolioID: string }; locale: string; req: any; res: any }
) {
  const { params, locale, req, res } = ctx
  const session = await getSession(req, res)
  const isNew = params.portfolioID === "new"

  const getPortfolio = async () => {
    if (isNew) return await PortfolioStarterMock
    if (session) {
      console.log("SESSION")
      return await getPortfolioByID({ id: params.portfolioID }, { ...ctx, session })
    } else {
      console.log("RETURN NULL")
      // let portfolioFromLS = localStorage.getItem(`portfolio-${params.portfolioID}`)
      // return portfolioFromLS ? inflateBase64(portfolioFromLS) : null
      return null
    }
  }

  const portfolio = await getPortfolio()

  if (!isNew && portfolio) {
    portfolio.data = inflateBase64(portfolio.data.toString())
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
      portfolio,
    },
  }
}

export default BuildPage

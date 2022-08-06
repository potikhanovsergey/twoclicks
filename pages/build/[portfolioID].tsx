import { createStyles, Text, Loader, Center } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useEffect, useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
import CanvasComponentsModal from "app/core/components/modals/build/CanvasComponents"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
// import { useTranslation } from 'next-i18next';
import Builder from "app/build/Builder"
import { getPortfolioWithInflatedData, inflateBase64 } from "helpers"
import { BuildStore } from "store/build"
import { Ctx, useParam } from "@blitzjs/next"
import { PortfolioStarterMock } from "db/mocks"
import { IPortfolio } from "types"
import { getSession, useSession } from "@blitzjs/auth"
import { deleteCookie, getCookie } from "cookies-next"
import db, { BuildingBlock, Portfolio } from "db"
import { useRouter } from "next/router"
import shortid from "shortid"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import createOrUpdatePortfolio from "app/portfolios/mutations/createOrUpdatePortfolio"
import { useHotkeys } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
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
    paddingTop: "var(--layout-header-height)",
  },
}))

const BuildPage = () => {
  // const { t } = useTranslation('pagesBuild');
  const { classes } = useStyles()
  const [menuOpened, setMenuOpened] = useState(false)
  const session = useSession()
  const portfolioID = useParam("portfolioID", "string")

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null)
  const [createOrUpdatePortfolioMutation] = useMutation(createOrUpdatePortfolio)

  const [portfolioFromDB] = useQuery(
    getPortfolioByID,
    { id: portfolioID },
    { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPortfolio | null = null
      if (!portfolioFromDB) {
        let portfolioFromCookie = getCookie(`portfolio-${portfolioID}`) as string | undefined
        if (portfolioFromCookie) {
          console.log("portfolioFromCookie", portfolioFromCookie)
          let inflatedPortfolio = getPortfolioWithInflatedData(inflateBase64(portfolioFromCookie))
          if (session.userId) {
            void createOrUpdatePortfolioMutation(inflatedPortfolio)
            deleteCookie(`portfolio-${portfolioID}`)
          }
          p = inflatedPortfolio
        }
      } else {
        p = getPortfolioWithInflatedData(portfolioFromDB)
      }
      setPortfolio(p)
    }

    void getPortfolio()
  }, [portfolioFromDB])

  useEffect(() => {
    if (portfolio?.data) {
      BuildStore.setData({
        blocks: portfolio.data,
        name: portfolio.name,
        id: portfolio.id,
        flattenBlocks: {},
      })
    }
  }, [portfolio])

  // const router = useRouter()
  // useEffect(() => {
  //   if (!session.userId && !getCookie(`portfolio-${portfolioID}`)) {
  //     void router.push("/build/")
  //   }
  // }, [session])

  // const { savePortfolio } = BuildStore
  // const [updatePortfolioMutation] = useMutation(updatePortfolio)

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

export const getServerSideProps = async (
  ctx: Ctx & { params: { portfolioID: string }; locale: string; req: any; res: any }
) => {
  const { locale } = ctx
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
    },
  }
}

export default BuildPage

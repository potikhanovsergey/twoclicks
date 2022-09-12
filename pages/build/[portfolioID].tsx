import {
  Text,
  Loader,
  Center,
  LoadingOverlay,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import CanvasComponentsModal from "app/core/components/modals/build/CanvasComponents"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
import useTranslation from "next-translate/useTranslation"
import Builder from "app/build/Builder"
import { getPortfolioWithInflatedData, inflateBase64 } from "helpers"
import { BuildStore } from "store/build"
import { Ctx, useParam } from "@blitzjs/next"
import { IPortfolio } from "types"
import { useSession } from "@blitzjs/auth"
import { deleteCookie, getCookie } from "cookies-next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import createOrUpdatePortfolio from "app/portfolios/mutations/createOrUpdatePortfolio"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import MainLoader from "app/core/components/MainLoader"
import VioletRedGradient from "app/core/components/base/VioletRedGradient"
import { AppStore } from "store"
import { useDocumentTitle } from "@mantine/hooks"

const BuildPage = () => {
  const { t } = useTranslation("pagesBuild")
  const session = useSession()
  const portfolioID = useParam("portfolioID", "string")

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null)
  const [createOrUpdatePortfolioMutation] = useMutation(createOrUpdatePortfolio)

  const [
    portfolioFromDB,
    {
      refetch: refetchPortfolioFromDB,
      isLoading: isPortfolioLoading,
      isFetching: isPortfolioFetching,
      isRefetching: isPortfolioRefetching,
    },
  ] = useQuery(
    getPortfolioByID,
    { id: portfolioID, isPublic: false },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPortfolio | null = null
      if (!portfolioFromDB) {
        let portfolioFromLC = localStorage?.getItem(`portfolio-${portfolioID}`) as
          | string
          | undefined
        if (portfolioFromLC) {
          let inflatedPortfolio = getPortfolioWithInflatedData(inflateBase64(portfolioFromLC))
          if (session.userId) {
            const portfolio = await createOrUpdatePortfolioMutation(inflatedPortfolio)
            if (portfolio) {
              AppStore.portfolios = [...AppStore.portfolios, portfolio]
              localStorage?.removeItem(`portfolio-${portfolioID}`)
            }
          }
          p = inflatedPortfolio
        }
      } else {
        p = getPortfolioWithInflatedData(portfolioFromDB)
        if (!AppStore.portfolios.find((p) => p.id === portfolioFromDB.id)) {
          AppStore.portfolios.push(portfolioFromDB)
        }
      }
      setPortfolio(p)
    }

    void getPortfolio()
    setIsLoading(false)
  }, [portfolioFromDB])

  const {
    resetHistoryOfChanges,
    setData,
    data: { name },
  } = BuildStore
  const [isLoading, setIsLoading] = useState(true)

  useDocumentTitle(name || "skillcase")

  useEffect(() => {
    if (portfolio?.data) {
      setData({
        blocks: portfolio.data,
        name: portfolio.name,
        id: portfolio.id,
        palette: portfolio.palette,
        flattenBlocks: {},
        isPublished: portfolio.isPublished,
      })
      resetHistoryOfChanges()
      BuildStore.unlockedElements = {}
    }
    // return () => resetData()
  }, [portfolio])

  useEffect(() => {
    if (session && !portfolioFromDB) {
      void refetchPortfolioFromDB()
    }
  }, [session])

  if (isLoading) return <LoadingOverlay visible={true} loader={<MainLoader size={128} />} />

  return (
    <>
      {portfolio ? (
        <Suspense fallback={<Loader />}>
          <Builder />
          <CanvasComponentsModal />
          <CanvasSectionsModal />
          <VioletRedGradient />
        </Suspense>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>{t("portfolio not found")}</Text>
        </Center>
      )}
    </>
  )
}

BuildPage.getLayout = getBaseLayout({ headerWithTransparency: false })
BuildPage.suppressFirstRenderFlicker = true

export default BuildPage

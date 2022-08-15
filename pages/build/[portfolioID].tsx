import { Text, Loader, Center, LoadingOverlay } from "@mantine/core"
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
import CubeLoader from "app/core/components/CubeLoader"

const BuildPage = () => {
  // const { t } = useTranslation('pagesBuild');
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
        let portfolioFromCookie = localStorage?.getItem(`portfolio-${portfolioID}`) as
          | string
          | undefined
        if (portfolioFromCookie) {
          let inflatedPortfolio = getPortfolioWithInflatedData(inflateBase64(portfolioFromCookie))
          if (session.userId) {
            void createOrUpdatePortfolioMutation(inflatedPortfolio)
            localStorage?.removeItem(`portfolio-${portfolioID}`)
          }
          p = inflatedPortfolio
        }
      } else {
        p = getPortfolioWithInflatedData(portfolioFromDB)
      }
      setPortfolio(p)
    }

    void getPortfolio()
    setIsLoading(false)
  }, [portfolioFromDB])

  const { resetData, setData } = BuildStore
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (portfolio?.data) {
      setData({
        blocks: portfolio.data,
        name: portfolio.name,
        id: portfolio.id,
        palette: portfolio.palette,
        flattenBlocks: {},
      })
    }
    // return () => resetData()
  }, [portfolio])

  useEffect(() => {
    if (session && !portfolioFromDB) {
      void refetchPortfolioFromDB()
    }
  }, [session])

  if (isLoading) return <LoadingOverlay visible={true} loader={<CubeLoader size={128} />} />

  return (
    <>
      {portfolio ? (
        <Suspense fallback={<Loader />}>
          <Builder />
          <CanvasComponentsModal />
          <CanvasSectionsModal />
        </Suspense>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>Портфолио не найдено</Text>
        </Center>
      )}
    </>
  )
}

BuildPage.getLayout = getBaseLayout()
BuildPage.suppressFirstRenderFlicker = true

export default BuildPage

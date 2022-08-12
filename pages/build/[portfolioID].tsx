import { Text, Loader, Center } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useEffect, useState } from "react"
import CanvasComponentsModal from "app/core/components/modals/build/CanvasComponents"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
// import { useTranslation } from 'next-i18next';
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

const BuildPage = () => {
  // const { t } = useTranslation('pagesBuild');
  const session = useSession()
  const portfolioID = useParam("portfolioID", "string")

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null)
  const [createOrUpdatePortfolioMutation] = useMutation(createOrUpdatePortfolio)

  const [portfolioFromDB, { refetch: refetchPortfolioFromDB }] = useQuery(
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

  const { resetData, setData } = BuildStore

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

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
import Portfolio from "app/p/Portfolio"

const PortfolioPage = () => {
  // const { t } = useTranslation('pagesBuild');
  const portfolioID = useParam("portfolioID", "string")

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null)

  const [portfolioFromDB, { refetch: refetchPortfolioFromDB }] = useQuery(
    getPortfolioByID,
    { id: portfolioID },
    { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPortfolio | null = null
      p = getPortfolioWithInflatedData(portfolioFromDB)
      setPortfolio(p)
    }
    void getPortfolio()
  }, [portfolioFromDB])

  return (
    <>
      {portfolio ? (
        <Suspense fallback={<Loader />}>
          <Portfolio portfolio={portfolio} />
        </Suspense>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>Портфолио не найдено</Text>
        </Center>
      )}
    </>
  )
}

PortfolioPage.getLayout = getBaseLayout()
PortfolioPage.suppressFirstRenderFlicker = true

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

export default PortfolioPage

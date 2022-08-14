import { Text, Loader, Center, LoadingOverlay } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useEffect, useState } from "react"
// import { useTranslation } from 'next-i18next';
import { getPortfolioWithInflatedData } from "helpers"
import { Ctx, useParam } from "@blitzjs/next"
import { IPortfolio } from "types"
import { useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import Portfolio from "app/p/Portfolio"
import CubeLoader from "app/core/components/CubeLoader"

const PortfolioPage = () => {
  // const { t } = useTranslation('pagesBuild');
  const portfolioID = useParam("portfolioID", "string")

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null)

  const [portfolioFromDB, { refetch: refetchPortfolioFromDB }] = useQuery(
    getPortfolioByID,
    { id: portfolioID },
    { refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPortfolio | null = null
      p = getPortfolioWithInflatedData(portfolioFromDB)
      setPortfolio(p)
    }
    void getPortfolio()
    setIsLoading(false)
  }, [portfolioFromDB])

  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) return <LoadingOverlay visible={true} loader={<CubeLoader size={128} />} />

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

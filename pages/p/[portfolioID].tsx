import { Text, Loader, Center, LoadingOverlay, MantineProvider } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import { getPortfolioWithInflatedData } from "helpers"
import { Ctx, useParam } from "@blitzjs/next"
import { IPortfolio } from "types"
import { useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import Portfolio from "app/p/Portfolio"
import CubeLoader from "app/core/components/CubeLoader"
import { useDocumentTitle } from "@mantine/hooks"

const PortfolioPage = () => {
  // const { t } = useTranslation('pagesBuild');
  const portfolioID = useParam("portfolioID", "string")

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null)

  const [portfolioFromDB, { refetch: refetchPortfolioFromDB }] = useQuery(
    getPortfolioByID,
    { id: portfolioID, isPublic: true },
    { refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPortfolio | null = null
      if (portfolioFromDB) {
        p = getPortfolioWithInflatedData(portfolioFromDB)
      }
      setPortfolio(p)
    }
    void getPortfolio()
    setIsLoading(false)
  }, [portfolioFromDB])

  const [isLoading, setIsLoading] = useState(true)

  useDocumentTitle(portfolio?.name || "skillcase")
  if (isLoading) return <LoadingOverlay visible={true} loader={<CubeLoader size={128} />} />

  return (
    <>
      {portfolio ? (
        <Suspense fallback={<Loader />}>
          <MantineProvider inherit theme={{ colorScheme: "light" }}>
            <Portfolio portfolio={portfolio} />
          </MantineProvider>
        </Suspense>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>Портфолио не найдено</Text>
        </Center>
      )}
    </>
  )
}

PortfolioPage.suppressFirstRenderFlicker = true

export default PortfolioPage

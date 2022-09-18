import { Text, Loader, Center, LoadingOverlay, Box } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import { getPortfolioWithInflatedData } from "helpers"
import { useParam } from "@blitzjs/next"
import { IPortfolio } from "types"
import { useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import Portfolio from "app/p/Portfolio"
import { useDocumentTitle } from "@mantine/hooks"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import Clicks from "app/core/components/Clicks"
import BaseLayout from "app/core/layouts/BaseLayout"
import MadeWithTwoClicks from "app/core/components/MadeWithTwoClicks"

const PortfolioPage = () => {
  const { t } = useTranslation("pagesBuild")

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
  if (isLoading)
    return <LoadingOverlay visible={true} loader={<Loader color="violet" size={32} />} />

  return (
    <>
      {portfolio ? (
        <Suspense fallback={<Loader />}>
          {/* <MantineProvider inherit theme={{ colorScheme: "light" }}> */}
          <Portfolio portfolio={portfolio} />
          <MadeWithTwoClicks />
          {/* </MantineProvider> */}
        </Suspense>
      ) : (
        <BaseLayout>
          <Center style={{ height: "100%" }}>
            <Text>{t("portfolio not found")}</Text>
          </Center>
        </BaseLayout>
      )}
    </>
  )
}

PortfolioPage.suppressFirstRenderFlicker = true

export default PortfolioPage

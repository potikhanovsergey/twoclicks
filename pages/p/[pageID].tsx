import { Text, Loader, Center, LoadingOverlay } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import { getPageWithInflatedData } from "helpers"
import { useParam } from "@blitzjs/next"
import { IPage } from "types"
import { useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import Page from "app/p/Page"
import { useDocumentTitle } from "@mantine/hooks"
import useTranslation from "next-translate/useTranslation"
import BaseLayout from "app/core/layouts/BaseLayout"
import MadeWithTwoClicks from "app/core/components/MadeWithTwoClicks"

const PagePage = () => {
  const { t } = useTranslation("build")

  const pageID = useParam("pageID", "string")

  const [page, setPortfolio] = useState<IPage | null>(null)

  const [portfolioFromDB, { refetch: refetchPortfolioFromDB }] = useQuery(
    getPortfolioByID,
    { id: pageID, isPublic: true },
    { refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPage | null = null
      if (portfolioFromDB) {
        p = getPageWithInflatedData(portfolioFromDB)
      }
      setPortfolio(p)
    }
    void getPortfolio()
    setIsLoading(false)
  }, [portfolioFromDB])

  const [isLoading, setIsLoading] = useState(true)

  useDocumentTitle(page?.name || "skillcase")
  if (isLoading)
    return <LoadingOverlay visible={true} loader={<Loader color="violet" size={32} />} />

  return (
    <>
      {page ? (
        <Suspense fallback={<Loader />}>
          {/* <MantineProvider inherit theme={{ colorScheme: "light" }}> */}
          <Page page={page} />
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

PagePage.suppressFirstRenderFlicker = true

export default PagePage

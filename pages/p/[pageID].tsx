import { Text, Loader, Center, LoadingOverlay } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import { getPageWithInflatedData } from "helpers"
import { useParam } from "@blitzjs/next"
import { IPage } from "types"
import { useQuery } from "@blitzjs/rpc"
import getPageByID from "app/portfolios/queries/getPageByID"
import Page from "app/p/Page"
import { useDocumentTitle } from "@mantine/hooks"
import useTranslation from "next-translate/useTranslation"
import BaseLayout from "app/core/layouts/BaseLayout"
import MadeWithTwoClicks from "app/core/components/MadeWithTwoClicks"

const PagePage = () => {
  const { t } = useTranslation("build")

  const pageID = useParam("pageID", "string")

  const [page, setPage] = useState<IPage | null>(null)

  const [pageFromDB] = useQuery(
    getPageByID,
    { id: pageID, isPublic: true },
    { refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPage = async () => {
      let p: IPage | null = null
      if (pageFromDB) {
        p = getPageWithInflatedData(pageFromDB)
      }
      setPage(p)
    }
    void getPage()
    setIsLoading(false)
  }, [pageFromDB])

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
            <Text>{t("page not found")}</Text>
          </Center>
        </BaseLayout>
      )}
    </>
  )
}

PagePage.suppressFirstRenderFlicker = true

export default PagePage

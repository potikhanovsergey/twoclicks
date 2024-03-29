import {
  Text,
  Loader,
  Center,
  LoadingOverlay,
  useMantineTheme,
  MantineProvider,
  Global,
} from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import { getPageWithInflatedData } from "helpers/utils"
import { useParam } from "@blitzjs/next"
import { IPage } from "types"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getPageByID from "app/build-pages/queries/getPageByID"
import Page from "app/p-pages/Page"
import { useDocumentTitle, useLocalStorage, useSessionStorage } from "@mantine/hooks"
import useTranslation from "next-translate/useTranslation"
import BaseLayout from "app/core/layouts/BaseLayout"
import MadeWithTwoClicks from "app/core/components/MadeWithTwoClicks"
import viewPage from "app/build-pages/mutations/viewPage"

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
  const theme = useMantineTheme()

  const [hasViewedPage, setHasViewedPage] = useLocalStorage({
    key: `viewed-${pageID}` || "",
    defaultValue: false,
    getInitialValueInEffect: false,
  })
  const [viewPageMutation] = useMutation(viewPage)

  useEffect(() => {
    if (!hasViewedPage && pageID) {
      void viewPageMutation(pageID)
      setHasViewedPage(true)
    }
  }, [hasViewedPage, pageID])

  useDocumentTitle(page?.name || "Twoclicks")
  if (isLoading)
    return <LoadingOverlay visible={true} loader={<Loader color="primary" size={32} />} />

  return (
    <>
      {page ? (
        <Suspense fallback={<LoadingOverlay visible />}>
          <MantineProvider
            inherit
            theme={{ colorScheme: page.theme === "inherit" ? theme.colorScheme : page.theme }}
          >
            <Page page={page} />
            <MadeWithTwoClicks />
            <Global
              styles={(theme) => ({
                body: {
                  backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
                  color: theme.colorScheme === "dark" ? theme.white : theme.black,
                },
              })}
            />
          </MantineProvider>
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

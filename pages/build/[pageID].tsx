import { Text, Loader, Center, LoadingOverlay, useMantineTheme } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
import useTranslation from "next-translate/useTranslation"
import Builder from "app/build/Builder"
import { getPageWithInflatedData, inflateBase64 } from "helpers/utils"
import { BuildStore, defaultThemeSettings } from "store/build"
import { useParam } from "@blitzjs/next"
import { IPage, IThemeSettings } from "types"
import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getPageByID from "app/build-pages/queries/getPageByID"
import createOrUpdatePage from "app/build-pages/mutations/createOrUpdatePage"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { AppStore } from "store"
import { useDocumentTitle, useViewportSize } from "@mantine/hooks"
import getUserPages from "app/build-pages/queries/getUserPages"

const BuildPage = () => {
  const { t } = useTranslation("build")
  const session = useSession()
  const pageID = useParam("pageID", "string")

  const [page, setPage] = useState<IPage | null>(null)
  const [createOrUpdatePageMutation] = useMutation(createOrUpdatePage)

  const [pageFromDB, { refetch: refetchPageFromDB }] = useQuery(
    getPageByID,
    { id: pageID, isPublic: false },
    { refetchOnWindowFocus: false, refetchOnReconnect: false }
  )

  useEffect(() => {
    const getPage = async () => {
      let p: IPage | null = null
      if (!pageFromDB) {
        let pageFromLC = localStorage?.getItem(`page-${pageID}`) as string | undefined
        if (pageFromLC) {
          let inflatedPage = getPageWithInflatedData(inflateBase64(pageFromLC))
          if (session.userId) {
            const page = await createOrUpdatePageMutation(inflatedPage)
            if (page) {
              AppStore.pages = [...AppStore.pages, page]
              localStorage?.removeItem(`page-${pageID}`)
            }
          }
          p = inflatedPage
        }
      } else {
        p = getPageWithInflatedData(pageFromDB)
        if (!AppStore.pages.find((p) => p.id === pageFromDB.id)) {
          AppStore.pages.push(pageFromDB)
        }
      }
      setPage(p)
    }

    void getPage()
    setIsLoading(false)
  }, [pageFromDB])

  const {
    resetHistoryOfChanges,
    setData,
    data: { name },
  } = BuildStore
  const [isLoading, setIsLoading] = useState(true)

  useDocumentTitle(name || "Twoclicks")

  useEffect(() => {
    if (page?.data) {
      setData({
        blocks: page.data,
        name: page.name,
        id: page.id,
        customID: page.customID,
        theme: page.theme || "inherit",
        flattenBlocks: {},
        isPublished: page.isPublished,
        themeSettings: (page.themeSettings as unknown as IThemeSettings) || defaultThemeSettings,
        appliedForTemplates: page.appliedForTemplates,
      })
      resetHistoryOfChanges()
    }
    // return () => resetData()
  }, [page])

  useEffect(() => {
    if (session && !pageFromDB) {
      void refetchPageFromDB()
    }
  }, [session])

  const theme = useMantineTheme()
  const { width: viewportWidth } = useViewportSize()

  const { setPages, havePagesLoaded } = AppStore

  const [fetchedPages] = useQuery(
    getUserPages,
    {
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    },
    {
      enabled: !AppStore.havePagesLoaded,
    }
  )

  useEffect(() => {
    if (fetchedPages && session.userId && !havePagesLoaded) {
      setPages(fetchedPages)
    }
    if (!session.userId) setPages([])
  }, [fetchedPages, session, havePagesLoaded])

  if (isLoading) return <LoadingOverlay visible={true} loader={<Loader size={32} />} />

  return (
    <>
      {page ? (
        <Suspense fallback={<Loader />}>
          {viewportWidth > theme.breakpoints.md ? (
            <>
              <Builder />
              <CanvasSectionsModal />
            </>
          ) : (
            <Center style={{ height: "100%" }}>
              <Text style={{ maxWidth: "50%" }} align="center">
                Unfortunately, we don&apos;t support builder on devices with this size yet. Hovewer,
                you can easily open it on your laptop or desktop!
              </Text>
            </Center>
          )}
        </Suspense>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>{t("page not found")}</Text>
        </Center>
      )}
    </>
  )
}

BuildPage.getLayout = getBaseLayout({ headerWithTransparency: false })
BuildPage.suppressFirstRenderFlicker = true

export default BuildPage

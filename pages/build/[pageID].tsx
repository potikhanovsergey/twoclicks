import { Text, Loader, Center, LoadingOverlay, useMantineTheme } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
import useTranslation from "next-translate/useTranslation"
import Builder from "app/build/Builder"
import { getPortfolioWithInflatedData, inflateBase64 } from "helpers"
import { BuildStore } from "store/build"
import { useParam } from "@blitzjs/next"
import { IPage } from "types"
import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import createOrUpdatePortfolio from "app/portfolios/mutations/createOrUpdatePortfolio"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { AppStore } from "store"
import { useDocumentTitle, useViewportSize } from "@mantine/hooks"
import getUserPortfolios from "app/portfolios/queries/getUserPortfolios"

const BuildPage = () => {
  const { t } = useTranslation("build")
  const session = useSession()
  const pageID = useParam("pageID", "string")

  const [page, setPage] = useState<IPage | null>(null)
  const [createOrUpdatePortfolioMutation] = useMutation(createOrUpdatePortfolio)

  const [portfolioFromDB, { refetch: refetchPortfolioFromDB }] = useQuery(
    getPortfolioByID,
    { id: pageID, isPublic: false },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPage | null = null
      if (!portfolioFromDB) {
        let portfolioFromLC = localStorage?.getItem(`portfolio-${pageID}`) as string | undefined
        if (portfolioFromLC) {
          let inflatedPortfolio = getPortfolioWithInflatedData(inflateBase64(portfolioFromLC))
          if (session.userId) {
            const portfolio = await createOrUpdatePortfolioMutation(inflatedPortfolio)
            if (portfolio) {
              AppStore.pages = [...AppStore.pages, portfolio]
              localStorage?.removeItem(`portfolio-${pageID}`)
            }
          }
          p = inflatedPortfolio
        }
      } else {
        p = getPortfolioWithInflatedData(portfolioFromDB)
        if (!AppStore.pages.find((p) => p.id === portfolioFromDB.id)) {
          AppStore.pages.push(portfolioFromDB)
        }
      }
      setPage(p)
    }

    void getPortfolio()
    setIsLoading(false)
  }, [portfolioFromDB])

  const {
    resetHistoryOfChanges,
    setData,
    data: { name },
  } = BuildStore
  const [isLoading, setIsLoading] = useState(true)

  useDocumentTitle(name || "skillcase")

  useEffect(() => {
    if (page?.data) {
      setData({
        blocks: page.data,
        name: page.name,
        id: page.id,
        palette: page.palette,
        flattenBlocks: {},
        isPublished: page.isPublished,
      })
      resetHistoryOfChanges()
      BuildStore.unlockedElements = {}
    }
    // return () => resetData()
  }, [page])

  useEffect(() => {
    if (session && !portfolioFromDB) {
      void refetchPortfolioFromDB()
    }
  }, [session])

  const theme = useMantineTheme()
  const { width: viewportWidth } = useViewportSize()

  const { setPages, havePagesLoaded } = AppStore

  const [fetchedPortfolios] = useQuery(
    getUserPortfolios,
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
    if (fetchedPortfolios && session.userId && !havePagesLoaded) {
      setPages(fetchedPortfolios)
    }
    if (!session.userId) setPages([])
  }, [fetchedPortfolios, session, havePagesLoaded])

  if (isLoading)
    return <LoadingOverlay visible={true} loader={<Loader color="violet" size={32} />} />

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
          <Text>{t("portfolio not found")}</Text>
        </Center>
      )}
    </>
  )
}

BuildPage.getLayout = getBaseLayout({ headerWithTransparency: false })
BuildPage.suppressFirstRenderFlicker = true

export default BuildPage

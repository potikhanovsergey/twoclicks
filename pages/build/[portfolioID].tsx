import { createStyles, Text, Loader, Center } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useEffect, useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
import CanvasComponentsModal from "app/core/components/modals/build/CanvasComponents"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
// import { useTranslation } from 'next-i18next';
import Builder from "app/build/Builder"
import { deflate, inflateBase64 } from "helpers"
import { BuildStore } from "store/build"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import { Ctx } from "@blitzjs/next"
import { PortfolioStarterMock } from "db/mocks"
import { IPortfolio } from "types"
import { getSession, useSession } from "@blitzjs/auth"
import { deleteCookie, getCookie } from "cookies-next"
import db from "db"
import { useRouter } from "next/router"

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colors.gray[1],
    color: theme.black,
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "var(--layout-header-height)",
  },
}))

const BuildPage = ({ portfolio }: { portfolio: IPortfolio }) => {
  // const { t } = useTranslation('pagesBuild');
  const { classes } = useStyles()
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    if (portfolio?.data) {
      BuildStore.data.blocks = portfolio.data
      BuildStore.data.name = portfolio.name
      BuildStore.data.id = portfolio.id
    }
  }, [portfolio])

  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (!session.userId && !getCookie(`portfolio-${portfolio?.id}`)) {
      void router.push("/build/")
    }
  }, [session])
  return (
    <>
      <LayoutHeader menuOpened={menuOpened} setMenuOpened={setMenuOpened} fixed />
      <main className={classes.main}>
        {portfolio ? (
          <Suspense fallback={<Loader />}>
            <Builder />
            <CanvasComponentsModal />
            <CanvasSectionsModal />
          </Suspense>
        ) : (
          <Center>
            <Text>Портфолио не найдено</Text>
          </Center>
        )}
      </main>
    </>
  )
}

BuildPage.suppressFirstRenderFlicker = true

export async function getServerSideProps(
  ctx: Ctx & { params: { portfolioID: string }; locale: string; req: any; res: any }
) {
  const { params, locale, req, res } = ctx
  const session = await getSession(req, res)
  const isNew = params.portfolioID === "new"

  const getPortfolio = async () => {
    if (isNew) return await PortfolioStarterMock
    if (session.userId) {
      let portfolioFromCookie = getCookie(`portfolio-${params.portfolioID}`, ctx)
      if (typeof portfolioFromCookie !== "string") portfolioFromCookie = null

      if (portfolioFromCookie) {
        const inflatedPortfolio = inflateBase64(portfolioFromCookie) as IPortfolio
        console.log("PORTFOLIO FROM COOKIE")
        const portfolio = await db.portfolio.upsert({
          where: {
            id: inflatedPortfolio.id,
          },
          update: {},
          create: {
            userId: session.userId,
            id: inflatedPortfolio.id,
            name: inflatedPortfolio.name,
            data: deflate(inflatedPortfolio.data),
          },
        })
        deleteCookie(`portfolio-${params.portfolioID}`, ctx)
        return portfolio
      }
      console.log("PORTFOLIO FROM DB")
      return await getPortfolioByID({ id: params.portfolioID }, { ...ctx, session })
    } else {
      let portfolioFromCookie = getCookie(`portfolio-${params.portfolioID}`, ctx)
      if (typeof portfolioFromCookie !== "string") portfolioFromCookie = null
      return portfolioFromCookie ? inflateBase64(portfolioFromCookie) : null
    }
  }

  const portfolio = await getPortfolio()

  if (!isNew && portfolio && typeof portfolio.data === "string") {
    portfolio.data = inflateBase64(portfolio.data.toString())
  }

  if (portfolio?.createdAt) {
    portfolio.createdAt = portfolio.createdAt.toString()
  }
  if (portfolio?.updatedAt) {
    portfolio.updatedAt = portfolio.updatedAt.toString()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
      portfolio,
    },
  }
}

export default BuildPage

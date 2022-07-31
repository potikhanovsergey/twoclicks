import {
  Stack,
  createStyles,
  Text,
  Button,
  MantineProvider,
  Loader,
  Center,
  Title,
} from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useContext, useEffect, useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
import CanvasComponentsModal from "app/core/components/modals/build/CanvasComponents"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
// import { useTranslation } from 'next-i18next';
import Builder from "app/build/Builder"
import { useRouter } from "next/router"
import { GetStaticPaths } from "next"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { BuildingBlock } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createPortfolio from "app/portfolios/mutations/createPortfolio"
import getLatestPortfolio from "app/portfolios/queries/getLatestPortfolio"
import { inflateBase64 } from "helpers"
import { BuildStore } from "store/build"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import { Ctx } from "@blitzjs/next"
import { PortfolioStarterMock } from "db/mocks"
import { IPortfolio } from "types"

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
    paddingTop: "var(--build-header-height)",
  },
}))

const BuildPage = ({ portfolio }: { portfolio: IPortfolio }) => {
  // const { t } = useTranslation('pagesBuild');
  const { classes } = useStyles()
  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <>
      <LayoutHeader menuOpened={menuOpened} setMenuOpened={setMenuOpened} fixed />
      <main className={classes.main}>
        <Title>Список портфолио</Title>
      </main>
    </>
  )
}

BuildPage.suppressFirstRenderFlicker = true

export async function getStaticProps(ctx: Ctx & { locale: string }) {
  const { locale } = ctx
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
    },
  }
}

export default BuildPage

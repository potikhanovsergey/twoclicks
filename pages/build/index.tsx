import { createStyles, Title } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
// import { useTranslation } from 'next-i18next';
import { Ctx } from "@blitzjs/next"
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

const Build = ({ portfolio }: { portfolio: IPortfolio }) => {
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

Build.suppressFirstRenderFlicker = true

export async function getStaticProps(ctx: Ctx & { locale: string }) {
  const { locale } = ctx
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
    },
  }
}

export default Build

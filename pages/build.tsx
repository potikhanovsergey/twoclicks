import { Stack, createStyles, Text, Button, MantineProvider, Loader } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useContext, useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
import CanvasComponentsModal from "app/core/components/modals/build/CanvasComponents"
import CanvasSectionsModal from "app/core/components/modals/build/CanvasSections"
// import { useTranslation } from 'next-i18next';
import Builder from "app/build/Builder"
import { IModalContextValue, ModalContext } from "../contexts/ModalContext"

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

const BuildPage = () => {
  // const { t } = useTranslation('pagesBuild');
  const { classes } = useStyles()
  const [menuOpened, setMenuOpened] = useState(false)
  return (
    <>
      <LayoutHeader menuOpened={menuOpened} setMenuOpened={setMenuOpened} fixed />
      <main className={classes.main}>
        <Suspense fallback={<Loader />}>
          <Builder />
        </Suspense>
      </main>
      <CanvasComponentsModal />
      <CanvasSectionsModal />
    </>
  )
}

BuildPage.suppressFirstRenderFlicker = true

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
      // Will be passed to the page component as props
    },
  }
}

export default BuildPage

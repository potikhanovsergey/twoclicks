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

  canvas: {
    // assign ref to element
    ref: getRef("canvas"),
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}))

const BuildPage = () => {
  // const { t } = useTranslation('pagesBuild');
  const { classes } = useStyles()
  const [isCanvasEmpty] = useState(false)
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const [menuOpened, setMenuOpened] = useState(false)
  return (
    <>
      <LayoutHeader menuOpened={menuOpened} setMenuOpened={setMenuOpened} fixed />
      <main className={classes.main}>
        {isCanvasEmpty ? (
          <Stack>
            <Text size="xl">The portfolio is empty now :(</Text>
            <Button
              color="blue"
              onClick={() =>
                setModalContext((prevValue: IModalContextValue) => ({
                  ...prevValue,
                  canvasSectionsModal: true,
                }))
              }
            >
              Add section
            </Button>
            {/* <Button
                color="red"
                onClick={() =>
                  setModalContext((prevValue: IModalContextValue) => ({
                    ...prevValue,
                    canvasComponentsModal: true,
                  }))
                }
              >
                Add components
              </Button> */}
          </Stack>
        ) : (
          <Suspense fallback={<Loader />}>
            <Builder />
          </Suspense>
        )}
      </main>
      <CanvasComponentsModal />
      <CanvasSectionsModal />
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
      // Will be passed to the page component as props
    },
  }
}

export default BuildPage

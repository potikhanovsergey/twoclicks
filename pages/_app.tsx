import {
  ErrorFallbackProps,
  ErrorComponent,
  ErrorBoundary,
  AppProps,
  useRouterQuery,
} from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense, useEffect, useState } from "react"
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  MantineThemeOverride,
  LoadingOverlay,
  Global,
  createEmotionCache,
  createStyles,
  Loader,
  useMantineTheme,
} from "@mantine/core"
import { ModalContext } from "contexts/ModalContext"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { withBlitz } from "app/blitz-client"
import "app/styles/variables.css"
import router from "next/router"
import CubeLoader from "app/core/components/CubeLoader"
import { GetServerSidePropsContext } from "next"
import { getCookie, setCookie } from "cookies-next"

import { Tuple, DefaultMantineColor } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import { ModalsProvider } from "@mantine/modals"

export type ExtendedCustomColors = "primary" | "accent" | DefaultMantineColor
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}

const DEVELOPMENT_URL = "http://localhost:3000"
const PRODUCTION_URL = "http://localhost:3000"

export const baseURL = process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL

const emotionCache = createEmotionCache({ key: "mantine" })

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
  },
  paper: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}))

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function App(props: AppProps & { cookiesColorScheme: ColorScheme }) {
  const { Component, pageProps } = props

  // ### THEME AND COLOR SCHEME ###
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "skillcase-color-scheme",
    defaultValue: props.cookiesColorScheme,
  })
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
    // when color scheme is updated save it to cookie and local storage
    setCookie("skillcase-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }

  useHotkeys([["mod+J", () => toggleColorScheme()]])
  const { classes } = useStyles()

  const theme = useMantineTheme()

  const CustomTheme: MantineThemeOverride = {
    colorScheme,
    fontFamily: "'Nunito', sans-serif;",
    headings: {
      fontFamily: "'Nunito', sans-serif",
    },
    colors: {
      primary: [
        "#f1fcff",
        "#e4f8ff",
        "#d6f5fe",
        "#bbeefe",
        "#9fe7fe",
        "#84e0fd",
        "#76ddfd",
        "#6ac7e4",
        "#478598",
        "#2f5865",
      ],
      accent: [
        "#fff3fa",
        "#ffe7f5",
        "#ffdaf0",
        "#ffc2e7",
        "#feaadd",
        "#fe91d3",
        "#fe85ce",
        "#cb6aa5",
        "#98507c",
        "#663552",
      ],
    },
    primaryColor: "violet",
    primaryShade: 5,
    components: {
      Paper: {
        styles: {
          root: {
            color: colorScheme === "dark" ? theme.white : theme.black,
          },
        },
      },
      Tooltip: {
        defaultProps: {
          color: "violet",
        },
        styles: {
          tooltip: {
            boxShadow: `0 6px 12px -6px ${theme.fn.rgba(
              theme.black,
              0.5
            )}, 5px -12px 34px -13px ${theme.fn.rgba(
              theme.black,
              0.4
            )}, 0 26px 52px 3px ${theme.fn.rgba(theme.black, 0.4)}`,
          },
        },
      },
      Container: {
        defaultProps: {
          sizes: {
            xs: 540,
            sm: 720,
            md: 960,
            lg: 1280,
            xl: 1400,
          },
          className: classes.container,
        },
      },
    },
    cursorType: "pointer",
  }

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme")
  }, [])
  // ### END THEME AND COLOR SCHEME END ###

  // ### LOADING OVERLAY STARTS ###
  const [loadingOverlay, setLoadingOverlay] = useState(false)
  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout>
    const handleStart = () => {
      startTimer = setTimeout(() => {
        setLoadingOverlay(true)
      }, 500)
    }
    const handleComplete = () => {
      setLoadingOverlay(false)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
      clearTimeout(startTimer)
    }
  })
  // ### LOADING OVERLAY ENDS ###

  // ### MODALS START ###

  const [modalValue, setModalValue] = useState({
    canvasComponentsModal: false,
    canvasSectionsModal: false,
  })

  // ### MODALS END ###

  // ### NEXT LAYOUT SYSTEM ###
  const getLayout = Component.getLayout || ((page) => page)

  const query = useRouterQuery()
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider
        withCSSVariables
        withNormalizeCSS
        theme={CustomTheme}
        emotionCache={emotionCache}
      >
        <ModalsProvider modalProps={{ zIndex: 1000 }}>
          <NotificationsProvider>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <ModalContext.Provider value={[modalValue, setModalValue]}>
                <LoadingOverlay
                  sx={() => ({
                    position: "fixed",
                  })}
                  overlayOpacity={0.85}
                  visible={loadingOverlay}
                  loader={<CubeLoader size={194} />}
                />
                <Suspense
                  fallback={
                    <LoadingOverlay
                      visible={true}
                      overlayOpacity={0.85}
                      loader={<CubeLoader size={194} />}
                    />
                  }
                >
                  {getLayout(<Component {...pageProps} />)}
                </Suspense>
              </ModalContext.Provider>
            </ColorSchemeProvider>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
      <Global
        styles={(theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
          html: {
            "&[data-theme='light']": {
              backgroundColor: theme.colors.gray[0],
              color: theme.black,
            },
            "&[data-theme='dark']": {
              backgroundColor: theme.colors.dark[7],
              color: theme.white,
            },
          },
          "::-moz-selection": {
            background: theme.colors.violet[4],
            color: theme.white,
            WebkitTextFillColor: theme.white,
          },
          "::-webkit-selection": {
            background: theme.colors.violet[4],
            color: theme.white,
            WebkitTextFillColor: theme.white,
          },
          "::selection": {
            background: theme.colors.violet[4],
            color: theme.white,
            WebkitTextFillColor: theme.white,
          },
          body: {
            backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
            color: colorScheme === "dark" ? theme.white : theme.black,
            lineHeight: theme.lineHeight,
            minHeight: "100vh",
            overflowX: "hidden",
            wordBreak: "break-word",
          },
          "body, html":
            query.hideScrollbar === "true"
              ? {
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": {
                    width: 0,
                    height: 0,
                  },
                }
              : undefined,
        })}
      />
    </ErrorBoundary>
  )
}

const appWithBlitz = withBlitz(App)

appWithBlitz["getInitialProps"] = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  cookiesColorScheme: getCookie("skillcase-color-scheme", ctx) || "dark",
})

export default appWithBlitz

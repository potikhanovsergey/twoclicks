import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { useEffect, useState } from "react"
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  MantineThemeOverride,
  LoadingOverlay,
  Global,
  createEmotionCache,
} from "@mantine/core"
import { ModalContext } from "contexts/ModalContext"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { withBlitz } from "app/blitz-client"
import { appWithTranslation, i18n } from "next-i18next"
import "app/styles/variables.css"
import router from "next/router"
import CubeLoader from "app/core/components/CubeLoader"
import { GetServerSidePropsContext } from "next"
import { getCookie, setCookie } from "cookies-next"

import { Tuple, DefaultMantineColor } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"

type ExtendedCustomColors = "primary" | "accent" | DefaultMantineColor
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}

const emotionCache = createEmotionCache({ key: "cube-project-emiton" })

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
    primaryColor: "primary",
    primaryShade: 6,
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
      console.log("route change start")
      startTimer = setTimeout(() => {
        setLoadingOverlay(true)
      }, 500)
    }
    const handleComplete = () => {
      console.log("route change complete")
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

  // pushes user to previously chosen locale if it doesn't match
  const [storageLocale] = useLocalStorage({ key: "locale", defaultValue: i18n?.language || "ru" })
  useEffect(() => {
    if (storageLocale !== router.locale) {
      void router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
        locale: storageLocale,
      })
    }
  }, [])

  // ### NEXT LAYOUT SYSTEM ###
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider
        withCSSVariables
        withNormalizeCSS
        theme={CustomTheme}
        emotionCache={emotionCache}
      >
        <NotificationsProvider>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <ModalContext.Provider value={[modalValue, setModalValue]}>
              <LoadingOverlay
                sx={() => ({
                  position: "fixed",
                })}
                overlayOpacity={0.85}
                visible={loadingOverlay}
                loader={<CubeLoader />}
              />
              {getLayout(<Component {...pageProps} />)}
            </ModalContext.Provider>
          </ColorSchemeProvider>
        </NotificationsProvider>
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
          body: {
            backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
            color: colorScheme === "dark" ? theme.white : theme.black,
            lineHeight: theme.lineHeight,
          },
        })}
      />
    </ErrorBoundary>
  )
}

const appWithI18n = appWithTranslation(App)
const appWithBlitz = withBlitz(appWithI18n)

appWithBlitz["getInitialProps"] = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  cookiesColorScheme: getCookie("skillcase-color-scheme", ctx) || "dark",
})

export default appWithBlitz

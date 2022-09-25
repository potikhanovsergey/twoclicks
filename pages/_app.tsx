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
  Global,
  createStyles,
  useMantineTheme,
} from "@mantine/core"
import { ModalContext } from "contexts/ModalContext"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { withBlitz } from "app/blitz-client"
import "app/styles/variables.css"
import { GetServerSidePropsContext } from "next"
import { getCookie, setCookie } from "cookies-next"

import { Tuple, DefaultMantineColor } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"

import cursor from "public/oneclick.svg"
import { LazyMotion, domAnimation } from "framer-motion"
import dynamic from "next/dynamic"

const MenuModal = dynamic(() => import("app/core/components/modals/base/MenuModal"))

export type ExtendedCustomColors = "primary" | "accent" | DefaultMantineColor
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_PRODUCTION_URL

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
    key: "twoclicks-color-scheme",
    defaultValue: props.cookiesColorScheme,
  })
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
    // when color scheme is updated save it to cookie and local storage
    setCookie("twoclicks-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
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
      },
      Card: {
        styles: {
          root: {
            overflow: "visible",
          },
        },
      },
      Badge: {
        styles: {
          root: {
            cursor: `url(${cursor.src}), default`,
            overflow: "visible",
          },
          inner: {
            overflow: "visible",
          },
        },
      },
      Image: {
        styles: {
          imageWrapper: {
            ":has(.mantine-Image-placeholder)": {
              minHeight: "150px",
            },
          },
        },
      },
      Container: {
        styles: {
          root: {
            "@media (max-width: 768px)": {
              paddingLeft: "16px",
              paddingRight: "16px",
            },
          },
        },
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

  // ### MODALS START ###

  const [modalValue, setModalValue] = useState({
    canvasComponentsModal: false,
    canvasSectionsModal: false,
    menuModal: false,
  })

  // ### MODALS END ###

  // ### NEXT LAYOUT SYSTEM ###
  const getLayout = Component.getLayout || ((page) => page)

  const query = useRouterQuery()

  useEffect(() => {
    if (query.next) {
      localStorage?.setItem("router-next", query.next?.toString())
    }
  }, [query])

  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <LazyMotion features={domAnimation} strict>
        <MantineProvider withCSSVariables withNormalizeCSS theme={CustomTheme}>
          <ModalsProvider modalProps={{ zIndex: 1000 }}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <ModalContext.Provider value={[modalValue, setModalValue]}>
                <Suspense>
                  {getLayout(<Component {...pageProps} />)}
                  {modalValue.menuModal && <MenuModal />}
                </Suspense>
              </ModalContext.Provider>
            </ColorSchemeProvider>
          </ModalsProvider>
        </MantineProvider>
        <Global
          styles={(theme) => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
            },
            html: {
              cursor: `url(${cursor.src}), default`,
            },
            "::selection": {
              background: theme.colors.violet[4],
              color: theme.white,
              WebkitTextFillColor: theme.white,
            },
            body: {
              backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
              color: colorScheme === "dark" ? theme.white : theme.black,
              lineHeight: theme.lineHeight,
              minHeight: "100vh",
              wordBreak: "break-word",
              overflowY: "auto",
              overflowX: "hidden",
            },
            ".ql-font-Times": {
              fontFamily: "Times New Roman, sans",
            },
            ".ql-font-Nunito": {
              fontFamily: "'Nunito', sans-serif",
            },
            ".ql-font-Helvetica": {
              fontFamily: "Helvetica, sans-serif",
            },
            ".ql-font-Arial": {
              fontFamily: "Arial, sans-serif",
            },
          })}
        />
      </LazyMotion>
    </ErrorBoundary>
  )
}

const appWithBlitz = withBlitz(App)

appWithBlitz["getInitialProps"] = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  cookiesColorScheme: getCookie("twoclicks-color-scheme", ctx) || "dark",
})

export default appWithBlitz

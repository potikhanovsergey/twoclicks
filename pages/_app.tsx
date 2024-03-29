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
  MANTINE_COLORS,
  DEFAULT_THEME,
  LoadingOverlay,
} from "@mantine/core"
import { ModalContext } from "contexts/ModalContext"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { withBlitz } from "app/blitz-client"
import "app/styles/variables.css"
import { GetServerSidePropsContext } from "next"
import { getCookie, setCookie } from "cookies-next"

import { Tuple, DefaultMantineColor } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"

import dynamic from "next/dynamic"
import { usePersistLocaleCookie } from "hooks/usePersistedLocale"
import RouterTransition from "app/core/components/base/RouterTransitions"

const MenuModal = dynamic(() => import("app/core/components/modals/base/MenuModal"))

export type ExtendedCustomColors = "primary" | "accent" | DefaultMantineColor
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}

export const font = `'Nunito', -system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif`

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_PRODUCTION_URL

const CustomTheme: MantineThemeOverride = {
  fontFamily: font,
  headings: {
    fontFamily: font,
  },
  colors: {
    primary: DEFAULT_THEME.colors.indigo,
  },
  other: {
    lightShadow: "0 8px 20px 0 rgb(218 224 235 / 60%)",
  },
  primaryColor: "primary",
  primaryShade: 5,
  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    html: {
      scrollBehavior: "smooth",
    },
    "::selection": {
      background: theme.colors.primary[5],
      color: theme.white,
      WebkitTextFillColor: theme.white,
    },
    body: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      lineHeight: theme.lineHeight,
      minHeight: "100vh",
      wordBreak: "break-word",
      overflowY: "auto",
      overflowX: "hidden",
      letterSpacing: "-.01em",
      WebkitFontSmoothing: "antialiased",
    },
  }),
  components: {
    InputWrapper: {
      styles: {
        label: {
          marginBottom: 4,
        },
      },
    },
    ActionIcon: {
      defaultProps: {
        color: "primary",
        radius: "sm",
      },
    },
    Menu: {
      styles: (theme) => ({
        dropdown: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        },
      }),
    },
    Popover: {
      styles: (theme) => ({
        dropdown: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        },
      }),
    },
    Button: {
      defaultProps: {
        radius: "sm",
      },
    },
    ColorSwatch: {
      defaultProps: {
        radius: "50%",
      },
      styles: {
        children: {
          borderRadius: "50%",
        },
      },
    },
    ColorPicker: {
      styles: (theme) => ({
        swatch: {
          borderRadius: theme.radius.xl,
        },
      }),
    },
    Paper: {
      styles: (theme) => ({
        root: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      }),
    },
    Tooltip: {
      defaultProps: {
        color: "dark",
      },
    },
    Card: {
      styles: {
        root: {
          overflow: "visible",
        },
      },
    },
    Select: {
      defaultProps: {
        p: 0,
      },
      styles: {
        dropdown: {
          boxShadow: "none",
        },
        itemsWrapper: {
          padding: 0,
        },
      },
    },
    Badge: {
      styles: {
        root: {
          overflow: "visible",
        },
        inner: {
          overflow: "visible",
        },
      },
    },
    Image: {
      styles: {
        root: {
          "&[href]": {
            display: "block",
          },
        },
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
          width: "100%",
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
      },
    },
  },
  cursorType: "pointer",
}

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

function App(props: AppProps & { cookiesColorScheme: ColorScheme; locale: "ru" | "en" }) {
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

  usePersistLocaleCookie()

  return (
    <Suspense fallback={<LoadingOverlay visible />}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <MantineProvider withCSSVariables withNormalizeCSS theme={{ ...CustomTheme, colorScheme }}>
          <RouterTransition />
          <ModalsProvider modalProps={{ zIndex: 1000 }}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <ModalContext.Provider value={[modalValue, setModalValue]}>
                {getLayout(<Component {...pageProps} />)}
                {modalValue.menuModal && <MenuModal />}
              </ModalContext.Provider>
            </ColorSchemeProvider>
          </ModalsProvider>
        </MantineProvider>
      </ErrorBoundary>
    </Suspense>
  )
}

const appWithBlitz = withBlitz(App)

appWithBlitz["getInitialProps"] = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  cookiesColorScheme: getCookie("twoclicks-color-scheme", ctx) || "light",
})

export default appWithBlitz

import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  MantineThemeOverride,
  LoadingOverlay,
  Global,
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { withBlitz } from "app/blitz-client"
import { appWithTranslation, i18n } from "next-i18next"
import "app/styles/variables.css"

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

function App({ Component, pageProps }: AppProps) {
  // ### THEME AND COLOR SCHEME ###
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

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

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
  }

  useHotkeys([["mod+J", () => toggleColorScheme()]])
  // ### END THEME AND COLOR SCHEME END ###
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider withCSSVariables withNormalizeCSS theme={CustomTheme}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <Component {...pageProps} />
        </ColorSchemeProvider>
      </MantineProvider>
      <Global
        styles={(theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
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

export default appWithBlitz

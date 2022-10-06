import { Global, MantineProvider, useMantineTheme } from "@mantine/core"
import RenderJSXFromBlock from "app/core/components/RenderJSXFromBlock"
import { useDocumentTitle, useLocalStorage } from "@mantine/hooks"
import { ICanvasBlock, IPage, IThemeSettings } from "types"
import SafeWrapper from "app/core/components/SafeWrapper"
import React from "react"
import { ICanvasPalette } from "types"

const PreviewPage = () => {
  // const { t } = useTranslation('build');

  const [page] = useLocalStorage<{
    blocks: ICanvasBlock[]
    name: string | null
    theme: IPage["theme"]
    themeSettings: IThemeSettings
  }>({
    key: "preview-page",
  })
  useDocumentTitle(page?.name || "twoclicks")

  const theme = useMantineTheme()

  return (
    <MantineProvider
      inherit
      theme={{ colorScheme: page.theme === "inherit" ? theme.colorScheme : page.theme }}
    >
      <Global
        styles={(theme) => ({
          "::selection": {
            background:
              theme?.colors?.[page?.themeSettings?.palette?.primary]?.[4] || theme.colors.violet[4],
            color: theme.white,
            WebkitTextFillColor: theme.white,
          },
          body: {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          },
        })}
      />
      {page &&
        page.blocks.map((b, i) => (
          <div className="builder-block" key={b.id}>
            <SafeWrapper>
              <RenderJSXFromBlock
                element={b}
                shouldFlat={false}
                withContentEditable={false}
                withEditToolbar={false}
                withThemeSettings
                themeSettings={page.themeSettings}
                sectionIndex={i}
              />
            </SafeWrapper>
          </div>
        ))}
    </MantineProvider>
  )
}

PreviewPage.suppressFirstRenderFlicker = true

export default PreviewPage

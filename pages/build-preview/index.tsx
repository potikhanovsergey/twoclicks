import { Global, MantineProvider, useMantineTheme } from "@mantine/core"
import RenderJSXFromBlock from "app/core/components/RenderJSXFromBlock"
import { useDocumentTitle, useLocalStorage } from "@mantine/hooks"
import { ICanvasBlock, IPage, IThemeSettings } from "types"
import React from "react"

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
              theme?.colors?.[page?.themeSettings?.palette?.primary]?.[5] ||
              theme.colors.primary[5],
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
            <RenderJSXFromBlock
              element={b}
              withMobx
              shouldFlat={false}
              withContentEditable={false}
              withEditToolbar={false}
              withThemeSettings
              themeSettings={page.themeSettings}
              sectionIndex={i}
            />
          </div>
        ))}
    </MantineProvider>
  )
}

PreviewPage.suppressFirstRenderFlicker = true

export default PreviewPage

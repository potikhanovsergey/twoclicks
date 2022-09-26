import { Global, MantineProvider, useMantineTheme } from "@mantine/core"
import { RenderJSXFromBlock } from "helpers"
import { useDocumentTitle, useLocalStorage } from "@mantine/hooks"
import { ICanvasBlock, ICanvasData, IPage } from "types"
import SafeWrapper from "app/core/components/SafeWrapper"
import React, { useEffect } from "react"
import shortid from "shortid"
import { ICanvasPalette } from "types"

const PreviewPage = () => {
  // const { t } = useTranslation('build');

  const [page] = useLocalStorage<{
    blocks: ICanvasBlock[]
    palette: ICanvasPalette
    name: string | null
    theme: IPage["theme"]
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
            background: theme?.colors?.[page?.palette?.primary]?.[4] || theme.colors.violet[4],
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
        page.blocks.map((b, i) => {
          const JSX = RenderJSXFromBlock({
            element: b,
            shouldFlat: false,
            withContentEditable: false,
            withEditToolbar: false,
            withPalette: true,
            palette: page.palette,
            sectionIndex: i,
          })
          if (JSX) {
            return (
              <div className="builder-block" key={shortid.generate()}>
                <SafeWrapper resetKeys={[JSX]}>{JSX}</SafeWrapper>
              </div>
            )
          }
          return <React.Fragment key={i} />
        })}
    </MantineProvider>
  )
}

PreviewPage.suppressFirstRenderFlicker = true

export default PreviewPage

import { Global } from "@mantine/core"
import { RenderJSXFromBlock } from "helpers"
import { useDocumentTitle, useLocalStorage } from "@mantine/hooks"
import { ICanvasBlock } from "types"
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
  }>({
    key: "preview-page",
  })
  useDocumentTitle(page?.name || "twoclicks")

  return (
    <>
      <Global
        styles={(theme) => ({
          "::selection": {
            background: theme?.colors?.[page?.palette?.primary]?.[4] || theme.colors.violet[4],
            color: theme.white,
            WebkitTextFillColor: theme.white,
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
    </>
  )
}

PreviewPage.suppressFirstRenderFlicker = true

export default PreviewPage

import { Global } from "@mantine/core"
import { RenderJSXFromBlock } from "helpers"
import { useDocumentTitle, useLocalStorage } from "@mantine/hooks"
import { ICanvasBlock } from "types"
import SafeWrapper from "app/core/components/SafeWrapper"
import React, { useEffect } from "react"
import shortid from "shortid"
import { ICanvasPalette } from "types"

const PreviewPortfolio = () => {
  // const { t } = useTranslation('build');

  const [portfolio, setPreviewPortfolio] = useLocalStorage<{
    blocks: ICanvasBlock[]
    palette: ICanvasPalette
    name: string | null
  }>({
    key: "preview-portfolio",
  })
  useDocumentTitle(portfolio?.name || "skillcase")

  return (
    <>
      <Global
        styles={(theme) => ({
          "::selection": {
            background: theme?.colors?.[portfolio?.palette?.primary]?.[4] || theme.colors.violet[4],
            color: theme.white,
            WebkitTextFillColor: theme.white,
          },
        })}
      />
      {portfolio &&
        portfolio.blocks.map((b, i) => {
          const JSX = RenderJSXFromBlock({
            element: b,
            shouldFlat: false,
            withContentEditable: false,
            withEditToolbar: false,
            withPalette: true,
            palette: portfolio.palette,
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

PreviewPortfolio.suppressFirstRenderFlicker = true

export default PreviewPortfolio

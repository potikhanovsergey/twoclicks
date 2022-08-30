import { Text, Loader, Center, LoadingOverlay, MantineProvider } from "@mantine/core"
import { Suspense, useEffect, useMemo, useState } from "react"
import { getPortfolioWithInflatedData, inflateBase64, renderJSXFromBlock } from "helpers"
import { Ctx, useParam } from "@blitzjs/next"
import { ICanvasData, IPortfolio } from "types"
import { useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import Portfolio from "app/p/Portfolio"
import CubeLoader from "app/core/components/CubeLoader"
import BuilderBlocks from "app/build/BuilderBlocks"
import { useLocalStorage } from "@mantine/hooks"
import { ICanvasBlock } from "types"
import SafeWrapper from "app/core/components/SafeWrapper"
import React from "react"
import shortid from "shortid"
import { ICanvasPalette } from "types"

const PreviewPortfolio = () => {
  // const { t } = useTranslation('pagesBuild');

  const [portfolio, setPreviewPortfolio] = useLocalStorage<{
    blocks: ICanvasBlock[]
    palette: ICanvasPalette
  }>({
    key: "preview-portfolio",
  })
  return (
    <>
      {portfolio &&
        portfolio.blocks.map((b, i) => {
          const JSX = renderJSXFromBlock({
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

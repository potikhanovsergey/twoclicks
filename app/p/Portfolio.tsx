import { Box, Button, Center, Loader, LoadingOverlay, useMantineTheme } from "@mantine/core"
import React, { useMemo } from "react"
import { renderJSXFromBlock } from "helpers"
import { useSession } from "@blitzjs/auth"
import { ICanvasBlock } from "types"
import { b, i } from "@blitzjs/auth/dist/index-57d74361"
import SafeWrapper from "app/core/components/SafeWrapper"
import { IPortfolio } from "types"
import { IModalContextValue } from "contexts/ModalContext"
import { FiPlusSquare } from "react-icons/fi"
import CubeLoader from "app/core/components/CubeLoader"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"

const Portfolio = ({ portfolio }: { portfolio: IPortfolio | null }) => {
  // const { t } = useTranslation('pagesBuild');
  if (portfolio) {
    return (
      <>
        {portfolio.data &&
          portfolio.data.length > 0 &&
          portfolio.data.map((b, i) => {
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
                <SafeWrapper resetKeys={[JSX]} key={b.id}>
                  <Box
                    sx={{
                      "[data-button=true], [data-button=true] span": {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                        whiteSpace: "normal",
                        maxWidth: "100%",
                      },
                    }}
                  >
                    {JSX}
                  </Box>
                </SafeWrapper>
              )
            }
            return <React.Fragment key={i} />
          })}
      </>
    )
  }
  return <LoadingOverlay visible={true} loader={<CubeLoader size={128} />} />
}

export default observer(Portfolio)

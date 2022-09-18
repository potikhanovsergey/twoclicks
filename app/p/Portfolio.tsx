import { Box, Global, Loader, LoadingOverlay } from "@mantine/core"
import React from "react"
import { RenderJSXFromBlock } from "helpers"
import SafeWrapper from "app/core/components/SafeWrapper"
import { IPortfolio } from "types"
import { observer } from "mobx-react-lite"

const Portfolio = ({ portfolio }: { portfolio: IPortfolio | null }) => {
  // const { t } = useTranslation('pagesBuild');
  if (portfolio) {
    return (
      <>
        {portfolio.data &&
          portfolio.data.length > 0 &&
          portfolio.data.map((b, i) => {
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
                <SafeWrapper resetKeys={[JSX]} key={b.id}>
                  <Box
                    sx={{
                      "[data-button=true], [data-button=true] span": {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-flex",
                        whiteSpace: "normal",
                        maxWidth: "100%",
                      },
                    }}
                  >
                    {JSX}
                  </Box>
                  <Global
                    styles={(theme) => ({
                      "::selection": {
                        background:
                          theme?.colors?.[portfolio?.palette?.primary]?.[4] ||
                          theme.colors.violet[4],
                        color: theme.white,
                        WebkitTextFillColor: theme.white,
                      },
                    })}
                  />
                </SafeWrapper>
              )
            }
            return <React.Fragment key={i} />
          })}
      </>
    )
  }
  return <LoadingOverlay visible={true} loader={<Loader color="violet" size={64} />} />
}

export default observer(Portfolio)

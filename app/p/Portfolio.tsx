import { Box, Global, LoadingOverlay } from "@mantine/core"
import React from "react"
import { renderJSXFromBlock } from "helpers"
import SafeWrapper from "app/core/components/SafeWrapper"
import { IPortfolio } from "types"
import MainLoader from "app/core/components/MainLoader"
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
  return <LoadingOverlay visible={true} loader={<MainLoader size={128} />} />
}

export default observer(Portfolio)

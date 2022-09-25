import { Box, Global, Loader, LoadingOverlay } from "@mantine/core"
import React from "react"
import { RenderJSXFromBlock } from "helpers"
import SafeWrapper from "app/core/components/SafeWrapper"
import { IPage } from "types"
import { observer } from "mobx-react-lite"

const Page = ({ page }: { page: IPage | null }) => {
  // const { t } = useTranslation('build');
  if (page) {
    return (
      <>
        {page.data &&
          page.data.length > 0 &&
          page.data.map((b, i) => {
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
                          theme?.colors?.[page?.palette?.primary]?.[4] || theme.colors.violet[4],
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
  return <LoadingOverlay visible={true} loader={<Loader color="violet" size={32} />} />
}

export default observer(Page)

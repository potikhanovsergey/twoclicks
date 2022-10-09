import { AppShell, Box, Global, Loader, LoadingOverlay } from "@mantine/core"
import React, { useEffect, useMemo } from "react"
import RenderJSXFromBlock from "app/core/components/RenderJSXFromBlock"
import SafeWrapper from "app/core/components/SafeWrapper"
import { ICanvasBlock, IPage, IThemeSettings } from "types"
import { observer } from "mobx-react-lite"

const Block = ({
  block,
  i,
  themeSettings,
  removeSemantics = true,
}: {
  block: ICanvasBlock
  i?: number
  themeSettings: IThemeSettings
  removeSemantics?: boolean
}) => {
  return (
    <SafeWrapper key={block.id}>
      <RenderJSXFromBlock
        element={block}
        shouldFlat={false}
        withContentEditable={false}
        withEditToolbar={false}
        withThemeSettings
        themeSettings={themeSettings}
        sectionIndex={i}
      />
    </SafeWrapper>
  )
}

const Page = ({ page }: { page: IPage | null }) => {
  // const { t } = useTranslation('build');

  const header = useMemo(() => {
    return page?.data.find((p) => p.type.includes("header"))
  }, [page])

  const blocks = useMemo(() => {
    return page?.data.filter((p) => p.id !== header?.id)
  }, [header?.id, page?.data])

  if (page) {
    return (
      <AppShell
        sx={{
          "[data-button=true], [data-button=true] span": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            whiteSpace: "normal",
            maxWidth: "100%",
          },
        }}
        styles={{
          main: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: header?.props.fixed ? "calc(var(--mantine-header-height, 0px))" : 0,
            paddingBottom: "calc(var(--mantine-footer-height, 0px))",
          },
        }}
        header={
          header ? (
            <Block block={header} themeSettings={page.themeSettings} removeSemantics={false} />
          ) : undefined
        }
      >
        {blocks &&
          blocks.map((b, i) => {
            return <Block block={b} i={i} themeSettings={page.themeSettings} key={b.id} />
          })}

        <Global
          styles={(theme) => ({
            "::selection": {
              background:
                theme?.colors?.[page?.themeSettings?.palette?.primary]?.[4] ||
                theme.colors.violet[4],
              color: theme.white,
              WebkitTextFillColor: theme.white,
            },
          })}
        />
      </AppShell>
    )
  }
  return <LoadingOverlay visible={true} loader={<Loader color="violet" size={32} />} />
}

export default observer(Page)

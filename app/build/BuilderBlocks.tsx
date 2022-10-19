import { Box, Button, Center, useMantineTheme, Image } from "@mantine/core"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { observer } from "mobx-react-lite"
import React, { useCallback, useContext, useEffect, useRef } from "react"
import { BuildStore } from "store/build"
import { FiPlusSquare } from "@react-icons/all-files/fi/FiPlusSquare"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import RenderJSXFromBlock from "app/core/components/RenderJSXFromBlock"
import SafeWrapper from "app/core/components/SafeWrapper"
import { ICanvasBlock } from "types"

const Virtuoso = dynamic(() => import("react-virtuoso").then((m) => m.Virtuoso))

const ListComponent = observer(() => {
  const {
    data: { themeSettings },
  } = BuildStore
  const itemContent = useCallback(
    (index, block: ICanvasBlock) => {
      return (
        <div className="builder-block" key={block.id} style={{ minHeight: 1 }}>
          <SafeWrapper>
            <RenderJSXFromBlock
              element={block}
              withMobx
              shouldFlat
              withContentEditable
              withEditToolbar
              withThemeSettings
              themeSettings={themeSettings}
              sectionIndex={index}
            />
          </SafeWrapper>
        </div>
      )
    },
    [themeSettings]
  )

  return <Virtuoso useWindowScroll data={BuildStore.data.blocks} itemContent={itemContent} />
})

const Blocks = observer(() => {
  const {
    data: { blocks },
  } = BuildStore
  const { t } = useTranslation("build")

  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"

  const onClick = () =>
    setModalContext((prevValue: IModalContextValue) => ({
      ...prevValue,
      canvasSectionsModal: true,
    }))

  return (
    <>
      {blocks.length > 0 ? (
        <ListComponent />
      ) : (
        <Center style={{ height: "100%" }}>
          <Button
            variant={dark ? "white" : "filled"}
            color="dark"
            size="md"
            style={{ minWidth: "192px" }}
            rightIcon={<FiPlusSquare />}
            onClick={onClick}
          >
            {t("add new section")}
          </Button>
        </Center>
      )}
    </>
  )
})

const BuilderBlocks = () => {
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    BuildStore.sectionsRef = sectionsRef
  }, [sectionsRef])

  return (
    <Box
      sx={{
        height: "100%",
        paddingTop: "12px",
        paddingBottom: "12px",
        marginTop: "-12px",
        marginBottom: "-12px",
        "[data-button=true] .content-editable": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          whiteSpace: "normal",
          maxWidth: "100%",
        },
      }}
      ref={sectionsRef}
    >
      <Blocks />
    </Box>
  )
}

export default BuilderBlocks

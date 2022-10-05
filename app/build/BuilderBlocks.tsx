import { Box, Button, Center, useMantineTheme } from "@mantine/core"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { observer } from "mobx-react-lite"
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { BuildStore } from "store/build"
import { FiPlusSquare } from "@react-icons/all-files/fi/FiPlusSquare"
import useTranslation from "next-translate/useTranslation"
import { ICanvasBlock } from "types"
import dynamic from "next/dynamic"

const RenderJSXFromBlock = dynamic(() => import("app/core/components/RenderJSXFromBlock"))
const Virtuoso = dynamic(() => import("react-virtuoso").then((m) => m.Virtuoso))
const SafeWrapper = dynamic(() => import("app/core/components/SafeWrapper"))

const ListComponent = observer(() => {
  const itemContent = useCallback(
    (index, block) => (
      <div className="builder-block" key={block.id}>
        <SafeWrapper>
          <RenderJSXFromBlock
            element={block}
            shouldFlat
            withContentEditable
            withEditToolbar
            withPalette
            palette={BuildStore.data.palette}
            sectionIndex={index}
          />
        </SafeWrapper>
      </div>
    ),
    []
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
  return (
    <>
      {blocks.length > 0 ? (
        <ListComponent />
      ) : (
        <Center style={{ height: "100%" }}>
          <Button
            radius="sm"
            variant={dark ? "white" : "filled"}
            color="dark"
            size="md"
            style={{ minWidth: "192px" }}
            rightIcon={<FiPlusSquare />}
            onClick={() =>
              setModalContext((prevValue: IModalContextValue) => ({
                ...prevValue,
                canvasSectionsModal: true,
              }))
            }
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
          display: "-webkit-box",
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

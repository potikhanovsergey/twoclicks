import { Box, Button, Center, useMantineTheme } from "@mantine/core"
import SafeWrapper from "app/core/components/SafeWrapper"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { RenderJSXFromBlock } from "helpers"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef } from "react"
import { BuildStore } from "store/build"
import { FiPlusSquare } from "@react-icons/all-files/fi/FiPlusSquare"
import useTranslation from "next-translate/useTranslation"
import { ICanvasBlock, ICanvasPalette } from "types"

const BlocksList = observer(
  ({ blocks, palette }: { blocks: ICanvasBlock[]; palette: ICanvasPalette }) => {
    return (
      <>
        {blocks.map((b, i) => {
          return (
            <div className="builder-block" key={b.id}>
              <SafeWrapper>
                <RenderJSXFromBlock
                  element={b}
                  shouldFlat
                  withContentEditable
                  withEditToolbar
                  withPalette
                  palette={palette}
                  sectionIndex={i}
                />
              </SafeWrapper>
            </div>
          )
        })}
      </>
    )
  }
)

const Blocks = observer(() => {
  const {
    data: { blocks, palette },
  } = BuildStore
  const { t } = useTranslation("build")

  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return (
    <>
      {blocks.length > 0 ? (
        <BlocksList blocks={blocks} palette={palette} />
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

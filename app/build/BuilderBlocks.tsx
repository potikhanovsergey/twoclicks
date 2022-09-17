import { Box, Button, Center } from "@mantine/core"
import SafeWrapper from "app/core/components/SafeWrapper"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { RenderJSXFromBlock } from "helpers"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef } from "react"
import { BuildStore } from "store/build"
import { FiPlusSquare } from "react-icons/fi"
import shortid from "shortid"
import useTranslation from "next-translate/useTranslation"

const BuilderBlocks = () => {
  const {
    data: { blocks, palette },
  } = BuildStore

  const [, setModalContext = () => ({})] = useContext(ModalContext)

  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    BuildStore.sectionsRef = sectionsRef
  }, [sectionsRef])

  const { t } = useTranslation("pagesBuild")

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
      {blocks && blocks.length > 0 ? (
        blocks.map((b, i) => {
          const JSX = RenderJSXFromBlock({
            element: b,
            shouldFlat: true,
            withContentEditable: true,
            withEditToolbar: true,
            withPalette: true,
            palette,
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
        })
      ) : (
        <Center style={{ height: "100%" }}>
          <Button
            radius="sm"
            variant="gradient"
            size="md"
            style={{ minWidth: "192px" }}
            color="red"
            gradient={{ from: "violet", to: "red" }}
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
    </Box>
  )
}

export default observer(BuilderBlocks)

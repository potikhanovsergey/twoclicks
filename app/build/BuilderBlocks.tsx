import { Box, Button, Center, ThemeIcon } from "@mantine/core"
import SafeWrapper from "app/core/components/SafeWrapper"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { renderJSXFromBlock } from "helpers"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef } from "react"
import { BuildStore } from "store/build"
import { GrNewWindow } from "react-icons/gr"
import { FiPlusSquare } from "react-icons/fi"

const BuilderBlocks = observer(() => {
  const {
    data: { blocks, palette },
  } = BuildStore

  const [, setModalContext = () => ({})] = useContext(ModalContext)

  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    BuildStore.sectionsRef = sectionsRef
  }, [sectionsRef])
  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
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
          const JSX = renderJSXFromBlock({
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
              <div className="builder-block" key={b.id}>
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
            style={{ width: "192px" }}
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
            Add section
          </Button>
        </Center>
      )}
    </Box>
  )
})

export default BuilderBlocks

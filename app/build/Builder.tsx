import { useTranslation } from "next-i18next"
import { Stack, Button } from "@mantine/core"
import React, { useContext, useEffect } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { inflateBase64, recursiveTagName } from "helpers"
import { BuildStore } from "store/build"
import { BuildingBlock } from "@prisma/client"
import { observer } from "mobx-react-lite"
import { usePortfolio } from "app/core/hooks/usePortfolio"

const BuilderBlocks = observer(() => {
  return (
    <>
      {BuildStore &&
        BuildStore.data.blocks.map((b, i) => {
          const TagName = recursiveTagName(b, true)
          if (TagName) {
            return TagName
          }
          return <React.Fragment key={i} />
        })}
    </>
  )
})

const Builder = () => {
  // const { t } = useTranslation('pagesBuild');
  const [, setModalContext = () => ({})] = useContext(ModalContext)

  const [portfolio, { isSuccess }] = usePortfolio()
  useEffect(() => {
    if (portfolio?.data) {
      const inflatedData = inflateBase64(portfolio.data)
      const dataBlocks = inflatedData as BuildingBlock[]
      BuildStore.data.blocks = dataBlocks
    }
  }, [portfolio])
  return (
    <Stack>
      <h1>Builder</h1>
      <BuilderBlocks />
      <Button
        onClick={() =>
          setModalContext((prevValue: IModalContextValue) => ({
            ...prevValue,
            canvasComponentsModal: true,
          }))
        }
      >
        Add component
      </Button>
      <Button
        color="red"
        onClick={() =>
          setModalContext((prevValue: IModalContextValue) => ({
            ...prevValue,
            canvasSectionsModal: true,
          }))
        }
      >
        Add section
      </Button>
      <Button
        onClick={() => {
          BuildStore.changeProp({
            id: "21312320",
            newProps: {
              color: "red",
              size: "xl",
            },
          })
        }}
      >
        Change prop
      </Button>
    </Stack>
  )
}

export default Builder

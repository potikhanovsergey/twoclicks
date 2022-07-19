import { useTranslation } from "next-i18next"
import { Stack, Button } from "@mantine/core"
import React, { useContext, useEffect } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { recursiveTagName } from "helpers"
import { useQuery } from "@blitzjs/rpc"
import getPortfolio from "app/portfolios/queries/getPortfolio"
import { BuildStore } from "store/build"
import { BuildingBlock } from "@prisma/client"
import { observer } from "mobx-react-lite"

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

  const [portfolio, { isSuccess }] = useQuery(getPortfolio, null)
  useEffect(() => {
    if (portfolio?.data) {
      const dataBlocks = portfolio?.data as unknown as BuildingBlock[]
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

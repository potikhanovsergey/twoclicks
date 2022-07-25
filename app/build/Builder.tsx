import { useTranslation } from "next-i18next"
import { Stack, Button } from "@mantine/core"
import React, { useContext, useEffect } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { inflateBase64, recursiveTagName } from "helpers"
import { BuildStore } from "store/build"
import { BuildingBlock } from "@prisma/client"
import { observer } from "mobx-react-lite"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createPortfolio from "app/portfolios/mutations/createPortfolio"
import getLatestPortfolio from "app/portfolios/queries/getLatestPortfolio"

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
  const [latestPortfolio, { refetch: refetchLatestPortfolio }] = useQuery(
    getLatestPortfolio,
    null,
    { enabled: false }
  )
  const currentUser = useCurrentUser()
  const [createPortfolioMutation] = useMutation(createPortfolio)

  // ### Create user portfolio if it doesn't exist
  useEffect(() => {
    const createPortfolio = async () => {
      await createPortfolioMutation({ firstTime: true })
      void refetchLatestPortfolio()
    }
    if (currentUser && !currentUser.hasCreatedPortfolio) {
      if (!currentUser.hasCreatedPortfolio) {
        void createPortfolio()
      } else {
        void refetchLatestPortfolio()
      }
    }
  }, [currentUser])

  useEffect(() => {
    if (latestPortfolio?.data) {
      const inflatedData = inflateBase64(latestPortfolio.data)
      const dataBlocks = inflatedData as BuildingBlock[]
      BuildStore.data.blocks = dataBlocks
      console.log(BuildStore.data.blocks)
    }
  }, [latestPortfolio])
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

import { useMutation } from "@blitzjs/rpc"
import { Switch, Tooltip, Text, Button } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import togglePortfolioPublished from "app/portfolios/mutations/togglePortfolioPublished"
import { observer } from "mobx-react-lite"
import { ChangeEventHandler, useEffect, useState } from "react"
import { BuildStore } from "store/build"

interface ITogglePublishPortfolio {
  id: string
  isPublished: boolean
}

const TogglePublishPortfilio = ({ id, isPublished }: ITogglePublishPortfolio) => {
  const [isPortfolioPublished, setIsPortfolioPublished] = useState(isPublished)
  const handleToggle = (e) => {
    if (id) {
      const newIsPublished = !isPublished
      void togglePortfolioPublishedMutation({ id, isPublished: newIsPublished })
    }
  }
  const [togglePortfolioPublishedMutation, { isLoading, isSuccess }] =
    useMutation(togglePortfolioPublished)

  useEffect(() => {
    if (isSuccess) {
      setIsPortfolioPublished(!isPortfolioPublished)
    }
  }, [isSuccess])
  return (
    <Button color="violet" onClick={handleToggle} size="xs" loading={isLoading}>
      {isPortfolioPublished ? "Hide portfolio" : "Publish portfolio"}
    </Button>
  )
}

export default observer(TogglePublishPortfilio)

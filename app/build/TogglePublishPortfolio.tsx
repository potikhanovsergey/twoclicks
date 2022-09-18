import { useMutation } from "@blitzjs/rpc"
import { Button } from "@mantine/core"
import togglePortfolioPublished from "app/portfolios/mutations/togglePortfolioPublished"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useEffect } from "react"
import { AppStore } from "store"

import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash"
import { FaEye } from "@react-icons/all-files/fa/FaEye"

interface ITogglePublishPortfolio {
  id: string
}

const TogglePublishPortfilio = ({ id }: ITogglePublishPortfolio) => {
  const portfolio = AppStore.portfolios?.find((p) => p.id === id)

  const handleToggle = (e) => {
    if (portfolio) {
      const newIsPublished = !portfolio.isPublished
      void togglePortfolioPublishedMutation({ id, isPublished: newIsPublished })
    }
  }
  const [togglePortfolioPublishedMutation, { isLoading, isSuccess }] =
    useMutation(togglePortfolioPublished)

  useEffect(() => {
    if (isSuccess && portfolio) {
      portfolio.isPublished = !portfolio.isPublished
    }
  }, [isSuccess])

  const { t } = useTranslation("pagesBuild")

  return (
    <Button
      color="violet"
      onClick={handleToggle}
      size="xs"
      loading={isLoading}
      variant="filled"
      leftIcon={portfolio?.isPublished ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
    >
      {portfolio?.isPublished ? t("hide portfolio") : t("publish portfolio")}
    </Button>
  )
}

export default observer(TogglePublishPortfilio)

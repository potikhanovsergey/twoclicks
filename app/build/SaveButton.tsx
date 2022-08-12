import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { Button } from "@mantine/core"
import { useHotkeys } from "@mantine/hooks"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { FaSave } from "react-icons/fa"
import { BuildStore } from "store/build"

const SaveButton = observer(() => {
  const session = useSession()
  const [updatePortfolioMutation, { isLoading, isSuccess }] = useMutation(updatePortfolio)

  const { hasPortfolioChanged, savePortfolio, isSaveButtonLoading, setIsSaveButtonLoading } =
    BuildStore
  useHotkeys([["mod+S", (e) => savePortfolio({ e, session, updatePortfolioMutation })]])

  useEffect(() => {
    setIsSaveButtonLoading(isLoading)
  }, [isLoading])
  return (
    <Button
      loading={isSaveButtonLoading}
      onClick={() => savePortfolio({ session, updatePortfolioMutation })}
      disabled={!hasPortfolioChanged}
      variant={hasPortfolioChanged ? "gradient" : "default"}
      gradient={{ from: "violet", to: "red", deg: 35 }}
      size="xs"
      leftIcon={<FaSave size={15} />}
      sx={({}) => ({ ":disabled": { border: 0 } })}
    >
      Сохранить изменения
    </Button>
  )
})

export default SaveButton

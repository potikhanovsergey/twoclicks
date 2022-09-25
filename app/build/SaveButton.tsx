import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { Button } from "@mantine/core"
import { useHotkeys } from "@mantine/hooks"
import updatePage from "app/portfolios/mutations/updatePage"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useEffect } from "react"
import { BuildStore } from "store/build"

import { FaSave } from "@react-icons/all-files/fa/FaSave"

const SaveButton = observer(() => {
  const session = useSession()
  const [updatePageMutation, { isLoading, isSuccess }] = useMutation(updatePage)

  const { hasPageChanged, savePage, isSaveButtonLoading, setIsSaveButtonLoading } = BuildStore
  useHotkeys([["mod+S", (e) => savePage({ e, session, updatePageMutation })]])

  useEffect(() => {
    setIsSaveButtonLoading(isLoading)
  }, [isLoading])

  const { t } = useTranslation("build")
  return (
    <Button
      loading={isSaveButtonLoading}
      onClick={() => savePage({ session, updatePageMutation })}
      disabled={!hasPageChanged}
      variant={hasPageChanged ? "gradient" : "default"}
      gradient={{ from: "violet", to: "red", deg: 35 }}
      size="xs"
      leftIcon={<FaSave size={15} />}
      sx={({}) => ({ ":disabled": { border: 0 } })}
    >
      {t("save changes")}
    </Button>
  )
})

export default SaveButton

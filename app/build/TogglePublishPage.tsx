import { useMutation } from "@blitzjs/rpc"
import { Button, useMantineTheme } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { AppStore } from "store"

import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash"
import { FaEye } from "@react-icons/all-files/fa/FaEye"
import togglePagePublished from "app/build-pages/mutations/togglePagePublished"
import { useCallback, useMemo } from "react"

interface ITogglePublishPage {
  id: string
}

const TogglePublishPage = ({ id }: ITogglePublishPage) => {
  const page = useMemo(() => {
    return AppStore.pages?.find((p) => p.id === id)
  }, [id])

  const [togglePagePublishedMutation, { isLoading }] = useMutation(togglePagePublished)

  const handleToggle = useCallback(
    async (e) => {
      if (page) {
        const newIsPublished = !page.isPublished
        const response = await togglePagePublishedMutation({ id, isPublished: newIsPublished })
        if (response) {
          page.isPublished = newIsPublished
        }
      }
    },
    [page, togglePagePublishedMutation, id]
  )

  const { t } = useTranslation("build")

  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return (
    <Button
      color="dark"
      onClick={handleToggle}
      size="xs"
      loading={isLoading}
      variant={dark ? "white" : "filled"}
      leftIcon={page?.isPublished ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
    >
      {page?.isPublished ? t("hide page") : t("publish page")}
    </Button>
  )
}

export default observer(TogglePublishPage)

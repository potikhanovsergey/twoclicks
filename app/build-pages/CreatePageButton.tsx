import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { BuildingBlock } from "@prisma/client"
import { PageStarterMock } from "db/mocks"
import { useRouter } from "next/router"
import { deflate, getPageWithDeflatedData } from "helpers/utils"
import { Button, ButtonProps, useMantineTheme } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
type ICreatePageButton = Omit<ButtonProps, "onClick" | "children">

import { FiPlusSquare } from "@react-icons/all-files/fi/FiPlusSquare"
import createPage from "./mutations/createPage"

const CreatePageButton = (props: ICreatePageButton) => {
  const router = useRouter()
  const session = useSession()
  const [createPageMutation, { isLoading }] = useMutation(createPage)

  const { t } = useTranslation("common")

  const handleCreatePage = async () => {
    const ObjectID = (await import("bson-objectid")).default
    const page = {
      id: ObjectID().toHexString(),
      name: "Brand new page",
      data: PageStarterMock.data as BuildingBlock[],
      themeSettings: PageStarterMock.themeSettings,
    }

    // Authorized
    if (session.userId) {
      const p = await createPageMutation(page)
      if (p) {
        void router.push(`/build/${page.id}`)
        return
      }
    }

    // Not authorized
    const pageWithDeflatedData = getPageWithDeflatedData(page)
    localStorage?.setItem(`page-${page.id}`, deflate(pageWithDeflatedData))
    void router.push(`/build/${page.id}`)
  }
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return (
    <Button
      onClick={handleCreatePage}
      // variant="gradient"
      // gradient={{ from: "flame", to: "red", deg: 110 }}

      rightIcon={<FiPlusSquare />}
      {...props}
    >
      {t("createPage")}
    </Button>
  )
}

export default CreatePageButton

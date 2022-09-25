import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { BuildingBlock } from "@prisma/client"
import ObjectID from "bson-objectid"
import { PageStarterMock } from "db/mocks"
import { useRouter } from "next/router"
import { deflate, getPageWithDeflatedData } from "helpers"
import { Button, ButtonProps } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
type ICreatePageButton = Omit<ButtonProps, "onClick" | "children">

import { AiFillBuild } from "@react-icons/all-files/ai/AiFillBuild"
import createPage from "./mutations/createPage"

const CreatePageButton = (props: ICreatePageButton) => {
  const router = useRouter()
  const session = useSession()
  const [createPageMutation, { isLoading }] = useMutation(createPage)

  const { t } = useTranslation("common")

  const handleCreatePage = async () => {
    const page = {
      id: ObjectID().toHexString(),
      name: "Brand new page",
      data: PageStarterMock.data as BuildingBlock[],
      palette: PageStarterMock.palette,
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
  return (
    <Button
      onClick={handleCreatePage}
      variant="gradient"
      gradient={{ from: "violet", to: "red", deg: 110 }}
      rightIcon={<AiFillBuild />}
      {...props}
    >
      {t("createPage")}
    </Button>
  )
}

export default CreatePageButton

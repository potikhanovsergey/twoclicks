import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { BuildingBlock } from "@prisma/client"
import { setCookie } from "cookies-next"
import ObjectID from "bson-objectid"
import { PortfolioStarterMock } from "db/mocks"
import { useRouter } from "next/router"
import { deflate } from "helpers"
import createPortfolio from "./mutations/createPortfolio"
import { Button, ButtonProps } from "@mantine/core"
import { AppStore } from "store"
type ICreatePortfolioButton = Omit<ButtonProps, "onClick" | "children">

const CreatePortfolioButton = (props: ICreatePortfolioButton) => {
  const router = useRouter()
  const session = useSession()
  const [createPortfolioMutation, { isLoading }] = useMutation(createPortfolio)

  const handleCreatePortfolio = async () => {
    const portfolio = {
      id: ObjectID().toHexString(),
      name: "Brand new portfolio",
      data: PortfolioStarterMock.data as BuildingBlock[],
    }
    if (session.userId) {
      const p = await createPortfolioMutation(portfolio)
      if (p) {
        void router.push(`/build/${portfolio.id}`)
        return
      }
    }
    setCookie(`portfolio-${portfolio.id}`, deflate(portfolio))
    void router.push(`/build/${portfolio.id}`)
  }
  return (
    <Button onClick={handleCreatePortfolio} {...props}>
      Создать портфолио
    </Button>
  )
}

export default CreatePortfolioButton

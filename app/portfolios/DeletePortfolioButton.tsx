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

const DeletePortfolioButton = (props: ButtonProps) => {
  const router = useRouter()
  const session = useSession()
  const [createPortfolioMutation, { isLoading }] = useMutation(createPortfolio)

  const handleCreatePortfolio = async () => {
    const portfolio = {
      id: ObjectID().toHexString(),
      name: "Brand new portfolio",
      data: PortfolioStarterMock.data as BuildingBlock[],
    }
    if (!session.userId) {
      setCookie(`portfolio-${portfolio.id}`, deflate(portfolio))
    } else {
      await createPortfolioMutation(portfolio)
    }
    void router.push(`/build/${portfolio.id}`)
  }
  return (
    <Button onClick={handleCreatePortfolio} {...props}>
      Создать портфолио
    </Button>
  )
}

export default DeletePortfolioButton

import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { BuildingBlock } from "@prisma/client"
import { setCookie } from "cookies-next"
import ObjectID from "bson-objectid"
import { PortfolioStarterMock } from "db/mocks"
import { useRouter } from "next/router"
import { deflate, getPortfolioWithDeflatedData } from "helpers"
import createPortfolio from "./mutations/createPortfolio"
import { Button, ButtonProps } from "@mantine/core"
import { AiFillBuild } from "react-icons/ai"
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
      palette: PortfolioStarterMock.palette,
    }

    // Authorized
    if (session.userId) {
      const p = await createPortfolioMutation(portfolio)
      if (p) {
        void router.push(`/build/${portfolio.id}`)
        return
      }
    }

    // Not authorized
    const portfolioWithDeflatedData = getPortfolioWithDeflatedData(portfolio)
    localStorage?.setItem(`portfolio-${portfolio.id}`, deflate(portfolioWithDeflatedData))
    void router.push(`/build/${portfolio.id}`)
  }
  return (
    <Button
      onClick={handleCreatePortfolio}
      variant="gradient"
      gradient={{ from: "violet", to: "red", deg: 110 }}
      rightIcon={<AiFillBuild />}
      {...props}
    >
      Создать портфолио
    </Button>
  )
}

export default CreatePortfolioButton

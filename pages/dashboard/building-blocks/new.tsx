import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createBuildingBlock from "app/dashboard/building-blocks/mutations/createBuildingBlock"
import { PortfolioMock } from "db/mocks"
import createPortfolio from "app/dashboard/portfolios/mutations/createPortfolio"

const NewBuildingBlockPage = () => {
  const router = useRouter()
  const [createBuildingBlockMutation] = useMutation(createBuildingBlock)
  // const [createPortfolioMutation] = useMutation(createPortfolio)

  // const handleCreatePortfolio = () => {
  //   void createPortfolioMutation({
  //     name: PortfolioMock.name,
  //     data: deflate(PortfolioMock.data),
  //   })
  // }

  return (
    <Layout title={"Create New BuildingBlock"}>
      <h1>Create New BuildingBlock</h1>
      <p>
        <Link href={{ pathname: "/dashboard/building-blocks" }}>
          <a>BuildingBlocks</a>
        </Link>
      </p>
    </Layout>
  )
}

NewBuildingBlockPage.authenticate = true

export default NewBuildingBlockPage

import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getBuildingBlocks from "app/dashboard/building-blocks/queries/getBuildingBlocks"
import { SimpleGrid } from "@mantine/core"
import ViewListItem from "app/core/components/modals/build/ViewListItem"
import shortid from "shortid"

const ITEMS_PER_PAGE = 12

export const BuildingBlocksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ buildingBlocks, hasMore }] = usePaginatedQuery(getBuildingBlocks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div style={{ maxWidth: "1024px", margin: "40px auto" }}>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
      <SimpleGrid cols={4} style={{ padding: "20px" }}>
        {buildingBlocks.map((block) => (
          <ViewListItem block={block} key={shortid.generate()} />
        ))}
      </SimpleGrid>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const BuildingBlocksPage = () => {
  return (
    <Layout>
      <Head>
        <title>BuildingBlocks</title>
      </Head>

      <div>
        <p>
          <Link href={{ pathname: "/dashboard/building-blocks/new" }}>
            <a>Create BuildingBlock</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <BuildingBlocksList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default BuildingBlocksPage

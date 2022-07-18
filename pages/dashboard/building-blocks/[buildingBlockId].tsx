import { Suspense } from "react"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getBuildingBlock from "app/dashboard/building-blocks/queries/getBuildingBlock"
import deleteBuildingBlock from "app/dashboard/building-blocks/mutations/deleteBuildingBlock"

export const BuildingBlock = () => {
  const router = useRouter()
  const buildingBlockId = useParam("buildingBlockId", "number")
  const [deleteBuildingBlockMutation] = useMutation(deleteBuildingBlock)
  const [buildingBlock] = useQuery(getBuildingBlock, { id: buildingBlockId })

  return (
    <>
      <Head>
        <title>BuildingBlock {buildingBlock.id}</title>
      </Head>

      <div>
        <h1>BuildingBlock {buildingBlock.id}</h1>
        <pre>{JSON.stringify(buildingBlock, null, 2)}</pre>

        <Link
          href={{
            pathname: "/dashboard/building-blocks/[buildingBlockId]/edit",
            query: { buildingBlockId: buildingBlock.id },
          }}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBuildingBlockMutation({ id: buildingBlock.id })
              void router.push({ pathname: "/dashboard/building-blocks" })
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowBuildingBlockPage = () => {
  return (
    <div>
      <p>
        <Link href={{ pathname: "/dashboard/building-blocks" }}>
          <a>BuildingBlocks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <BuildingBlock />
      </Suspense>
    </div>
  )
}

ShowBuildingBlockPage.authenticate = true
ShowBuildingBlockPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBuildingBlockPage

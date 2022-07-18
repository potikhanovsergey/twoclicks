import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getBuildingBlock from "app/dashboard/building-blocks/queries/getBuildingBlock"
import updateBuildingBlock from "app/dashboard/building-blocks/mutations/updateBuildingBlock"

export const EditBuildingBlock = () => {
  const router = useRouter()
  const buildingBlockId = useParam("buildingBlockId", "number")
  const [buildingBlock, { setQueryData }] = useQuery(
    getBuildingBlock,
    { id: buildingBlockId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBuildingBlockMutation] = useMutation(updateBuildingBlock)

  return (
    <>
      <Head>
        <title>Edit BuildingBlock {buildingBlock.id}</title>
      </Head>

      <div>
        <h1>Edit BuildingBlock {buildingBlock.id}</h1>
        <pre>{JSON.stringify(buildingBlock, null, 2)}</pre>

        {/* <BuildingBlockForm
          submitText="Update BuildingBlock"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBuildingBlock}
          initialValues={buildingBlock}
          onSubmit={async (values) => {
            try {
              const updated = await updateBuildingBlockMutation({
                id: buildingBlock.id,
                ...values,
              })
              await setQueryData(updated)
              void router.push({
                pathname: `/building-blocks/[buildingBlockId]`,
                query: { buildingBlockId: updated.id },
              })
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        /> */}
      </div>
    </>
  )
}

const EditBuildingBlockPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBuildingBlock />
      </Suspense>

      <p>
        <Link href={{ pathname: "/dashboard/building-blocks" }}>
          <a>BuildingBlocks</a>
        </Link>
      </p>
    </div>
  )
}

EditBuildingBlockPage.authenticate = true
EditBuildingBlockPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBuildingBlockPage

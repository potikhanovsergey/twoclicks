import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createBuildingBlock from "app/dashboard/building-blocks/mutations/createBuildingBlock"

const NewBuildingBlockPage = () => {
  const router = useRouter()
  const [createBuildingBlockMutation] = useMutation(createBuildingBlock)

  return (
    <Layout title={"Create New BuildingBlock"}>
      <h1>Create New BuildingBlock</h1>

      {/* <BuildingBlockForm
        submitText="Create BuildingBlock"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBuildingBlock}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const buildingBlock = await createBuildingBlockMutation(values)
            void router.push({
              pathname: `/building-blocks/[buildingBlockId]`,
              query: { buildingBlockId: buildingBlock.id },
            })
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      /> */}

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

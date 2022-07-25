import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBuildingBlockInput = z.object({
  id: z.number(),
})

export default async function DeleteBuildingBlock(input, ctx: Ctx) {
  DeleteBuildingBlockInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const buildingBlock = await db.buildingBlock.delete({
    where: { id: input.id },
  })

  return buildingBlock
}

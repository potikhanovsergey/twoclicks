import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBuildingBlockInput = z.object({
  id: z.number(),
  name: z.string(),
})

export default async function UpdateBuildingBlock(input, ctx: Ctx) {
  UpdateBuildingBlockInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const buildingBlock = await db.buildingBlock.update({
    where: { id: input.id },
    data: input,
  })

  return buildingBlock
}

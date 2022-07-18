import { Ctx, NotFoundError } from "blitz"
import db from "db"

export default async function GetBuildingBlock(input, ctx: Ctx) {
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const buildingBlock = await db.buildingBlock.findFirst({
    where: { id: input.id },
  })

  if (!buildingBlock) throw new NotFoundError()

  return buildingBlock
}

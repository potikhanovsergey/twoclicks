import { Ctx } from "blitz"
import db from "db"

export default async function CreateBuildingBlock(input, ctx: Ctx) {
  ctx.session.$isAuthorized()
  console.log("input", input)
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const buildingBlock = await db.buildingBlock.create({ data: input })

  return buildingBlock
}

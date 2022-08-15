import { Ctx } from "blitz"
import db from "db"

export default async function deleteBuildingBlock(input: { id: string }, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { id } = input
  const buildingBlock = await db.buildingBlock.delete({ where: { id } })

  return buildingBlock
}

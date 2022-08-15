import { Ctx } from "blitz"
import db, { BuildingBlock } from "db"

export default async function updateBuildingBlock(
  input: { id: string; data: BuildingBlock },
  ctx: Ctx
) {
  ctx.session.$isAuthorized()

  const {
    data: { createdAt, updatedAt, ...rest },
    id,
  } = input
  const buildingBlock = await db.buildingBlock.update({ where: { id }, data: rest })

  return buildingBlock
}

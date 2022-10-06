import db, { Prisma } from "db"

export default async function GetBuildingBlocks(input: Prisma.BuildingBlockFindManyArgs) {
  try {
    const buildingBlocks = await db.buildingBlock.findMany(input)
    return buildingBlocks
  } catch (e) {
    console.log("Get building blocks error", e)
    return null
  }
}

import db, { Prisma } from "db"

export default async function GetBuildingBlocks(input) {
  try {
    const buildingBlocks = await db.buildingBlock.findMany()
    return buildingBlocks
  } catch (e) {
    console.log("Get building blocks error", e)
    return null
  }
}

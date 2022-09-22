import { Ctx } from "blitz"
import db from "db"

export default async function upsertUsedBlock(input: { buildingBlockId: string }, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const userId = ctx.session.userId as string
  const buildingBlockId = input.buildingBlockId as string

  try {
    const usedBlock = await db.usedBlock.upsert({
      where: {
        userId_buildingBlockId: {
          userId,
          buildingBlockId,
        },
      },
      create: {
        userId,
        buildingBlockId,
      },
      update: {
        updatedAt: new Date(),
      },
    })
    return usedBlock
  } catch (e) {
    console.log("Upsert used block error", e)
    return null
  }
}

import { Ctx } from "blitz"
import db from "db"

export default async function upsertUsedBlock(input: { buildingBlockId: string }, ctx: Ctx) {
  const userId = ctx.session.userId as string
  const buildingBlockId = input.buildingBlockId as string

  if (!userId) return null
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
    return null
  }
}

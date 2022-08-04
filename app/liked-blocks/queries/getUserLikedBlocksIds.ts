import { Ctx } from "blitz"
import db from "db"

export default async function getUserLikedBlocksIds(_ = null, ctx: Ctx) {
  if (!ctx.session.userId) return []
  try {
    const likedBlocks = await db.likedBlock.findMany({
      where: { userId: ctx.session.userId as string },
      select: { buildingBlockId: true },
    })
    return likedBlocks
  } catch (e) {
    console.log("Get user liked blocks ids error", e)
    return null
  }
}

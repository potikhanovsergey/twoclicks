import { Ctx } from "blitz"
import db from "db"

export default async function createLikedBlock(input, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const userId = ctx.session.userId as string
  const buildingBlockId = input.buildingBlockId as string

  try {
    const likedBlock = await db.likedBlock.upsert({
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
      update: {},
    })
    return likedBlock
  } catch (e) {
    return null
  }
}

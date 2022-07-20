import { Ctx } from "blitz"
import db from "db"

export default async function CreateLikedBlock(input, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const userId = ctx.session.userId as string
  const buildingBlockId = input.buildingBlockId as string
  const likedBlock = await db.likedBlock.create({
    data: {
      userId,
      buildingBlockId,
    },
  })
  return likedBlock
}

import { Ctx } from "blitz"
import db from "db"

export default async function DeleteLikedBlock(input, ctx: Ctx) {
  ctx.session.$isAuthorized()

  try {
    const buildingBlock = await db.likedBlock.delete({
      where: {
        userId_buildingBlockId: {
          buildingBlockId: input.buildingBlockId as string,
          userId: ctx.session.userId as string,
        },
      },
    })

    return buildingBlock
  } catch (e) {
    return null
  }
}

import { Ctx } from "blitz"
import ObjectID from "bson-objectid"
import db from "db"

export default async function getPageByID(
  {
    id,
    isPublic = true,
    isPreview = false,
  }: { id?: string; isPublic?: boolean; isPreview?: boolean },
  ctx: Ctx
) {
  if (!isPublic && !ctx.session.userId) return null
  if (!id) return null

  const isValidMongoID = ObjectID.isValid(id)

  if (isPreview && ctx.session.userId) {
    const page = await db.page.findFirst({
      where: {
        id: isValidMongoID ? id : undefined,
        customID: isValidMongoID ? undefined : id,
      },
    })
    return page
  }

  if (isPublic) {
    const page = await db.page.findFirst({
      where: {
        id: isValidMongoID ? id : undefined,
        customID: isValidMongoID ? undefined : id,
        isPublished: true,
      },
    })
    return page
  } else if (ctx.session.userId) {
    const page = await db.page.findFirst({
      where: {
        id: isValidMongoID ? id : undefined,
        customID: isValidMongoID ? undefined : id,
        userId: isPublic ? undefined : ctx.session.userId,
      },
    })
    return page
  }
}

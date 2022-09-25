import { Ctx } from "blitz"
import db from "db"

export default async function getPortfolioByID(
  {
    id,
    isPublic = true,
    isPreview = false,
  }: { id?: string; isPublic?: boolean; isPreview?: boolean },
  ctx: Ctx
) {
  if (!isPublic && !ctx.session.userId) return null
  if (!id) return null

  if (isPreview && ctx.session.userId) {
    const portfolio = await db.page.findFirst({
      where: {
        id,
        userId: ctx.session.userId,
      },
    })
    return portfolio
  }

  if (isPublic) {
    const portfolio = await db.page.findFirst({
      where: {
        id,
        isPublished: true,
      },
    })
    return portfolio
  } else if (ctx.session.userId) {
    const portfolio = await db.page.findFirst({
      where: { id, userId: isPublic ? undefined : ctx.session.userId },
    })
    return portfolio
  }
}

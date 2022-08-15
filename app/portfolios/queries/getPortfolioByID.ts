import { Ctx } from "blitz"
import db from "db"

export default async function getPortfolioByID(
  { id, isPublic = true }: { id?: string; isPublic?: boolean },
  ctx: Ctx
) {
  if (!isPublic && !ctx.session.userId) return null
  if (!id) return null

  if (isPublic) {
    const portfolio = await db.portfolio.findFirst({
      where: { id },
    })
    return portfolio
  } else if (ctx.session.userId) {
    const portfolio = await db.portfolio.findFirst({
      where: { id, userId: isPublic ? undefined : ctx.session.userId },
    })
    return portfolio
  }
}

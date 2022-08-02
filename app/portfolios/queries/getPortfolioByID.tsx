import { Ctx } from "blitz"
import db from "db"

export default async function getPortfolioByID({ id }: { id?: string }, ctx: Ctx) {
  if (!ctx.session?.userId) return null
  if (!id) return null
  try {
    const portfolio = await db.portfolio.findFirst({
      where: { id, userId: ctx.session.userId },
      select: { id: true, name: true, data: true },
    })
    return portfolio
  } catch (e) {
    return null
  }
}

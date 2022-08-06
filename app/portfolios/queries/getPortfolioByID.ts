import { Ctx } from "blitz"
import db from "db"

export default async function getPortfolioByID({ id }: { id?: string }, ctx: Ctx) {
  if (!ctx.session?.userId) return null
  if (!id) return null
  try {
    const portfolio = await db.portfolio.findFirst({
      where: { id, userId: ctx.session.userId },
    })
    return portfolio
  } catch (e) {
    console.log("Get portfolio by ID error", e)
    return null
  }
}

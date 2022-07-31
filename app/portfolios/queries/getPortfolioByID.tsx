import { Ctx } from "blitz"
import db from "db"

export default async function getPortfolioByID({ id }: { id?: string }, { session }: Ctx) {
  if (!id) return null
  try {
    const portfolio = await db.portfolio.findUniqueOrThrow({
      where: { id },
      select: { id: true, name: true, data: true },
    })
    return portfolio
  } catch (e) {
    return null
  }
}

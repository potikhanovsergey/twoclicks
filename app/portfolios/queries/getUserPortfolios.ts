import { Ctx } from "blitz"
import db from "db"

export default async function getUserPortfolios(_ = null, { session }: Ctx) {
  if (!session.userId) return null
  const portfolios = await db.portfolio.findMany({
    where: { userId: session.userId },
    select: { id: true, name: true, data: true, updatedAt: true },
  })
  return portfolios
}

import { Ctx } from "blitz"
import db from "db"

export default async function getLatestPortfolio(_ = null, { session }: Ctx) {
  if (!session.userId) return null
  const portfolios = await db.portfolio.findMany({
    where: { userId: session.userId },
    select: { id: true, name: true, data: true },
    orderBy: {
      updatedAt: "desc",
    },
    take: 1,
  })
  return portfolios[0]
}

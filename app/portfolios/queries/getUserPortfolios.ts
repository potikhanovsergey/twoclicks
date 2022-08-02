import { Ctx } from "blitz"
import db, { Prisma } from "db"

interface getUserPortfoliosInput
  extends Pick<Prisma.PortfolioFindManyArgs, "where" | "orderBy" | "select"> {}

export default async function getUserPortfolios(input: getUserPortfoliosInput, { session }: Ctx) {
  if (!session.userId) return null
  const portfolios = await db.portfolio.findMany({
    where: { userId: session.userId },
    select: { id: true, name: true, data: true, updatedAt: true },
    orderBy: input.orderBy,
  })
  return portfolios
}

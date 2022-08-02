import { Session, SessionModel } from "@blitzjs/auth"
import { Ctx } from "blitz"
import db, { Prisma } from "db"

interface getUserPortfoliosInput
  extends Pick<Prisma.PortfolioFindManyArgs, "where" | "orderBy" | "select"> {}

export default async function getUserPortfolios(
  input: getUserPortfoliosInput | null,
  { session }: { session: SessionModel }
) {
  if (!session.userId) return null
  const portfolios = await db.portfolio.findMany({
    where: { userId: session.userId },
    orderBy: input?.orderBy,
  })
  return portfolios
}

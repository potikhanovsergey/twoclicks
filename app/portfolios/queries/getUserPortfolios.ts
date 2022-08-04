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

  try {
    const portfolios = await db.portfolio.findMany({
      where: { userId: session.userId },
      orderBy: input?.orderBy,
    })
    return portfolios
  } catch (e) {
    console.log("Get user portfolios error", e)
    return null
  }
}

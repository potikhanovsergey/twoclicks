import { Ctx } from "blitz"
import db, { Portfolio, Prisma } from "db"

export default async function togglePortfolioPublished(
  input: { id: string; isPublished: boolean },
  ctx: Ctx
) {
  ctx.session.$isAuthorized()
  const { id, isPublished } = input

  try {
    const portfolio = await db.portfolio.update({
      where: {
        id,
      },
      data: {
        isPublished,
      },
    })
    return portfolio
  } catch (e) {
    console.log("Update portfolio error", e)
  }
}

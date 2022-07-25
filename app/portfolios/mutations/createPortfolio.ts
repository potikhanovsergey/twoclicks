import { Ctx } from "blitz"
import db from "db"
import { PortfolioStarterMock } from "db/mocks"
import { deflate } from "helpers"

export default async function createPortfolio(data: { firstTime?: boolean }, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { firstTime } = data
  const userId = ctx.session.userId as string
  const portfolio = await db.portfolio.create({
    data: {
      userId,
      name: PortfolioStarterMock.name,
      data: deflate(PortfolioStarterMock.data),
    },
  })
  if (firstTime) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasCreatedPortfolio: true,
      },
    })
  }
  return portfolio
}

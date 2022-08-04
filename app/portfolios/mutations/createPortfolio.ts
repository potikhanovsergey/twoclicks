import { Ctx } from "blitz"
import db, { BuildingBlock } from "db"
import { deflate } from "helpers"

export default async function createPortfolio(
  data: { firstTime?: boolean; data: BuildingBlock[]; name: string; id: string },
  ctx: Ctx
) {
  ctx.session.$isAuthorized()
  const { firstTime } = data
  const userId = ctx.session.userId as string
  const portfolio = await db.portfolio.create({
    data: {
      id: data.id,
      userId,
      name: data.name,
      data: deflate(data.data),
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

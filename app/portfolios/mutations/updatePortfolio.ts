import { Ctx } from "blitz"
import db, { Portfolio } from "db"

export type IUpdatePortfolio = Pick<Portfolio, "data" | "name" | "id">

export default async function updatePortfolio(input: IUpdatePortfolio, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { name, data, id } = input
  try {
    const portfolio = await db.portfolio.update({
      where: {
        id,
      },
      data: {
        name,
        data,
      },
    })
    return portfolio
  } catch (e) {
    console.log("Update portfolio error", e)
  }
}

import { Ctx } from "blitz"
import db, { Portfolio } from "db"

export type IDeletePortfolio = Pick<Portfolio, "id">

export default async function deletePortfolio(input: IDeletePortfolio, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { id } = input
  try {
    const portfolio = await db.portfolio.delete({
      where: {
        id,
      },
    })
    return portfolio
  } catch (e) {
    console.log("Delete portfolio error", e)
    return null
  }
}

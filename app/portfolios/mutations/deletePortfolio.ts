import { Ctx } from "blitz"
import db, { Page } from "db"

export type IDeletePortfolio = Pick<Page, "id">

export default async function deletePortfolio(input: IDeletePortfolio, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { id } = input
  try {
    const portfolio = await db.page.delete({
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

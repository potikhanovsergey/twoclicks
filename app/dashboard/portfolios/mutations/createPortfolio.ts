import { Ctx } from "blitz"
import db from "db"

export default async function CreatePortfolio(input, ctx: Ctx) {
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const portfolio = await db.portfolio.create({ data: input })
  return portfolio
}

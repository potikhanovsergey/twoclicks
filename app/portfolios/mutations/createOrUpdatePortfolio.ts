import { Ctx } from "blitz"
import db, { Page } from "db"
import { deflate } from "helpers"
import { IPage } from "types"

export type ICreateOrUpdatePortfolio = Pick<IPage, "data" | "name" | "id">

export default async function createOrUpdatePortfolio(input: ICreateOrUpdatePortfolio, ctx) {
  ctx.session.$isAuthorized()
  const { name, data, id } = input
  try {
    if (ctx.session.userId) {
      const portfolio = await db.page.upsert({
        where: {
          id,
        },
        update: {},
        create: {
          userId: ctx.session.userId,
          id,
          name,
          data: deflate(data),
        },
      })
      return portfolio
    }
    return null
  } catch (e) {
    console.log("Update portfolio error", e)

    return null
  }
}

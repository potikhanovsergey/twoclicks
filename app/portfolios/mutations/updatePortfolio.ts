import { Ctx } from "blitz"
import db, { Portfolio, Prisma } from "db"

export type IUpdatePortfolio = Partial<Pick<Portfolio, "data" | "name" | "id" | "palette">>

export default async function updatePortfolio(input: IUpdatePortfolio, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { name, data, id } = input
  const palette = input.palette as Prisma.JsonObject
  try {
    if (id) {
      const portfolio = await db.portfolio.update({
        where: {
          id,
        },
        data: {
          name,
          data,
          palette,
        },
      })
      return portfolio
    }
  } catch (e) {
    console.log("Update portfolio error", e)
  }
}

import { Ctx } from "blitz"
import db, { Page, Prisma } from "db"

export type IUpdatePage = Partial<Pick<Page, "data" | "name" | "id" | "palette">>

export default async function updatePage(input: IUpdatePage, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { name, data, id } = input
  const palette = input.palette as Prisma.JsonObject
  try {
    if (id) {
      const page = await db.page.update({
        where: {
          id,
        },
        data: {
          name,
          data,
          palette,
        },
      })
      return page
    }
  } catch (e) {
    console.log("Update page error", e)
  }
}

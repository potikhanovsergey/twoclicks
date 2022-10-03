import { Ctx } from "blitz"
import db, { Page, Prisma } from "db"

export type IUpdatePage = Partial<Pick<Page, "data" | "name" | "id" | "palette" | "theme">>

export default async function updatePage(input: IUpdatePage, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { name, data, id, theme } = input
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
          theme,
        },
      })
      return page
    }
  } catch (e) {
  }
}

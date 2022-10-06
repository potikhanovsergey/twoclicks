import { Ctx } from "blitz"
import db, { Page, Prisma } from "db"
import { IThemeSettings } from "types"

export type IUpdatePage = Partial<
  Pick<Page, "data" | "name" | "id" | "theme"> & { themeSettings?: IThemeSettings }
>

export default async function updatePage(input: IUpdatePage, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { name, data, id, theme } = input
  const themeSettings = input.themeSettings as unknown as Prisma.JsonObject
  try {
    if (id) {
      const page = await db.page.update({
        where: {
          id,
        },
        data: {
          name,
          data,
          theme,
          themeSettings,
        },
      })
      return page
    }
  } catch (e) {}
}

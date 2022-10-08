import { Ctx } from "blitz"
import db, { Page } from "db"

export type IUpdatePage = Partial<Page>

export default async function updatePage(input: IUpdatePage, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { id, ...data } = input
  try {
    if (id) {
      const page = await db.page.update({
        where: {
          id,
        },
        data,
      })
      return page
    }
  } catch (e) {}
}

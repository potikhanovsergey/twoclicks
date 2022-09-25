import { Ctx } from "blitz"
import db, { Page } from "db"

export type IDeletePage = Pick<Page, "id">

export default async function deletePage(input: IDeletePage, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const { id } = input
  try {
    const page = await db.page.delete({
      where: {
        id,
      },
    })
    return page
  } catch (e) {
    console.log("Delete page error", e)
    return null
  }
}

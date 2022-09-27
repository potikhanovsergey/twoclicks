import db, { Page } from "db"
import { deflate } from "helpers/utils"
import { IPage } from "types"

export type ICreateOrUpdatePage = Pick<IPage, "data" | "name" | "id">

export default async function createOrUpdatePage(input: ICreateOrUpdatePage, ctx) {
  ctx.session.$isAuthorized()
  const { name, data, id } = input
  try {
    if (ctx.session.userId) {
      const page = await db.page.upsert({
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
      return page
    }
    return null
  } catch (e) {
    console.log("Update page error", e)

    return null
  }
}

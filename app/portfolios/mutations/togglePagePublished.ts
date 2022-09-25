import { Ctx } from "blitz"
import db from "db"

export default async function togglePagePublished(
  input: { id: string; isPublished: boolean },
  ctx: Ctx
) {
  ctx.session.$isAuthorized()
  const { id, isPublished } = input

  try {
    const page = await db.page.update({
      where: {
        id,
      },
      data: {
        isPublished,
      },
    })
    return page
  } catch (e) {
    console.log("Update page error", e)
  }
}

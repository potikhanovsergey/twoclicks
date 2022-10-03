import { Ctx } from "blitz"
import db, { BuildingBlock, Page, Prisma } from "db"
import { deflate } from "helpers/utils"
import { ICanvasPalette } from "types"

export default async function createPage(
  data: Pick<Page, "name"> & {
    firstTime?: boolean
    data: BuildingBlock[] | string
    palette: ICanvasPalette
    id?: string
    isPublished?: boolean
  },
  ctx: Ctx
) {
  ctx.session.$isAuthorized()
  const { firstTime, palette = { primary: "violet" }, isPublished = false } = data
  const userId = ctx.session.userId as string
  try {
    const page = await db.page.create({
      data: {
        id: data.id,
        userId,
        name: data.name,
        data: typeof data.data === "string" ? data.data : deflate(data.data),
        isPublished,
        palette: palette as Prisma.InputJsonValue,
      },
    })
    if (firstTime) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          hasCreatedPage: true,
        },
      })
    }
    return page
  } catch (e) {
    return null
  }
}

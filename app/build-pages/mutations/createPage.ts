import { Ctx } from "blitz"
import db, { BuildingBlock, Page, Prisma } from "db"
import { deflate } from "helpers/utils"
import { defaultThemeSettings } from "store/build"
import { ICanvasPalette, IThemeSettings } from "types"

export default async function createPage(
  data: Pick<Page, "name"> & {
    firstTime?: boolean
    data: BuildingBlock[] | string
    themeSettings: IThemeSettings
    id?: string
    isPublished?: boolean
  },
  ctx: Ctx
) {
  ctx.session.$isAuthorized()
  const { firstTime, themeSettings = defaultThemeSettings, isPublished = false } = data
  const userId = ctx.session.userId as string
  try {
    const page = await db.page.create({
      data: {
        id: data.id,
        userId,
        name: data.name,
        data: typeof data.data === "string" ? data.data : deflate(data.data),
        isPublished,
        themeSettings: themeSettings as unknown as Prisma.InputJsonValue,
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

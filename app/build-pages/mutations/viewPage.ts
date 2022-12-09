import { Ctx } from "blitz"
import db, { Page } from "db"

export default async function viewPage(id: string, ctx: Ctx) {
  await db.page.update({
    where: { id },
    data: { views: { increment: 1 } },
  })
}

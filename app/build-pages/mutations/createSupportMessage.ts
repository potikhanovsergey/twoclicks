import db from "db"
import { IFormValues } from "pages/profile/support"

export default async function createSupportMessage(input: IFormValues, ctx) {
  ctx.session.$isAuthorized()

  if (ctx.session.userId) {
    const message = await db.supportMessage.create({
      data: {
        ...input,
        userId: ctx.session.userId,
      },
    })
    return message
  }

  return null
}

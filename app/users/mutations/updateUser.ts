import { Ctx } from "blitz"
import db, { Prisma, User } from "db"

export type IUpdateUser = Partial<User>

export default async function updateUser(input: Prisma.UserUpdateArgs, ctx: Ctx) {
  ctx.session.$isAuthorized()
  const user = db.user.update(input)
  return user
}

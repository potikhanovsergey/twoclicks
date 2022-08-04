import { NotFoundError, AuthenticationError } from "blitz"
import db from "db"
import { authenticateUser } from "./login"
import { resolver } from "@blitzjs/rpc"
import { SecurePassword } from "@blitzjs/auth"

export default resolver.pipe(
  resolver.authorize(),
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    ctx
  ) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId as string } })
    if (!user) throw new NotFoundError()

    try {
      await authenticateUser(user.email, currentPassword)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw new Error("Invalid Password")
      }
      throw error
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim())
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    return true
  }
)

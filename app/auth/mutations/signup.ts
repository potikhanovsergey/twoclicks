import db from "db"
import { SecurePassword } from "@blitzjs/auth"
import { Role } from "types"

export default async function signup(input, ctx) {
  const blitzContext = ctx

  const hashedPassword = await SecurePassword.hash((input.password as string) || "test-password")
  const email = (input.email as string) || "test" + Math.random() + "@test.com"
  const name = input.name as string
  const isEmailVerified = false as boolean

  const user = await db.user.create({
    data: { email, hashedPassword, role: "user", name, isEmailVerified, avatar: null },
    select: { id: true, name: true, email: true, role: true },
  })

  await blitzContext.session.$create({
    userId: user.id,
    role: user.role as Role,
    email: user.email as string,
    name: user.name as string,
    avatar: user.avatar as string | null,
  })

  return { userId: blitzContext.session.userId, ...user, email: input.email }
}

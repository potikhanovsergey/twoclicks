import db, { Role } from "db"
import { SecurePassword } from "@blitzjs/auth"

export default async function signup(input, ctx) {
  const blitzContext = ctx

  const hashedPassword = await SecurePassword.hash((input.password as string) || "test-password")
  const email = input.email as string
  const name = input.name as string
  const isEmailVerified = false as boolean

  // const emailExists = await db.user.findUnique({
  //   where: { email },
  // })

  // if (emailExists) {
  //   const error = new Error("This email already exists");
  // }

  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
      role: "USER",
      name,
      isEmailVerified,
      avatar: null,
    },
    select: { id: true, name: true, email: true, role: true, avatar: true },
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

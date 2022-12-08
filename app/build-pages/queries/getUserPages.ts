import { ClientSession } from "@blitzjs/auth"
import db, { Prisma } from "db"

interface getUserPagesInput extends Pick<Prisma.PageFindManyArgs, "where" | "orderBy" | "select"> {}

export default async function getUserPages(
  input: getUserPagesInput | null,
  { session }: { session: ClientSession }
) {
  if (!session.userId) return null

  try {
    const pages = await db.page.findMany({
      where: { ...input?.where, userId: session.userId },
      orderBy: input?.orderBy,
    })
    return pages
  } catch (e) {
    return null
  }
}

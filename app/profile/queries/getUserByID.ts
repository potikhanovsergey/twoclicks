import { Ctx } from "blitz"
import db from "db"

export default async function getUserByID({ id }: { id?: string }, ctx: Ctx) {
  if (!id) return null

  const isValidMongoID = isValidObjectID.test(id)

  try {
    const profile = await db.user.findFirst({
      where: {
        OR: [
          {
            customID: isValidMongoID ? undefined : id,
          },
          {
            id: isValidMongoID ? id : undefined,
          },
        ],
      },
    })
    return profile
  } catch (e) {
    return null
  }
}

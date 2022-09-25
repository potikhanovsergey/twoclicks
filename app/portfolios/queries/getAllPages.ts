import db, { Prisma } from "db"
import { paginate } from "blitz"

interface getUserPagesInput
  extends Pick<Prisma.PageFindManyArgs, "orderBy" | "skip" | "take" | "where"> {}

export default async function getAllPages({
  orderBy,
  skip = 0,
  take = 100,
  where,
}: getUserPagesInput) {
  const {
    items: pages,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.page.count({ where }),
    query: (paginateArgs) =>
      db.page.findMany({
        ...paginateArgs,
        orderBy,
        where,
        include: { user: { select: { name: true, email: true } } },
      }),
  })

  return {
    pages,
    nextPage,
    hasMore,
    count,
  }
}

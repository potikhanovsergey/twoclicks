import { paginate } from "blitz"
import db, { Prisma } from "db"

interface getSupportMessagesInput
  extends Pick<Prisma.SupportMessageFindManyArgs, "orderBy" | "where" | "skip" | "take"> {}

export default async function getSupportMessages({
  orderBy,
  where,
  skip = 0,
  take = 100,
}: getSupportMessagesInput) {
  const {
    items: supportMessages,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.supportMessage.count({ where }),
    query: (paginateArgs) => db.supportMessage.findMany({ orderBy, where, ...paginateArgs }),
  })

  return { supportMessages, nextPage, hasMore, count }
}

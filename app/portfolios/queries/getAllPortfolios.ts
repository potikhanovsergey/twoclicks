import db, { Prisma } from "db"
import { paginate } from "blitz"

interface getUserPortfoliosInput
  extends Pick<Prisma.PortfolioFindManyArgs, "orderBy" | "skip" | "take" | "where"> {}

// export default async function getAllPortfolios(input: getUserPortfoliosInput | null) {
//   try {
//     const portfolios = await db.portfolio.findMany({
//       orderBy: input?.orderBy,
//       include: { user: { select: { name: true, email: true } } },
//     })
//     return portfolios
//   } catch (e) {
//     console.log("Get portfolios error", e)
//     return null
//   }
// }
export default async function getAllPortfolios({
  orderBy,
  skip = 0,
  take = 100,
  where,
}: getUserPortfoliosInput) {
  const {
    items: portfolios,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.portfolio.count({ where }),
    query: (paginateArgs) =>
      db.portfolio.findMany({
        ...paginateArgs,
        orderBy,
        where,
        include: { user: { select: { name: true, email: true } } },
      }),
  })

  return {
    portfolios,
    nextPage,
    hasMore,
    count,
  }
}

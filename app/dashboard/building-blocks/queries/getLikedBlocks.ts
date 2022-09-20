import { paginate, Ctx } from "blitz"
import db from "db"
import { Prisma } from "@prisma/client"

interface GetLikedBlocksInput
  extends Pick<
    Prisma.LikedBlockFindManyArgs,
    "where" | "orderBy" | "skip" | "take" | "select" | "include"
  > {}

export default async function Get__ModelNames(input: GetLikedBlocksInput, ctx: Ctx) {
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: buildingBlocks,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip: input.skip,
    take: input.take,
    count: () => db.likedBlock.count({ where: input.where }),
    query: (paginateArgs) =>
      db.likedBlock.findMany({
        ...paginateArgs,
        where: input.where,
        orderBy: input.orderBy,
        select: input.select,
      }),
  })

  return {
    buildingBlocks,
    nextPage,
    hasMore,
    count,
  }
}

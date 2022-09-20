import { paginate, Ctx } from "blitz"
import db from "db"
import { Prisma } from "@prisma/client"

interface GetUsedBlocksInput
  extends Pick<
    Prisma.UsedBlockFindManyArgs,
    "where" | "orderBy" | "skip" | "take" | "select" | "include"
  > {}

export default async function getUsedBlocks(input: GetUsedBlocksInput, ctx: Ctx) {
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  if (ctx.session.userId) {
    const {
      items: buildingBlocks,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip: input.skip,
      take: input.take,
      count: () => db.usedBlock.count({ where: input.where }),
      query: (paginateArgs) =>
        db.usedBlock.findMany({
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

  return null
}

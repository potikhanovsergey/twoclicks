import { paginate, Ctx } from "blitz"
import db from "db"
import { Prisma } from "@prisma/client"
import { ICanvasBlock } from "types"

interface GetBuildingBlocksInput
  extends Pick<Prisma.BuildingBlockFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function Get__ModelNames(input: GetBuildingBlocksInput, ctx: Ctx) {
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
    count: () => db.buildingBlock.count({ where: input.where }),
    query: (paginateArgs) =>
      db.buildingBlock.findMany({
        ...paginateArgs,
        where: input.where,
        orderBy: input.orderBy,
      }),
  })

  return {
    buildingBlocks: buildingBlocks as ICanvasBlock[],
    nextPage,
    hasMore,
    count,
  }
}

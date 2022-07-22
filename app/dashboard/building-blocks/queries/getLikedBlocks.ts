import { paginate, Ctx } from "blitz"
import db from "db"
import { Prisma } from "@prisma/client"

interface GetBuildingBlocksInput
  extends Pick<Prisma.BuildingBlockFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function Get__ModelNames(input: GetBuildingBlocksInput, ctx: Ctx) {
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: likedBlocks,
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
        include: {
          buildingBlock: true,
        },
      }),
  })

  return {
    buildingBlocks: likedBlocks.map((likedBlock) => likedBlock.buildingBlock),
    nextPage,
    hasMore,
    count,
  }
}

import { Ctx } from "blitz";
import db from "db";
import { z } from "zod";

const CreateBuildingBlockInput = z.object({
  name: z.string(),
});

export default async function CreateBuildingBlock(input, ctx: Ctx) {
  CreateBuildingBlockInput.parse(input);
  ctx.session.$isAuthorized();

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const buildingBlock = await db.buildingBlock.create({ data: input });

  return buildingBlock;
}

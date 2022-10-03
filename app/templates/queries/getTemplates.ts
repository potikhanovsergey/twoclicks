import db, { Prisma } from "db"

interface getTemplatesInput
  extends Pick<Prisma.PageFindManyArgs, "orderBy" | "skip" | "where" | "select"> {}

export default async function getTemplates({
  orderBy,
  skip = 0,
  where,
  select,
}: getTemplatesInput) {
  const pages = await db.page.findMany({
    where: {
      template: "twoclicks",
    },
    orderBy,
    skip,
  })

  return pages
}

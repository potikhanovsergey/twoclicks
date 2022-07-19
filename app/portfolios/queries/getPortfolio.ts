import { Ctx } from "blitz"
import db from "db"

export default async function getPortfolio(_ = null, { session }: Ctx) {
  const portfolio = await db.portfolio.findFirst({
    where: { id: "62d69ef3f15ec4c8e3e9f603" },
    select: { id: true, name: true, data: true },
  })

  return portfolio
}

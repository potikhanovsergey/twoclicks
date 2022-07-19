import { Ctx } from "blitz"
import db from "db"

export default async function getPortfolio(_ = null, { session }: Ctx) {
  const portfolio = await db.portfolio.findFirst({
    where: { id: "62d6b8d220ba0fa6d5cea60f" },
    select: { id: true, name: true, data: true },
  })
  return portfolio
}

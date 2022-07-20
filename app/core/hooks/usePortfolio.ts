import { useQuery } from "@blitzjs/rpc"
import getPortfolio from "app/portfolios/queries/getPortfolio"

export const usePortfolio = () => {
  const portfolio = useQuery(getPortfolio, null)
  return portfolio
}

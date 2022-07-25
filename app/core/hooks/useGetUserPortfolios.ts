import { useQuery } from "@blitzjs/rpc"
import getUserPortfolios from "app/portfolios/queries/getUserPortfolios"

export const useGetUserPortfolios = () => {
  const [portfolios] = useQuery(getUserPortfolios, null, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  return portfolios
}

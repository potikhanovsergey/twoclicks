import { useQuery } from "@blitzjs/rpc"
import getUserPages from "app/portfolios/queries/getUserPages"

export const useGetUserPages = () => {
  const [pages] = useQuery(getUserPages, null, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  return pages
}

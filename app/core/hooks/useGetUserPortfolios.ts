import { useQuery } from "@blitzjs/rpc"
import getUserPages from "app/build-pages/queries/getUserPages"

export const useGetUserPages = () => {
  const [pages] = useQuery(getUserPages, null, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  return pages
}

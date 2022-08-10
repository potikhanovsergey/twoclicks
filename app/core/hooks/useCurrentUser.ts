import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null, { refetchOnWindowFocus: false })
  return user
}

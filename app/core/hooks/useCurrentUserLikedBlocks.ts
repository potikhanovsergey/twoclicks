import { useQuery } from "@blitzjs/rpc"
import getUserLikedBlocksIds from "app/liked-blocks/queries/getUserLikedBlocksIds"

export const useCurrentUserLikedBlocks = () => {
  const [likedBlocks, { isSuccess: isLikedBlocksSuccess, refetch }] = useQuery(
    getUserLikedBlocksIds,
    null,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )
  return {
    likedBlocks: likedBlocks ? likedBlocks.map((block) => block.buildingBlockId) : null,
    refetch,
    isSuccess: isLikedBlocksSuccess,
  }
}

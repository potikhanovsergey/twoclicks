import { useQuery } from "@blitzjs/rpc"
import getUserLikedBlocksIds from "app/building-blocks/queries/getUserLikedBlocksIds"

export const useCurrentUserLikedBlocks = () => {
  const [likedBlocks, { isSuccess: isLikedBlocksSuccess, refetch }] = useQuery(
    getUserLikedBlocksIds,
    null,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  )
  return {
    likedBlocks: likedBlocks ? likedBlocks.map((block) => block.buildingBlockId) : null,
    refetch,
    isSuccess: isLikedBlocksSuccess,
  }
}

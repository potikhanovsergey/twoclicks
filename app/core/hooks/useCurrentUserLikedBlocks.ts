import { useQuery } from "@blitzjs/rpc"
import getUserLikedBlocksIds from "app/liked-blocks/queries/getUserLikedBlocksIds"

export const useCurrentUserLikedBlocks = () => {
  const [likedBlocks, { isSuccess: isLikedBlocksSuccess, refetch }] = useQuery(
    getUserLikedBlocksIds,
    null
  )
  return {
    likedBlocks: isLikedBlocksSuccess ? likedBlocks.map((block) => block.buildingBlockId) : null,
    refetch,
    isSuccess: isLikedBlocksSuccess,
  }
}

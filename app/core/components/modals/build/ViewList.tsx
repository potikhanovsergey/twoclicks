import { useEffect, useMemo, useState } from "react"
// import { observer } from 'mobx-react-lite';
import { SimpleGrid, ScrollArea, LoadingOverlay, Pagination, createStyles } from "@mantine/core"
import ViewListItem from "./ViewListItem"
import { BuildingBlock } from "@prisma/client"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import getBuildingBlocks from "app/dashboard/building-blocks/queries/getBuildingBlocks"
import React from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { useSession } from "@blitzjs/auth"
import { useCurrentUserLikedBlocks } from "app/core/hooks/useCurrentUserLikedBlocks"

function isLiked(block, userId) {
  return block?.LikedBlocks?.some((b) => b.userId === userId)
}

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    padding: "10px 20px",
    gap: "10px",
    position: "relative",
  },
  scrollArea: { height: "100%", position: "relative", width: "100%" },
}))
interface IViewList {
  blocks: BuildingBlock[]
}

const ITEMS_PER_PAGE = 12

const ViewList = ({}: IViewList) => {
  const [activePage, setActivePage] = useState(1) // Mantine pagination starts with the index of "1"
  const [{ buildingBlocks, count: totalPages }, { isFetching }] = usePaginatedQuery(
    getBuildingBlocks,
    {
      orderBy: { id: "asc" },
      skip: ITEMS_PER_PAGE * (activePage - 1), // Backend pagination starts with the index of "0"
      take: ITEMS_PER_PAGE,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  )

  // const { likedBlocks, refetch: refetchLikedBlocks, isSuccess } = useCurrentUserLikedBlocks()
  const totalPaginationPages = useMemo(() => {
    return Math.ceil(totalPages / ITEMS_PER_PAGE)
  }, [totalPages])

  const [loadingOverlayVisible] = useDebouncedValue(isFetching, 2000)

  const { classes } = useStyles()
  const session = useSession()

  const handlePaginationChange = (page: number) => {
    setActivePage(page)
    // void refetchLikedBlocks()
  }

  console.log(buildingBlocks)

  return (
    <div className={classes.wrapper}>
      <LoadingOverlay visible={loadingOverlayVisible} />
      <ScrollArea className={classes.scrollArea}>
        <SimpleGrid cols={4}>
          {buildingBlocks.map((block, i) => (
            <ViewListItem
              block={{
                ...block,
                // liked: likedBlocks?.includes(block.id),
                liked: isLiked(block, session.userId),
              }}
              key={i}
              hasActions={Boolean(session.userId)}
            />
          ))}
        </SimpleGrid>
      </ScrollArea>
      <Pagination
        aria-label="Pagination"
        getItemAriaLabel={(page) => {
          switch (page) {
            case "prev":
              return "Go to the previous page"
            case "next":
              return "Go to the next page"
            case "first":
              return "Go to the first page"
            case "last":
              return "Go to the last page"
            default:
              return undefined
          }
        }}
        color="blue"
        total={totalPaginationPages}
        page={activePage}
        onChange={handlePaginationChange}
      />
    </div>
  )
}

export default ViewList

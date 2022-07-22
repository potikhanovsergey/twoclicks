import { useEffect, useMemo, useState } from "react"
// import { observer } from 'mobx-react-lite';
import {
  SimpleGrid,
  ScrollArea,
  LoadingOverlay,
  Pagination,
  createStyles,
  Skeleton,
  Loader,
} from "@mantine/core"
import ViewListItem from "./ViewListItem"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import getBuildingBlocks from "app/dashboard/building-blocks/queries/getBuildingBlocks"
import getLikedBlocks from "app/dashboard/building-blocks/queries/getLikedBlocks"
import React from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { useSession } from "@blitzjs/auth"
import { useCurrentUserLikedBlocks } from "app/core/hooks/useCurrentUserLikedBlocks"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    padding: "10px 0px",
    gap: "10px",
    position: "relative",
  },
  scrollArea: { height: "100%", position: "relative", width: "100%" },
  grid: {
    padding: "0 20px",
  },
}))
interface IViewList {
  type: string
}

const ITEMS_PER_PAGE = 12

const ViewList = ({ type }: IViewList) => {
  const [activePage, setActivePage] = useState(1) // Mantine pagination starts with the index of "1"
  const [{ buildingBlocks, count: totalBlocks }, { isFetching, refetch }] = usePaginatedQuery(
    type === "liked" ? getLikedBlocks : getBuildingBlocks,
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

  const { likedBlocks, refetch: refetchLikedBlocks, isSuccess } = useCurrentUserLikedBlocks()
  const totalPaginationPages = useMemo(() => {
    return Math.ceil(totalBlocks / ITEMS_PER_PAGE)
  }, [totalBlocks])

  const [loadingOverlayVisible] = useDebouncedValue(isFetching, 1000)
  const [debouncedTotalPages] = useDebouncedValue(totalPaginationPages, 500)

  const { classes } = useStyles()
  const session = useSession()

  const handlePaginationChange = async (page: number) => {
    setActivePage(page)
    void refetchLikedBlocks()
  }

  const { shouldRefetchLiked } = BuildStore
  useEffect(() => {
    if (shouldRefetchLiked && type === "liked") {
      void refetch()
      BuildStore.shouldRefetchLiked = false
    }
  }, [shouldRefetchLiked])

  useEffect(() => {
    if (debouncedTotalPages < activePage && debouncedTotalPages > 0) {
      setActivePage(debouncedTotalPages)
    }
  }, [debouncedTotalPages])
  return (
    <div className={classes.wrapper}>
      <LoadingOverlay visible={loadingOverlayVisible} />
      <ScrollArea className={classes.scrollArea}>
        <SimpleGrid cols={4} className={classes.grid}>
          {buildingBlocks.map((block) => (
            <ViewListItem
              block={block}
              liked={likedBlocks?.includes(block.id)}
              key={block.id}
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
        total={debouncedTotalPages}
        page={activePage}
        onChange={handlePaginationChange}
      />
    </div>
  )
}

export default observer(ViewList)

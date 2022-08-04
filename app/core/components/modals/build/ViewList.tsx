import { useEffect, useMemo, useState } from "react"
// import { observer } from 'mobx-react-lite';
import {
  SimpleGrid,
  ScrollArea,
  LoadingOverlay,
  Pagination,
  createStyles,
  Loader,
} from "@mantine/core"
import ViewListItem from "./ViewListItem"
import { usePaginatedQuery } from "@blitzjs/rpc"
import getBuildingBlocks from "app/dashboard/building-blocks/queries/getBuildingBlocks"
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
    padding: "10px 0 15px 0",
    gap: "10px",
    position: "relative",
    justifyContent: "space-between",
  },
  scrollArea: { position: "relative", width: "100%" },
  grid: {
    padding: "0 20px",
  },
}))
interface IViewList {
  type: string
}

const ITEMS_PER_PAGE = 12

const ViewList = ({ type }: IViewList) => {
  const session = useSession()
  const { shouldRefetchLiked, blockTypeFilter } = BuildStore
  const [activePage, setActivePage] = useState(1) // Mantine pagination starts with the index of "1"
  const [{ buildingBlocks, count: totalBlocks }, { isFetching, refetch, isLoading }] =
    usePaginatedQuery(
      getBuildingBlocks,
      {
        orderBy:
          type === "liked"
            ? {
                LikedBlocks: {
                  _count: "desc",
                },
              }
            : { updatedAt: "desc" },
        where: {
          filterType: blockTypeFilter !== "all" ? blockTypeFilter : undefined,
          LikedBlocks:
            type === "liked" && session.userId
              ? {
                  some: {
                    userId: {
                      equals: session.userId,
                    },
                  },
                }
              : undefined,
        },
        skip: ITEMS_PER_PAGE * (activePage - 1), // Backend pagination starts with the index of "0"
        take: ITEMS_PER_PAGE,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      }
    )

  const { likedBlocks, refetch: refetchLikedBlocks } = useCurrentUserLikedBlocks()
  const totalPaginationPages = useMemo(() => {
    return Math.ceil(totalBlocks / ITEMS_PER_PAGE)
  }, [totalBlocks])

  const [loadingOverlayVisible] = useDebouncedValue(isFetching, 1000)
  const [debouncedTotalPages] = useDebouncedValue(totalPaginationPages, 500)

  const { classes } = useStyles()

  const handlePaginationChange = async (page: number) => {
    setActivePage(page)
  }

  useEffect(() => {
    if (shouldRefetchLiked && type === "liked") {
      void refetch()
      void refetchLikedBlocks()
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
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  )
}

export default observer(ViewList)

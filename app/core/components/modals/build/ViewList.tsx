import { useEffect, useMemo, useState } from "react"
// import { observer } from 'mobx-react-lite';
import { SimpleGrid, ScrollArea, Pagination, createStyles, Loader } from "@mantine/core"
import ViewListItem from "./ViewListItem"
import { usePaginatedQuery } from "@blitzjs/rpc"
import getBuildingBlocks from "app/dashboard/building-blocks/queries/getBuildingBlocks"
import getUsedBlocks from "app/dashboard/building-blocks/queries/getUsedBlocks"
import getLikedBlocks from "app/dashboard/building-blocks/queries/getLikedBlocks"
import React from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { useSession } from "@blitzjs/auth"
import { useCurrentUserLikedBlocks } from "app/core/hooks/useCurrentUserLikedBlocks"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"
import { ICanvasModalType } from "types"

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
  modalType: ICanvasModalType
}

const ITEMS_PER_PAGE = 12

const ViewList = ({ type, modalType }: IViewList) => {
  const session = useSession()
  const { shouldRefetchLiked, blockTypeFilter } = BuildStore
  const [activePage, setActivePage] = useState(1) // Mantine pagination starts with the index of "1"

  const [buildingBlocksData, { isFetching, refetch, isLoading, isRefetching }] = usePaginatedQuery(
    type === "used-before" ? getUsedBlocks : type === "liked" ? getLikedBlocks : getBuildingBlocks,
    type === "used-before" || type === "liked"
      ? {
          orderBy:
            type === "used-before"
              ? {
                  updatedAt: "desc",
                }
              : {
                  createdAt: "desc",
                },
          select: {
            buildingBlock: true,
          },
          where: {
            buildingBlock: {
              filterType: blockTypeFilter !== "all" ? blockTypeFilter : undefined,
            },
            userId: session.userId || "",
          },
          skip: ITEMS_PER_PAGE * (activePage - 1), // Backend pagination starts with the index of "0"
          take: ITEMS_PER_PAGE,
        }
      : {
          orderBy:
            type === "popular"
              ? {
                  UsedBlocks: {
                    _count: "desc",
                  },
                }
              : {
                  updatedAt: "desc",
                },
          where: {
            filterType: blockTypeFilter !== "all" ? blockTypeFilter : undefined,
            editType: modalType === "sections" ? "section" : "element",
          },
          skip: ITEMS_PER_PAGE * (activePage - 1), // Backend pagination starts with the index of "0"
          take: ITEMS_PER_PAGE,
        },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const { likedBlocks, refetch: refetchLikedBlocks } = useCurrentUserLikedBlocks()

  const totalPaginationPages = useMemo(() => {
    if (buildingBlocksData) return Math.ceil(buildingBlocksData?.count / ITEMS_PER_PAGE)
    return 0
  }, [buildingBlocksData])

  const [debouncedTotalPages] = useDebouncedValue(totalPaginationPages, 500)

  const { classes } = useStyles()

  const handlePaginationChange = async (page: number) => {
    setActivePage(page)
  }

  useEffect(() => {
    if (shouldRefetchLiked) {
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
    <>
      <ScrollArea className={classes.scrollArea}>
        <SimpleGrid cols={modalType === "components" ? 4 : 2} className={classes.grid}>
          {buildingBlocksData?.buildingBlocks.map((b, i) => {
            const block = b.buildingBlock ? b.buildingBlock : b
            return (
              <ViewListItem
                block={block}
                liked={likedBlocks?.includes(block.id)}
                key={`${block.id}`}
                hasActions={Boolean(session.userId)}
              />
            )
          })}
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
          total={debouncedTotalPages}
          page={activePage}
          onChange={handlePaginationChange}
        />
      )}
    </>
  )
}

export default observer(ViewList)

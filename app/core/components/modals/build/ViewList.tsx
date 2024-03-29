import { useEffect, useMemo, useState } from "react"
import { Pagination, createStyles, Loader, Box } from "@mantine/core"
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
import { ICanvasBlock, ICanvasModalType } from "types"
import dynamic from "next/dynamic"
import Masonry from "react-masonry-css"

const ViewListItem = dynamic(() => import("./ViewListItem"))

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    gap: "10px",
    position: "relative",
    justifyContent: "space-between",
  },
  // scrollArea: { position: "relative", width: "100%" },
  grid: {
    padding: "0 20px",
    display: "flex",
    width: "100%",
    // marginLeft: -12,
    // ".masonry-column": {
    //   paddingLeft: 12,
    // },
  },
}))
interface IViewList {
  type: string
  modalType: ICanvasModalType
}

const ITEMS_PER_PAGE = 50

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
              hidden: session.role === "ADMIN" ? undefined : false,
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
            hidden: session.role === "ADMIN" ? undefined : false,
          },
          skip: ITEMS_PER_PAGE * (activePage - 1), // Backend pagination starts with the index of "0"
          take: ITEMS_PER_PAGE,
        },
    {
      refetchOnWindowFocus: false,
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
      <Box
        component={Masonry}
        breakpointCols={2}
        className={classes.grid}
        columnClassName="masonry-column"
      >
        {buildingBlocksData?.buildingBlocks.map((b) => {
          const block: ICanvasBlock = b.buildingBlock ? b.buildingBlock : b
          return (
            <ViewListItem
              block={block}
              liked={likedBlocks?.includes(block.id)}
              key={`${block.id}`}
              hasActions={Boolean(session.userId)}
            />
          )
        })}
      </Box>
      {/* {isLoading ? (
        <Loader />
      ) : (
        <Pagination
          aria-label="Pagination"
          py="xs"
          sx={(theme) => ({
            marginTop: "auto",
            position: "sticky",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            left: "160px",
            right: 0,
          })}
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
      )} */}
    </>
  )
}

export default observer(ViewList)

import { useMemo, useState } from "react"
// import { observer } from 'mobx-react-lite';
import { SimpleGrid, ScrollArea, LoadingOverlay, Pagination, createStyles } from "@mantine/core"
import ViewListItem from "./ViewListItem"
import { BuildingBlock } from "@prisma/client"
import { usePaginatedQuery } from "@blitzjs/rpc"
import getBuildingBlocks from "app/dashboard/building-blocks/queries/getBuildingBlocks"
import React from "react"
import { useDebouncedValue } from "@mantine/hooks"

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

  const totalPaginationPages = useMemo(() => {
    return Math.ceil(totalPages / ITEMS_PER_PAGE)
  }, [totalPages])

  const [loadingOverlayVisible] = useDebouncedValue(isFetching, 500)

  const { classes } = useStyles()

  return (
    <div className={classes.wrapper}>
      <LoadingOverlay visible={loadingOverlayVisible} />
      <ScrollArea className={classes.scrollArea}>
        <SimpleGrid cols={4}>
          {buildingBlocks.map((block, i) => (
            <ViewListItem block={block} key={i} />
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
        onChange={setActivePage}
      />
    </div>
  )
}

export default ViewList

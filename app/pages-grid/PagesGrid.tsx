import { Box, SimpleGrid, Skeleton, createStyles } from "@mantine/core"
import { forwardRef, ReactNode } from "react"
import { VirtuosoGrid } from "react-virtuoso"
import PageCard, { PageCardProps } from "./PageCard"

interface PagesGridProps {
  pages: PageCardProps[]
}

const useStyles = createStyles((theme) => ({
  itemContainer: {
    // width: "calc((100% / var(--columns)) - var(--gap) + (var(--gap) / var(--columns)))", FORMULA
    width: "calc((100% / 3) - 32px + 32px / 3)",
    // display: "flex",
    // alignContent: "stretch",
  },
  listContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 32,
  },
}))

const PagesGrid = ({ pages }: PagesGridProps) => {
  const { classes } = useStyles()
  return (
    <VirtuosoGrid
      useWindowScroll
      totalCount={pages.length}
      itemClassName={classes.itemContainer}
      listClassName={classes.listContainer}
      // components={{
      //   ScrollSeekPlaceholder: ({ height, width, index }) => (
      //     <Box className={classes.itemContainer}>
      //       <Skeleton animate width="100%" height={220} radius="md" />
      //     </Box>
      //   ),
      // }}
      itemContent={(index) => <PageCard page={pages[index]} key={pages[index].id} />}
      // scrollSeekConfiguration={{
      //   enter: (velocity) => Math.abs(velocity) > 200,
      //   exit: (velocity) => Math.abs(velocity) < 30,
      // }}
    />
  )
}

export default PagesGrid

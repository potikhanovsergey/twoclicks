import { SimpleGrid } from "@mantine/core"
import { PageCardProps } from "./PageCard"
import FeedPageCard from "app/build-pages/FeedPageCard"

interface PagesGridProps {
  pages: PageCardProps[]
}

const PagesGrid = ({ pages }: PagesGridProps) => {
  return (
    <SimpleGrid spacing={32} cols={4}>
      {pages.map((page) => (
        <FeedPageCard page={page} key={page.id} />
      ))}
    </SimpleGrid>
  )
}

export default PagesGrid

import { SimpleGrid } from "@mantine/core"
import PageCard, { PageCardProps } from "./PageCard"

interface PagesGridProps {
  pages: PageCardProps[]
}

const PagesGrid = ({ pages }: PagesGridProps) => {
  return (
    <SimpleGrid cols={3} spacing={32}>
      {pages.map((p) => (
        <PageCard page={p} key={p.id} />
      ))}
    </SimpleGrid>
  )
}

export default PagesGrid

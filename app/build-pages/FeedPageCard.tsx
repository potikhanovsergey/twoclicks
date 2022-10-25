import FeedPageCardBottom from "app/pages-grid/FeedPageCardBottom"
import PageCard, { PageCardProps } from "app/pages-grid/PageCard"

const FeedPageCard = ({ page }: { page: PageCardProps }) => {
  return (
    <PageCard
      href={`/pages/${page.id}`}
      openInNewTab
      bottomText={page.name}
      bottomNode={<FeedPageCardBottom page={page} />}
    />
  )
}

export default FeedPageCard

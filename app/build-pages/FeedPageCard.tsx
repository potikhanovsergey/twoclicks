import FeedPageCardBottom from "app/pages-grid/FeedPageCardBottom"
import PageCard, { PageCardProps } from "app/pages-grid/PageCard"

const FeedPageCard = ({ page }: { page: PageCardProps }) => {
  return <PageCard page={page} bottomNode={<FeedPageCardBottom page={page} />} />
}

export default FeedPageCard

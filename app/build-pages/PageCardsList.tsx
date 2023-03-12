import { SimpleGrid } from "@mantine/core"
import PageCardOptions from "app/pages-grid/PageCardOptions"
import { observer } from "mobx-react-lite"
import PageCard from "app/pages-grid/PageCard"
import { Page, User } from "@prisma/client"

interface PageCardsListProps {
  pages: Page[]
  user: User
}

const PageCardsList = observer(({ pages, user }: PageCardsListProps) => {
  return (
    <SimpleGrid cols={4} spacing={32}>
      {pages.map((page) => {
        const pageWithUser = { ...page, user: { name: user?.name, avatar: user?.avatar } }
        return (
          <PageCard
            href={`/build/${page.id}`}
            bottomText={page.name}
            key={page.id}
            options={<PageCardOptions page={pageWithUser} />}
          />
        )
      })}
    </SimpleGrid>
  )
})

export default PageCardsList

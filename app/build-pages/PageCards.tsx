import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { SimpleGrid, Skeleton } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { AppStore } from "store"
// import PageCard from "./PageCard"
import getUserPages from "./queries/getUserPages"
import PageCard from "app/pages-grid/PageCard"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import PageCardOptions from "app/pages-grid/PageCardOptions"

const PageCardsItems = observer(() => {
  const { pages } = AppStore
  const user = useCurrentUser()

  return pages && user ? (
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
  ) : (
    <></>
  )
})

const PageCards = observer(() => {
  const { setPages, havePagesLoaded } = AppStore
  const session = useSession()

  const [fetchedPages, { isLoading, isFetching, isRefetching }] = useQuery(
    getUserPages,
    {
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    },
    {
      enabled: !AppStore.havePagesLoaded,
    }
  )

  useEffect(() => {
    if (fetchedPages && session.userId && !havePagesLoaded) {
      setPages(fetchedPages)
    }
    if (!session.userId) setPages([])
  }, [fetchedPages, session, havePagesLoaded])

  return isLoading || isFetching || isRefetching ? (
    <Skeleton width="100%" height="120px" animate />
  ) : (
    <PageCardsItems />
  )
})

export default PageCards

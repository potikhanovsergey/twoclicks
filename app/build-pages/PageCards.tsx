import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { Skeleton } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { AppStore } from "store"
import PageCard from "./PageCard"
import getUserPages from "./queries/getUserPages"
import { AnimatePresence } from "framer-motion"

const PageCardsItems = observer(() => {
  const { pages } = AppStore

  return pages ? (
    <AnimatePresence>
      <ul style={{ padding: 0, margin: 0 }}>
        {pages.map((page) => (
          <PageCard page={page} key={page.id} />
        ))}
      </ul>
    </AnimatePresence>
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

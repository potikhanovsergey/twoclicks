import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { AppStore } from "store"
import getUserPages from "./queries/getUserPages"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Prisma } from "@prisma/client"
import PageCardsList from "./PageCardsList"

interface PageCardsProps {
  where?: Prisma.PageFindManyArgs["where"]
}

const PageCards = ({ where }: PageCardsProps) => {
  const { setPages, havePagesLoaded } = AppStore
  const session = useSession()
  const user = useCurrentUser()

  const [fetchedPages, { isLoading, isFetching, isRefetching }] = useQuery(
    getUserPages,
    {
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      where,
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

  return !user ? <></> : <PageCardsList user={user} pages={AppStore.pages} />
}

export default observer(PageCards)

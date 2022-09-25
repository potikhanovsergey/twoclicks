import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { createStyles, Loader, Skeleton } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { AppStore } from "store"
import PortfolioCard from "./PortfolioCard"
import getUserPortfolios from "./queries/getUserPortfolios"
import { AnimatePresence, m } from "framer-motion"

const PortfolioCardsItems = observer(() => {
  const { pages } = AppStore

  return pages ? (
    <AnimatePresence>
      <ul style={{ padding: 0, margin: 0 }}>
        {pages.map((portfolio) => (
          <PortfolioCard portfolio={portfolio} key={portfolio.id} />
        ))}
      </ul>
    </AnimatePresence>
  ) : (
    <></>
  )
})

const PortfolioCards = observer(() => {
  const { setPages, havePagesLoaded } = AppStore
  const session = useSession()

  const [fetchedPortfolios, { isLoading, isFetching, isRefetching }] = useQuery(
    getUserPortfolios,
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
    if (fetchedPortfolios && session.userId && !havePagesLoaded) {
      setPages(fetchedPortfolios)
    }
    if (!session.userId) setPages([])
  }, [fetchedPortfolios, session, havePagesLoaded])

  return isLoading || isFetching || isRefetching ? (
    <Skeleton width="100%" height="120px" animate />
  ) : (
    <PortfolioCardsItems />
  )
})

export default PortfolioCards

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
  const { portfolios } = AppStore

  return portfolios ? (
    <AnimatePresence>
      <ul style={{ padding: 0, margin: 0 }}>
        {portfolios.map((portfolio) => (
          <PortfolioCard portfolio={portfolio} key={portfolio.id} />
        ))}
      </ul>
    </AnimatePresence>
  ) : (
    <></>
  )
})

const PortfolioCards = observer(() => {
  const { setPortfolios, havePortfoliosLoaded } = AppStore
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
      enabled: !AppStore.havePortfoliosLoaded,
    }
  )

  useEffect(() => {
    if (fetchedPortfolios && session.userId && !havePortfoliosLoaded) {
      setPortfolios(fetchedPortfolios)
    }
    if (!session.userId) setPortfolios([])
  }, [fetchedPortfolios, session, havePortfoliosLoaded])

  return isLoading || isFetching || isRefetching ? (
    <Skeleton width="100%" height="120px" animate />
  ) : (
    <PortfolioCardsItems />
  )
})

export default PortfolioCards

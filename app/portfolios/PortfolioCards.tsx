import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { createStyles, Loader, Skeleton } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { AppStore } from "store"
import PortfolioCard from "./PortfolioCard"
import getUserPortfolios from "./queries/getUserPortfolios"
import { AnimatePresence, motion } from "framer-motion"

const useStyles = createStyles((theme) => ({
  li: {
    listStyle: "none",
    ":not(:last-child)": { marginBottom: theme.spacing.md },
  },
}))

const PortfolioCardsItems = observer(() => {
  const { portfolios } = AppStore
  const { classes } = useStyles()

  return portfolios ? (
    <AnimatePresence>
      <ul style={{ padding: 0, margin: 0 }}>
        {portfolios.map((portfolio) => (
          <motion.li
            className={classes.li}
            key={portfolio.id}
            layout
            initial={{
              y: 45,
              x: 0,
              opacity: 0,
            }}
            animate={{
              y: 0,
              x: 0,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <PortfolioCard portfolio={portfolio} key={portfolio.id} />
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  ) : (
    <></>
  )
})

const PortfolioCards = observer(() => {
  const { setPortfolios } = AppStore
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
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      enabled: !AppStore.havePortfoliosLoaded,
    }
  )

  useEffect(() => {
    if (fetchedPortfolios && session.userId) {
      setPortfolios(fetchedPortfolios)
    }
    if (!session.userId) setPortfolios([])
  }, [fetchedPortfolios, session])

  return isLoading || isFetching || isRefetching ? (
    <Skeleton width="100%" height="120px" animate />
  ) : (
    <PortfolioCardsItems />
  )
})

export default PortfolioCards

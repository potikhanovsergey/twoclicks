import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { Loader, Skeleton } from "@mantine/core"
import { useDidMount } from "hooks/useDidMount"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { AppStore } from "store"
import PortfolioCard from "./PortfolioCard"
import getUserPortfolios from "./queries/getUserPortfolios"

const PortfolioCards = observer(() => {
  const { portfolios, setPortfolios } = AppStore
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
    }
  )

  useEffect(() => {
    if (fetchedPortfolios && session.userId) {
      setPortfolios(fetchedPortfolios)
    }
    if (!session.userId) setPortfolios([])
  }, [fetchedPortfolios, session])

  return isLoading ? (
    <Skeleton width="100%" height="120px" animate />
  ) : portfolios ? (
    <ul style={{ padding: 0, margin: 0 }}>
      {portfolios.map((portfolio) => (
        <PortfolioCard
          name={portfolio.name}
          id={portfolio.id}
          updatedAt={portfolio.updatedAt}
          key={portfolio.id}
        />
      ))}
    </ul>
  ) : (
    <></>
  )
})

export default PortfolioCards

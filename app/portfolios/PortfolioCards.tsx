import { useQuery } from "@blitzjs/rpc"
import { Button, useMantineTheme } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { AppStore } from "store"
import PortfolioCard, { PortfolioPreview } from "./PortfolioCard"
import getUserPortfolios from "./queries/getUserPortfolios"

const PortfolioCards = observer(() => {
  const { portfolios } = AppStore
  return portfolios ? (
    <div>
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
    </div>
  ) : (
    <></>
  )
})

export default PortfolioCards

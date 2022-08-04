import { observer } from "mobx-react-lite"
import { AppStore } from "store"
import PortfolioCard from "./PortfolioCard"

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

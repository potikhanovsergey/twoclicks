import { useQuery } from "@blitzjs/rpc"
import { Button, useMantineTheme } from "@mantine/core"
import PortfolioCard, { PortfolioPreview } from "./PortfolioCard"
import getUserPortfolios from "./queries/getUserPortfolios"

const PortfolioCards = ({ portfolios }: { portfolios: PortfolioPreview[] }) => {
  const theme = useMantineTheme()
  return portfolios ? (
    <div>
      {/* <Button
        fullWidth
        style={{ height: "120px" }}
        mb="md"
        size="xl"
        sx={(theme) => ({
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
          ":hover": {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
          },
        })}
      >
        Create new one +
      </Button> */}
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
}

export default PortfolioCards

import { Container, Group, Space, Title, Text } from "@mantine/core"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import PortfolioCards from "app/portfolios/PortfolioCards"
import ProfileNoItems from "app/profile/ProfileNoItems"
import useTranslation from "next-translate/useTranslation"
import { AppStore } from "store"
import { observer } from "mobx-react-lite"
import CreatePortfolioButton from "app/portfolios/CreatePortfolioButton"

const Build = () => {
  const { t } = useTranslation("pages")
  const { portfolios, havePortfoliosLoaded } = AppStore
  return (
    <Container size="xl" style={{ height: "100%" }} py={16}>
      {havePortfoliosLoaded && portfolios?.length ? (
        <>
          <Group position="apart" align="center">
            <Title order={1}>{t("title")}</Title>
            <CreatePortfolioButton size="sm" />
          </Group>
          <Space h="xl" />
        </>
      ) : (
        <></>
      )}
      <div style={{ display: portfolios?.length ? "block" : "none" }}>
        <PortfolioCards />
      </div>
      {havePortfoliosLoaded && !portfolios?.length ? (
        <ProfileNoItems style={{ display: portfolios?.length ? "none" : "flex" }}>
          <Text size="xl">{t("noPortfolios")}</Text>
          Тут был лотти
          <CreatePortfolioButton size="lg" />
        </ProfileNoItems>
      ) : (
        <></>
      )}
    </Container>
  )
}

Build.getLayout = getBaseLayout({})
Build.suppressFirstRenderFlicker = true

export default observer(Build)

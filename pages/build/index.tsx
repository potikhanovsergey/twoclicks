import { Container, Group, Space, Title, Text } from "@mantine/core"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import ProfileNoItems from "app/profile/ProfileNoItems"
import useTranslation from "next-translate/useTranslation"
import { AppStore } from "store"
import { observer } from "mobx-react-lite"
import CreatePageButton from "app/portfolios/CreatePageButton"
import PageCards from "app/portfolios/PageCards"

const Build = () => {
  const { t } = useTranslation("pages")
  const { pages, havePagesLoaded } = AppStore
  return (
    <Container size="xl" style={{ height: "100%" }} py={16}>
      {havePagesLoaded && pages?.length ? (
        <>
          <Group position="apart" align="center">
            <Title order={1}>{t("title")}</Title>
            <CreatePageButton size="sm" />
          </Group>
          <Space h="xl" />
        </>
      ) : (
        <></>
      )}
      <div style={{ display: pages?.length ? "block" : "none" }}>
        <PageCards />
      </div>
      {havePagesLoaded && !pages?.length ? (
        <ProfileNoItems style={{ display: pages?.length ? "none" : "flex" }}>
          <Text size="xl">{t("noPages")}</Text>
          Тут был лотти
          <CreatePageButton size="lg" />
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

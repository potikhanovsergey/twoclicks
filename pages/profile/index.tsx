import { Title, Text, Space, Group, Container } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import React from "react"
import ProfileNoItems from "app/profile/ProfileNoItems"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"
import { BlitzPage } from "@blitzjs/auth"
import PortfolioCards from "app/portfolios/PortfolioCards"
import { AppStore } from "store"
import { observer } from "mobx-react-lite"
import CreatePageButton from "app/portfolios/CreatePortfolioButton"

const ProfilePortfolios: BlitzPage = observer(() => {
  const { t } = useTranslation("pages")
  const { pages, havePagesLoaded } = AppStore
  return (
    <Container size="xl" style={{ height: "100%" }}>
      <Group position="apart" align="center">
        <Title order={1}>{t("title")}</Title>
        {pages?.length ? <CreatePageButton size="sm" /> : <></>}
      </Group>
      <div style={{ display: pages?.length ? "block" : "none" }}>
        <Space h="xl" />
        <PortfolioCards />
      </div>
      {havePagesLoaded && (
        <ProfileNoItems style={{ display: pages?.length ? "none" : "flex" }}>
          <Text size="xl">{t("noPortfolios")}</Text>
          Тут был лотти
          <CreatePageButton size="lg" />
        </ProfileNoItems>
      )}
    </Container>
  )
})

ProfilePortfolios.getLayout = getProfileLayout()
ProfilePortfolios.suppressFirstRenderFlicker = true

export default ProfilePortfolios

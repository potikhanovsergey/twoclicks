import { Title, Text, Space, Group, Container } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import React from "react"
import ProfileNoItems from "app/profile/ProfileNoItems"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"
import { BlitzPage } from "@blitzjs/auth"
import PageCards from "app/build-pages/PageCards"
import { AppStore } from "store"
import { observer } from "mobx-react-lite"
import CreatePageButton from "app/build-pages/CreatePageButton"

const OldProfilePages: BlitzPage = observer(() => {
  const { t } = useTranslation("dashboardPages")
  const { pages, havePagesLoaded } = AppStore
  return (
    <Container size="xl" style={{ height: "100%" }}>
      <Group position="apart" align="center">
        <Title order={1}>{t("title")}</Title>
        {pages?.length ? <CreatePageButton size="sm" /> : <></>}
      </Group>
      <div style={{ display: pages?.length ? "block" : "none" }}>
        <Space h="xl" />
        <PageCards />
      </div>
      {havePagesLoaded && (
        <ProfileNoItems style={{ display: pages?.length ? "none" : "flex" }}>
          <Text size="xl" mb="xs">
            {t("noPages")}
          </Text>
          <CreatePageButton size="lg" />
        </ProfileNoItems>
      )}
    </Container>
  )
})

OldProfilePages.getLayout = getProfileLayout()
OldProfilePages.suppressFirstRenderFlicker = true

export default OldProfilePages

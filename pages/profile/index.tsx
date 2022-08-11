import { Player } from "@lottiefiles/react-lottie-player"
import { Title, Text, Space, Group, Container } from "@mantine/core"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { useEffect } from "react"
import { AiFillBuild } from "react-icons/ai"
import ProfileNoItems from "app/profile/ProfileNoItems"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"
import lottieSquirrel from "lotties/squirrel.json"
import { BlitzPage } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import getUserPortfolios from "app/portfolios/queries/getUserPortfolios"
import PortfolioCards from "app/portfolios/PortfolioCards"
import { AppStore } from "store"
import { observer } from "mobx-react-lite"
import CreatePortfolioButton from "app/portfolios/CreatePortfolioButton"

const ProfilePortfolios: BlitzPage = observer(() => {
  const { t } = useTranslation("pagesProfilePortfolios")
  const { portfolios, havePortfoliosLoaded } = AppStore
  return (
    <Container size="xl" style={{ height: "100%" }}>
      <Group position="apart" align="center">
        <Title order={1}>{t("title")}</Title>
        {portfolios?.length ? <CreatePortfolioButton size="sm" /> : <></>}
      </Group>
      <div style={{ display: portfolios?.length ? "block" : "none" }}>
        <Space h="xl" />
        <PortfolioCards />
      </div>
      {havePortfoliosLoaded && (
        <ProfileNoItems style={{ display: portfolios?.length ? "none" : "flex" }}>
          <Text size="xl">{t("noPortfolios")}</Text>
          <Player autoplay loop src={lottieSquirrel} style={{ height: "300px", width: "300px" }} />
          <CreatePortfolioButton size="lg" />
        </ProfileNoItems>
      )}
    </Container>
  )
})

ProfilePortfolios.getLayout = getProfileLayout()
ProfilePortfolios.suppressFirstRenderFlicker = true

export default ProfilePortfolios

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["pagesProfilePortfolios", "common"])),
    },
  }
}

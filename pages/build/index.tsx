import { Container, createStyles, Group, Space, Title, Text, Loader, Center } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Suspense, useEffect } from "react"
// import { useTranslation } from 'next-i18next';
import { Ctx } from "@blitzjs/next"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Player } from "@lottiefiles/react-lottie-player"
import PortfolioCards from "app/portfolios/PortfolioCards"
import ProfileNoItems from "app/profile/ProfileNoItems"
import { AiFillBuild } from "react-icons/ai"
import { useQuery } from "@blitzjs/rpc"
import getUserPortfolios from "app/portfolios/queries/getUserPortfolios"
import { useTranslation } from "next-i18next"
import lottieSquirrel from "lotties/squirrel.json"
import { AppStore } from "store"
import { observer } from "mobx-react-lite"
import CreatePortfolioButton from "app/portfolios/CreatePortfolioButton"

const Build = () => {
  const { t } = useTranslation("pagesProfilePortfolios")
  const { portfolios } = AppStore
  return (
    <Container size="lg" style={{ height: "100%", paddingTop: "16px" }}>
      <div style={{ display: portfolios?.length ? "block" : "none" }}>
        <Group position="apart" align="center">
          <Title order={1}>{t("title")}</Title>
          <CreatePortfolioButton
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 110 }}
            size="sm"
            rightIcon={<AiFillBuild />}
          />
        </Group>
        <Space h="xl" />
        <Suspense fallback={<Loader />}>
          <PortfolioCards />
        </Suspense>
      </div>
      <ProfileNoItems style={{ display: portfolios?.length ? "none" : "block", height: "100%" }}>
        <Text size="xl">{t("noPortfolios")}</Text>
        <Player autoplay loop src={lottieSquirrel} style={{ height: "300px", width: "300px" }} />
        <CreatePortfolioButton
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 110 }}
          size="lg"
          rightIcon={<AiFillBuild />}
        />
      </ProfileNoItems>
    </Container>
  )
}

Build.getLayout = getBaseLayout()
Build.suppressFirstRenderFlicker = true

export async function getStaticProps(ctx: Ctx & { locale: string }) {
  const { locale } = ctx
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild", "pagesProfilePortfolios"])),
    },
  }
}

export default observer(Build)

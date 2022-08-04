import { Container, createStyles, Group, Space, Title, Text } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect } from "react"
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

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colors.gray[1],
    color: theme.black,
    width: "100%",
    minHeight: "100vh",
    paddingTop: "var(--layout-header-height)",
  },
}))

const Build = () => {
  const { t } = useTranslation("pagesProfilePortfolios")
  const { portfolios, setPortfolios } = AppStore
  const [fetchedPortfolios] = useQuery(getUserPortfolios, {
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  })

  useEffect(() => {
    if (fetchedPortfolios) {
      setPortfolios(fetchedPortfolios)
    } else {
      setPortfolios([])
    }
  }, [fetchedPortfolios])
  return (
    <Container size="lg" style={{ height: "100%", paddingTop: "16px" }}>
      {portfolios?.length ? (
        <>
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
          <PortfolioCards />
        </>
      ) : (
        <ProfileNoItems>
          <Text size="xl">{t("noPortfolios")}</Text>
          <Player autoplay loop src={lottieSquirrel} style={{ height: "300px", width: "300px" }} />
          <CreatePortfolioButton
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 110 }}
            size="lg"
            rightIcon={<AiFillBuild />}
          />
        </ProfileNoItems>
      )}
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

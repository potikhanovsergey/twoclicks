import { Button, Container, createStyles, Group, Space, Title, Text } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
// import { useTranslation } from 'next-i18next';
import { Ctx } from "@blitzjs/next"
import { IPortfolio } from "types"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Player } from "@lottiefiles/react-lottie-player"
import PortfolioCards from "app/portfolios/PortfolioCards"
import ProfileNoItems from "app/profile/ProfileNoItems"
import Link from "next/link"
import { AiFillBuild } from "react-icons/ai"
import { useQuery } from "@blitzjs/rpc"
import getUserPortfolios from "app/portfolios/queries/getUserPortfolios"
import { useTranslation } from "next-i18next"
import lottieSquirrel from "lotties/squirrel.json"

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colors.gray[1],
    color: theme.black,
    width: "100%",
    minHeight: "100vh",
    paddingTop: "var(--build-header-height)",
  },
}))

const Build = ({ portfolio }: { portfolio: IPortfolio }) => {
  const { t } = useTranslation("pagesProfilePortfolios")
  const { classes } = useStyles()
  const [portfolios] = useQuery(getUserPortfolios, null)

  return (
    <Container size="lg" style={{ height: "100%", paddingTop: "16px" }}>
      {portfolios?.length ? (
        <>
          <Group position="apart" align="center">
            <Title order={1}>{t("title")}</Title>
            <Button
              component="a"
              variant="gradient"
              gradient={{ from: "grape", to: "indigo", deg: 110 }}
              size="sm"
              rightIcon={<AiFillBuild />}
            >
              Создать портфолио
            </Button>
          </Group>
          <Space h="xl" />
          <PortfolioCards portfolios={portfolios} />
        </>
      ) : (
        <ProfileNoItems>
          <Text size="xl">{t("noPortfolios")}</Text>
          <Player autoplay loop src={lottieSquirrel} style={{ height: "300px", width: "300px" }} />
          <Link href="/build" passHref>
            <Button
              component="a"
              variant="gradient"
              gradient={{ from: "grape", to: "indigo", deg: 110 }}
              size="lg"
              rightIcon={<AiFillBuild />}
            >
              Создать портфолио
            </Button>
          </Link>
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

export default Build

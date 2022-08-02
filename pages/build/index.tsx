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
import { Prisma } from "@prisma/client"
import ObjectID from "bson-objectid"
import db from "db"
import { PortfolioStarterMock } from "db/mocks"
import { deflate } from "helpers"
import { getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/router"

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

const Build = () => {
  const { t } = useTranslation("pagesProfilePortfolios")
  const { classes } = useStyles()
  const [portfolios] = useQuery(getUserPortfolios, null)
  const router = useRouter()
  const handleCreatePortfolio = () => {
    const portfolio = {
      id: ObjectID().toHexString(),
      name: "Brand new unauthorized portfolio",
      data: PortfolioStarterMock.data,
    }
    setCookie(`portfolio-${portfolio.id}`, deflate(portfolio))
    void router.push(`/build/${portfolio.id}`)
  }
  return (
    <Container size="lg" style={{ height: "100%", paddingTop: "16px" }}>
      {portfolios?.length ? (
        <>
          <Group position="apart" align="center">
            <Title order={1}>{t("title")}</Title>
            <Button
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
          <Button
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 110 }}
            size="lg"
            rightIcon={<AiFillBuild />}
            onClick={handleCreatePortfolio}
          >
            Создать портфолио
          </Button>
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

import { Player } from "@lottiefiles/react-lottie-player"
import { Button, Title, Text, Space, Group } from "@mantine/core"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"
import React, { ReactElement } from "react"
import { AiFillBuild } from "react-icons/ai"
import ProfileNoItems from "app/profile/ProfileNoItems"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"
import lottieSquirrel from "lotties/squirrel.json"
import { BlitzPage } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import getUserPortfolios from "app/portfolios/queries/getUserPortfolios"
import PortfolioCards from "app/portfolios/PortfolioCards"

const ProfilePortfolios: BlitzPage = () => {
  const { t } = useTranslation("pagesProfilePortfolios")
  const [portfolios] = useQuery(getUserPortfolios, null)
  return (
    <>
      <Group position="apart" align="center">
        <Title order={1}>{t("title")}</Title>
      </Group>
      {portfolios?.length ? (
        <>
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
    </>
  )
}
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

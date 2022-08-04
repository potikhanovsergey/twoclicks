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
import DeletePortfolioButton from "app/portfolios/DeletePortfolioButton"

const ProfilePortfolios: BlitzPage = observer(() => {
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
    <Container size="xl">
      <Group position="apart" align="center">
        <Title order={1}>{t("title")}</Title>
        {portfolios?.length ? (
          <DeletePortfolioButton
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 110 }}
            size="sm"
            rightIcon={<AiFillBuild />}
          />
        ) : (
          <></>
        )}
      </Group>
      {portfolios?.length ? (
        <>
          <Space h="xl" />
          <PortfolioCards />
        </>
      ) : (
        <ProfileNoItems>
          <Text size="xl">{t("noPortfolios")}</Text>
          <Player autoplay loop src={lottieSquirrel} style={{ height: "300px", width: "300px" }} />
          <DeletePortfolioButton
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 110 }}
            size="lg"
            rightIcon={<AiFillBuild />}
          />
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

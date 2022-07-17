import { Player } from "@lottiefiles/react-lottie-player"
import { Button, Title, Text } from "@mantine/core"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"
import React from "react"
import { AiFillBuild } from "react-icons/ai"
import ProfileNoItems from "app/profile/ProfileNoItems"
import ProfileLayout from "app/core/layouts/ProfileLayout"
import lottieSquirrel from "../../lotties/squirrel.json"

const ProfilePortfolios = () => {
  const { t } = useTranslation("pagesProfilePortfolios")
  return (
    <ProfileLayout>
      <Title order={1}>{t("title")}</Title>
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
            {t("createOne")}
          </Button>
        </Link>
      </ProfileNoItems>
    </ProfileLayout>
  )
}

ProfilePortfolios.suppressFirstRenderFlicker = true

export default ProfilePortfolios

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["pagesProfilePortfolios", "common"])),
    },
  }
}

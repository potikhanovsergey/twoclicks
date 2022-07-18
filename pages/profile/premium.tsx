import { Title } from "@mantine/core"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import ProfileLayout from "app/core/layouts/ProfileLayout"

const ProfilePremium = () => {
  const { t } = useTranslation("pagesProfilePremium")
  return (
    <ProfileLayout>
      <Title order={1}>{t("title")}</Title>
    </ProfileLayout>
  )
}

ProfilePremium.suppressFirstRenderFlicker = true
ProfilePremium.authenticate = { redirectTo: "/auth" }

export default ProfilePremium

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["pagesProfilePremium", "common"])),
    },
  }
}

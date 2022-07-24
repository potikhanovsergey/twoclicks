import { Title } from "@mantine/core"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"

const ProfilePremium = () => {
  const { t } = useTranslation("pagesProfilePremium")
  return (
    <>
      <Title order={1}>{t("title")}</Title>
    </>
  )
}

ProfilePremium.suppressFirstRenderFlicker = true
ProfilePremium.getLayout = getProfileLayout()

export default ProfilePremium

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["pagesProfilePremium", "common"])),
    },
  }
}

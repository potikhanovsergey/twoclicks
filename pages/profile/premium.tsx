import { Title } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import React from "react"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"

const ProfilePremium = () => {
  const { t } = useTranslation("premium")
  return (
    <>
      <Title order={1}>{t("title")}</Title>
    </>
  )
}

ProfilePremium.getLayout = getProfileLayout()
ProfilePremium.suppressFirstRenderFlicker = true

export default ProfilePremium

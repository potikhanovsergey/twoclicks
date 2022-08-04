import { Group, Container, Title, Stack, Text, Button, Image, MediaQuery } from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
// import { useTranslation } from 'next-i18next';
import BaseLayout from "app/core/layouts/BaseLayout"
import { AiOutlineArrowRight } from "react-icons/ai"
import FirstHero from "app/build/sections/FirstHero"

const ComponentsPage = () => {
  // const { t } = useTranslation('pagesBuild');
  return (
    <BaseLayout>
      <FirstHero />
    </BaseLayout>
  )
}

ComponentsPage.suppressFirstRenderFlicker = true

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
      // Will be passed to the page component as props
    },
  }
}

export default ComponentsPage

import { Group, Container, Title, Stack, Text, Button, Image, MediaQuery } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
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

export default ComponentsPage

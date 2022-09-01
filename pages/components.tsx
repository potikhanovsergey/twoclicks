import { Group, Container, Title, Stack, Text, Button, Image, Center } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import BaseLayout from "app/core/layouts/BaseLayout"
import IconPicker from "app/core/components/base/IconPicker"
import { FaHeart } from "react-icons/fa"
import FirstHero from "app/build/sections/FirstHero"

const ComponentsPage = () => {
  // const { t } = useTranslation('pagesBuild');
  return (
    <BaseLayout>
      <Center style={{ height: "100%" }}>
        <IconPicker icon={<FaHeart />} onChange={() => 1} />
      </Center>
      <FirstHero />
    </BaseLayout>
  )
}

ComponentsPage.suppressFirstRenderFlicker = true

export default ComponentsPage

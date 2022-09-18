import { Center } from "@mantine/core"
import BaseLayout from "app/core/layouts/BaseLayout"
import IconPicker from "app/core/components/base/IconPicker"
import FirstHero from "app/build/sections/FirstHero"

import { FaHeart } from "@react-icons/all-files/fa/FaHeart"

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

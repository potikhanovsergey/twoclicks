import { Center } from "@mantine/core"
import BaseLayout from "app/core/layouts/BaseLayout"
import IconPicker from "app/core/components/base/IconPicker"
import FirstHeroVideo from "app/build/sections/FirstHeroVideo"

import { FaHeart } from "@react-icons/all-files/fa/FaHeart"
import ButtonGroup from "app/core/components/base/ButtonGroup"

const ComponentsPage = () => {
  return (
    <BaseLayout>
      <Center style={{ height: "100%" }}>
        <IconPicker icon={<FaHeart />} onChange={() => 1} />
      </Center>
      <FirstHeroVideo />
    </BaseLayout>
  )
}

ComponentsPage.suppressFirstRenderFlicker = true

export default ComponentsPage

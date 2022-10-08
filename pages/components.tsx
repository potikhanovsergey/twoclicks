import { Center } from "@mantine/core"
import BaseLayout from "app/core/layouts/BaseLayout"
import IconPicker from "app/core/components/base/IconPicker"

import { FaHeart } from "@react-icons/all-files/fa/FaHeart"
import FloatingTitleFeatures from "app/build/sections/features/FloatingTitleFeatures"
import CardHero from "app/build/sections/hero/CardHero"

const ComponentsPage = () => {
  return (
    <BaseLayout>
      <CardHero />
    </BaseLayout>
  )
}

ComponentsPage.suppressFirstRenderFlicker = true

export default ComponentsPage

import { Center } from "@mantine/core"
import BaseLayout from "app/core/layouts/BaseLayout"
import IconPicker from "app/core/components/base/IconPicker"

import { FaHeart } from "@react-icons/all-files/fa/FaHeart"
import FloatingTitleFeatures from "app/build/sections/features/FloatingTitleFeatures"

const ComponentsPage = () => {
  return (
    <BaseLayout>
      <Center style={{ height: "100%" }}>
        <IconPicker icon={<FaHeart />} onChange={() => 1} />
      </Center>
      <FloatingTitleFeatures />
      <FloatingTitleFeatures />
    </BaseLayout>
  )
}

ComponentsPage.suppressFirstRenderFlicker = true

export default ComponentsPage

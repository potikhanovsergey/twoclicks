import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Space } from "@mantine/core"
import HomeHero from "app/home/HomeHero"
const Home = () => {
  return (
    <>
      <Space h={16} />
      <HomeHero />
      <HomeHero />
      <HomeHero />
      <HomeHero />
      <HomeHero />
      <HomeHero />
      <Space h={72} />
    </>
  )
}

Home.getLayout = getBaseLayout({})
Home.suppressFirstRenderFlicker = true

export default Home

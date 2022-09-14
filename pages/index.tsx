import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Space } from "@mantine/core"
import HomeHero from "app/home/HomeHero"
import Benefits from "app/home/Benefits"
import WhoIsThisFor from "app/home/WhoIsThisFor"
const Home = () => {
  return (
    <>
      <Space h={16} />
      <HomeHero />
      <Benefits />
      <Space h={128} />

      <WhoIsThisFor />
      <Space h={72} />
      <Space h={72} />
      <Space h={72} />
      <Space h={72} />
      <Space h={72} />
    </>
  )
}

Home.getLayout = getBaseLayout({})
Home.suppressFirstRenderFlicker = true

export default Home

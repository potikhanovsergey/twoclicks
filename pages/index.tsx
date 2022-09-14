import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Space } from "@mantine/core"
import HomeHero from "app/home/HomeHero"
import Benefits from "app/home/Benefits"
import WhoIsThisFor from "app/home/WhoIsThisFor"
import Showcase from "app/home/Showcase"
import MadeWithTwoClicks from "app/core/components/MadeWithTwoClicks"
const Home = () => {
  return (
    <>
      <Space h={16} />
      <HomeHero />
      <Benefits />
      <Space h={160} />
      <WhoIsThisFor />
      <Space h={200} />
      <Showcase />
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

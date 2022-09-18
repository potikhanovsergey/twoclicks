import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Global, Space } from "@mantine/core"
import HomeHero from "app/home/HomeHero"
import Benefits from "app/home/Benefits"
import WhoIsThisFor from "app/home/WhoIsThisFor"
import Showcase from "app/home/Showcase"
import CallToAction from "app/home/CallToAction"
import LandingFooter from "app/home/LandingFooter"
import HowToUseIt from "app/home/HowToUseIt"
const Home = () => {
  return (
    <>
      <Space h={16} />
      <HomeHero />
      <Benefits />
      <Space h={160} />
      <WhoIsThisFor />
      <Space h={200} />
      <HowToUseIt />
      <Space h={200} />
      <Showcase />
      <Space h={400} />
      <CallToAction />
      <Space h={200} />
      <LandingFooter />
      <Global
        styles={(theme) => ({
          body: {
            overflow: "hidden",
          },
        })}
      />
    </>
  )
}

Home.getLayout = getBaseLayout({})
Home.suppressFirstRenderFlicker = true

export default Home

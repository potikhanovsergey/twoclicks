import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Global } from "@mantine/core"
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
      <HomeHero mt={16} />
      <Benefits mb={160} />
      <WhoIsThisFor mb={200} />
      <HowToUseIt mb={200} />
      <Showcase mb={400} />
      <CallToAction mb={200} />
      <LandingFooter />
      <Global
        styles={{
          body: {
            overflow: "hidden",
          },
        }}
      />
    </>
  )
}

Home.getLayout = getBaseLayout({})
Home.suppressFirstRenderFlicker = true

export default Home

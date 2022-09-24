import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Box, Global } from "@mantine/core"
import HomeHero from "app/home/HomeHero"
import Benefits from "app/home/Benefits"
import WhoIsThisFor from "app/home/WhoIsThisFor"
import Showcase from "app/home/Showcase"
import CallToAction from "app/home/CallToAction"
import LandingFooter from "app/home/LandingFooter"
import HowToUseIt from "app/home/HowToUseIt"

const Home = () => {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <HomeHero mt={16} />
      <Benefits mb={160} />
      <WhoIsThisFor mb={200} />
      <HowToUseIt mb={200} />
      <Showcase
        sx={{
          marginBottom: "400px",
          "@media (max-width: 768px)": {
            marginBottom: "240px",
          },
        }}
      />
      <CallToAction mb={200} />
      <LandingFooter />
    </Box>
  )
}

Home.getLayout = getBaseLayout({})
Home.suppressFirstRenderFlicker = true

export default Home

import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Box } from "@mantine/core"
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
      <Benefits
        sx={{
          marginBottom: "160px",
          "@media (max-width: 768px)": {
            marginBottom: "80px",
          },
        }}
      />
      <WhoIsThisFor
        sx={{
          marginBottom: "200px",
          "@media (max-width: 768px)": {
            marginBottom: "120px",
          },
        }}
      />
      <HowToUseIt
        sx={{
          marginBottom: "200px",
          "@media (max-width: 768px)": {
            marginBottom: "40px",
          },
        }}
      />
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

Home.getLayout = getBaseLayout({ withNotificationsProvider: false })
Home.suppressFirstRenderFlicker = true

export default Home

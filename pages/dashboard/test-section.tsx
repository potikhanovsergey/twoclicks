import { useSession } from "@blitzjs/auth"
import MantineCarouselWithCards from "app/build/sections/carousels/MantineCarouselWithCards"
import HeroWithBottomPicture from "app/build/sections/hero/HeroWithBottomPicture"
import HeroWithGallery from "app/build/sections/hero/HeroWithGallery"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { AuthorizationError } from "blitz"
import { useEffect } from "react"

const TestSection = () => {
  const session = useSession()

  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])

  return <MantineCarouselWithCards />
}

TestSection.getLayout = getBaseLayout({})
TestSection.suppressFirstRenderFlicker = true
export default TestSection

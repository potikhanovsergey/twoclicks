import { useSession } from "@blitzjs/auth"
import MantineCarouselWithCards from "app/build/sections/carousels/MantineCarouselWithCards"
import FeaturesSimple from "app/build/sections/features/FeaturesSimple"
import FeaturesWithPeople from "app/build/sections/features/FeaturesWithPeople"
import FeaturesWithPicture from "app/build/sections/features/FeaturesWithPicture"
import MantineFooterWithSocialIcons from "app/build/sections/footers/MantineFooterWithSocialIcons"
import GalleryWithButton from "app/build/sections/galleries/GalleryWithButton"
import HeroWithTwoButtonsAndPicture from "app/build/sections/hero/HeroWithTwoButtonsAndPicture"
import Partners from "app/build/sections/partners/Partners"
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

  return <HeroWithTwoButtonsAndPicture />
}

TestSection.getLayout = getBaseLayout({})
TestSection.suppressFirstRenderFlicker = true
export default TestSection

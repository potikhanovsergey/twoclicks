import { useSession } from "@blitzjs/auth"
import FeaturesWithPicture from "app/build/sections/features/FeaturesWithPicture"
import GalleryWithButton from "app/build/sections/galleries/GalleryWithButton"
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

  return <FeaturesWithPicture />
}

TestSection.getLayout = getBaseLayout({})
TestSection.suppressFirstRenderFlicker = true
export default TestSection

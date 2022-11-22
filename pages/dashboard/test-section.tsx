import { useSession } from "@blitzjs/auth"
import ImageColumns from "app/build/sections/ImageColumns"
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

  return <ImageColumns />
}

TestSection.getLayout = getBaseLayout({})
TestSection.suppressFirstRenderFlicker = true
export default TestSection

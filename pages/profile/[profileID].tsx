import { useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { LoadingOverlay, Center, Text, Container } from "@mantine/core"
import BaseLayout, { getBaseLayout } from "app/core/layouts/BaseLayout"
import Profile from "app/profile/Profile"
import getUserByID from "app/profile/queries/getUserByID"
import { Suspense } from "react"

const PublicProfile = () => {
  const profileID = useParam("profileID", "string")
  const [profileFromDB] = useQuery(
    getUserByID,
    { id: profileID },
    { refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false }
  )
  return (
    <>
      {profileFromDB ? (
        <Container size="lg" pt={64} px={64}>
          <Profile user={profileFromDB} />
        </Container>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>page not found</Text>
        </Center>
      )}
    </>
  )
}
PublicProfile.getLayout = getBaseLayout({})
PublicProfile.suppressFirstRenderFlicker = true

export default PublicProfile

import { useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { LoadingOverlay, Center, Text, Container } from "@mantine/core"
import BaseLayout, { getBaseLayout } from "app/core/layouts/BaseLayout"
import NewProfileLayout from "app/core/layouts/NewProfileLayout"
import ProfileAbout from "app/profile/ProfileAbout"
import getUserByID from "app/profile/queries/getUserByID"
import { Suspense } from "react"

const ProfileAboutPage = () => {
  const profileID = useParam("profileID", "string")
  const [profileFromDB] = useQuery(
    getUserByID,
    { id: profileID },
    { refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false }
  )
  return (
    <>
      {profileFromDB ? (
        <NewProfileLayout user={profileFromDB}>
          <ProfileAbout user={profileFromDB} />
        </NewProfileLayout>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>Page not found</Text>
        </Center>
      )}
    </>
  )
}

ProfileAboutPage.getLayout = getBaseLayout({})
ProfileAboutPage.suppressFirstRenderFlicker = true

export default ProfileAboutPage

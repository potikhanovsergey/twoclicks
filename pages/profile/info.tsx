import { Avatar, Container, Stack, Text } from "@mantine/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import Profile from "app/profile/Profile"

const ProfileInfoPage = () => {
  const user = useCurrentUser()

  return user ? (
    <Container size="lg" pt={64} px={64}>
      <Profile user={user} />
    </Container>
  ) : (
    <>no user</>
  )
}
ProfileInfoPage.getLayout = getBaseLayout({})
ProfileInfoPage.suppressFirstRenderFlicker = true

export default ProfileInfoPage

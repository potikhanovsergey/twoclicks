import { Avatar, Container, Stack, Text } from "@mantine/core"
import PageCards from "app/build-pages/PageCards"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import NewProfileLayout from "app/core/layouts/NewProfileLayout"

const ProfilePages = () => {
  const user = useCurrentUser()

  return user ? (
    <NewProfileLayout user={user}>
      <PageCards />
    </NewProfileLayout>
  ) : (
    <>no user</>
  )
}

ProfilePages.suppressFirstRenderFlicker = true

export default ProfilePages

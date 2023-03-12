import { Avatar, Container, Stack, Text } from "@mantine/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import NewProfileLayout from "app/core/layouts/NewProfileLayout"

const ProfileInfoPage = () => {
  const user = useCurrentUser()

  return user ? <NewProfileLayout user={user}></NewProfileLayout> : <>no user</>
}
ProfileInfoPage.suppressFirstRenderFlicker = true

export default ProfileInfoPage

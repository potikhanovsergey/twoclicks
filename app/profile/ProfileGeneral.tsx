import { useSession } from "@blitzjs/auth"
import { Group, Avatar, Stack, Text, Button, useMantineTheme } from "@mantine/core"
import { User } from "@prisma/client"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FiTwitter } from "@react-icons/all-files/fi/FiTwitter"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const HireMeButton = () => {
  return (
    <Button radius="xl" color="primary">
      Hire me
    </Button>
  )
}

const EditProfileButton = () => {
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return (
    <Button variant={dark ? "white" : "filled"} radius="xl" color="dark">
      Edit profile
    </Button>
  )
}

const ProfileGeneral = ({ user }: { user: User }) => {
  const session = useSession()
  return (
    <Group position="apart" align="flex-start">
      <Group spacing={64} sx={{ alignItems: "flex-start" }}>
        <Avatar src={user.avatar} size={128} radius={1000} />
        <Stack spacing={0}>
          <Text size={28} weight={700}>
            {user.name}, 20
          </Text>
          <Text size={20} weight={600}>
            Programmer, desinger
          </Text>
          <Group my={8}>
            <FiTwitter size="20px" />
            <FaInstagram size="20px" />
          </Group>
          <Text size={20} weight={600} color="dimmed">
            Moscow
          </Text>
        </Stack>
      </Group>
      {session.userId === user.id ? <EditProfileButton /> : <HireMeButton />}
    </Group>
  )
}

export default ProfileGeneral

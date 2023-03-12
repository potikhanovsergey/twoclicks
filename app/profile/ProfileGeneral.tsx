import { useSession } from "@blitzjs/auth"
import { Group, Avatar, Stack, Text, Button, useMantineTheme } from "@mantine/core"
import { User } from "@prisma/client"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FiTwitter } from "@react-icons/all-files/fi/FiTwitter"
import Link from "next/link"

const HireMeButton = () => {
  return (
    <Button radius="xl" color="primary">
      Hire me
    </Button>
  )
}

const EditProfileButton = ({ id }: { id: string }) => {
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return (
    <Link href={`/profile/${id}/edit`} passHref>
      <Button variant={dark ? "white" : "filled"} radius="xl" color="dark" component="a">
        Edit profile
      </Button>
    </Link>
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
            {user.name}, {user.age || 20}
          </Text>
          <Text size={20} weight={600}>
            {user.caption || "Programmer, desinger"}
          </Text>
          <Group my={8}>
            <FiTwitter size="20px" />
            <FaInstagram size="20px" />
          </Group>
          <Text size={20} weight={600} color="dimmed">
            {user.subtitle || "Moscow"}
          </Text>
        </Stack>
      </Group>
      {session.userId === user.id ? <EditProfileButton id={user.id} /> : <HireMeButton />}
    </Group>
  )
}

export default ProfileGeneral

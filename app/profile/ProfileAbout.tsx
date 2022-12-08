import {
  Badge,
  Box,
  Stack,
  Text,
  Group,
  ThemeIcon,
  useMantineTheme,
  ThemeIconVariant,
  Anchor,
} from "@mantine/core"
import { BiAt } from "@react-icons/all-files/bi/BiAt"
import { RiTwitterLine } from "@react-icons/all-files/ri/RiTwitterLine"
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram"
import { User } from "@prisma/client"
import { ReactNode } from "react"

const mockdataSkills = ["Programmer", "Designer", "Programmer", "Singer", "Cooker", "Helicopter"]

const mockdataContacts = [
  { icon: <BiAt />, link: "d.semina10@gmail.com" },
  { icon: <RiTwitterLine />, link: "mytwitter.com" },
  { icon: <AiOutlineInstagram />, link: "myinstagram.com" },
]

interface ProfileAboutProps {
  user: User
}

const ProfileAbout = ({ user }: ProfileAboutProps) => {
  const theme = useMantineTheme()

  return (
    <Stack spacing="md">
      {user.skills.length > 0 && (
        <Box>
          <Text color="dimmed" mb="xs">
            Skills
          </Text>
          {user.skills.map((item, i) => (
            <Badge
              size="xl"
              color="gray.1"
              variant="filled"
              radius="md"
              mr="xs"
              key={i}
              styles={{
                root: {
                  textTransform: "none",
                  fontWeight: 400,
                  color: theme.black,
                },
              }}
            >
              {item}
            </Badge>
          ))}
        </Box>
      )}
      {user.about && (
        <Box>
          <Text color="dimmed" mb="xs">
            About me...
          </Text>
          <Box
            sx={(theme) => ({ backgroundColor: theme.colors.gray[1], borderRadius: "8px" })}
            p="xs"
          >
            <Text color="black">{user.about}</Text>
          </Box>
        </Box>
      )}
      <Box>
        <Text color="dimmed" mb="xs">
          Contact me
        </Text>
        <Box
          sx={(theme) => ({ backgroundColor: theme.colors.gray[1], borderRadius: "8px" })}
          p="xs"
        >
          <Stack spacing={4}>
            {mockdataContacts.map((contact, i) => (
              <Group key={i}>
                <ThemeIcon color="gray" variant={"transparent" as ThemeIconVariant}>
                  {contact.icon}
                </ThemeIcon>
                <Anchor color="dark.9" href={contact.link} target="_blank">
                  {contact.link}
                </Anchor>
              </Group>
            ))}
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export default ProfileAbout

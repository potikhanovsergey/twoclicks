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
import Link from "next/link"

const mockdataSkills = [
  { skill: "Programmer" },
  { skill: "Designer" },
  { skill: "Programmer" },
  { skill: "Singer" },
  { skill: "Cooker" },
  { skill: "Helicopter" },
]

const mockdataContacts = [
  { icon: <BiAt />, link: "d.semina10@gmail.com" },
  { icon: <RiTwitterLine />, link: "mytwitter.com" },
  { icon: <AiOutlineInstagram />, link: "myinstagram.com" },
]

const ProfileAbout = () => {
  const theme = useMantineTheme()

  return (
    <Stack spacing="md">
      <Box>
        <Text color="dimmed" mb="xs">
          Skills
        </Text>
        {mockdataSkills.map((item, i) => (
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
            {item.skill}
          </Badge>
        ))}
      </Box>
      <Box>
        <Text color="dimmed" mb="xs">
          About me...
        </Text>
        <Box
          sx={(theme) => ({ backgroundColor: theme.colors.gray[1], borderRadius: "8px" })}
          p="xs"
        >
          <Text color="black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
        </Box>
      </Box>
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

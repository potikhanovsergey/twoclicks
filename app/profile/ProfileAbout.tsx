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
  Paper,
} from "@mantine/core"
import { User } from "@prisma/client"
import { ReactNode, useMemo } from "react"
import { FaVk } from "@react-icons/all-files/fa/FaVk"
import { FaTelegram } from "@react-icons/all-files/fa/FaTelegram"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaFacebookSquare } from "@react-icons/all-files/fa/FaFacebookSquare"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { BiAt } from "@react-icons/all-files/bi/BiAt"

type SocialsProps = {
  [key in "vk" | "telegram" | "twitter" | "facebook" | "publicEmail" | "instagram"]?: {
    icon: ReactNode
    link: string
  }
}

interface ProfileAboutProps {
  user: User
}

export const SOCIALS_ICON_MAP = {
  publicEmail: <BiAt />,
  telegram: <FaTelegram color="#229ED9" />,
  vk: <FaVk color="#0077FF" />,
  twitter: <FaTwitter color="#1DA1F2" />,
  facebook: <FaFacebookSquare color="#4267B2" />,
  instagram: <FaInstagram color="#fb3958" />,
}

const ProfileAbout = ({ user }: ProfileAboutProps) => {
  const theme = useMantineTheme()

  const socials = useMemo(() => {
    const returnObject: SocialsProps = {}
    const socialsToCheck = Object.keys(SOCIALS_ICON_MAP)
    for (let i = 0; i < socialsToCheck.length; i++) {
      if (user[socialsToCheck[i]]) {
        returnObject[socialsToCheck[i]] = {
          icon: SOCIALS_ICON_MAP[socialsToCheck[i]],
          link: user[socialsToCheck[i]],
        }
      }
    }
    return returnObject
  }, [user])
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
      {Object.keys(socials).length > 0 && (
        <Box>
          <Text color="dimmed" mb="xs">
            Contact me
          </Text>
          <Paper
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            })}
            p="xs"
          >
            <Stack spacing={4}>
              {Object.keys(socials).map((s: keyof SocialsProps) => (
                <Group key={s}>
                  <ThemeIcon color="gray" variant={"transparent" as ThemeIconVariant}>
                    {SOCIALS_ICON_MAP[s]}
                  </ThemeIcon>
                  <Anchor
                    sx={{ color: "inherit" }}
                    href={
                      s === "publicEmail"
                        ? `mailto: ${socials[s]!.link}`
                        : `${socials[s]!.link.includes("://") ? "" : "//"}${socials[s]!.link}`
                    }
                    target={s === "publicEmail" ? undefined : "_blank"}
                  >
                    {socials[s]!.link}
                  </Anchor>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Box>
      )}
    </Stack>
  )
}

export default ProfileAbout

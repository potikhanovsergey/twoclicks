import React, { useState } from "react"
import { ThemeIcon, UnstyledButton, Group, Text, Stack, useMantineTheme } from "@mantine/core"
import { FaBriefcase } from "react-icons/fa"
import { BiStats } from "react-icons/bi"
import { RiVipCrown2Fill } from "react-icons/ri"
import { BsQuestionCircleFill } from "react-icons/bs"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import Link from "next/link"

interface IProfileLink {
  icon: React.ReactNode
  color: string
  label: string
  link: string
}

function ProfileLink({ icon, color, label, link }: IProfileLink) {
  const router = useRouter()
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  return (
    <Link href={link} passHref>
      <UnstyledButton
        component="a"
        style={
          router.route === link
            ? {
                backgroundColor: dark ? theme.colors.dark[4] : theme.colors.gray[0],
                color: dark ? theme.colors.gray[4] : theme.black,
                pointerEvents: "none",
              }
            : {}
        }
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light" size="lg">
            {icon}
          </ThemeIcon>

          <Text size="md" weight="bold">
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  )
}

export function ProfileLinks() {
  const { t } = useTranslation("common")
  const [data] = useState(() => [
    { icon: <FaBriefcase />, color: "orange", label: t("portfolios"), link: "/profile" },
    { icon: <BiStats />, color: "violet", label: t("statistics"), link: "/profile/statistics" },
    { icon: <RiVipCrown2Fill />, color: "yellow", label: t("premium"), link: "/profile/premium" },
    {
      icon: <BsQuestionCircleFill />,
      color: "teal",
      label: t("support"),
      link: "/profile/support",
    },
  ])
  const links = data.map((link) => <ProfileLink {...link} key={link.label} />)
  return <Stack spacing={2}>{links}</Stack>
}

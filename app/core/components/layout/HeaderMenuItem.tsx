import { Menu, Text, useMantineTheme } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

interface IHeaderMenuItem {
  icon?: ReactNode
  title: string
  text: string
  route: string
}

const HeaderMenuItem = ({ icon, title, text, route }: IHeaderMenuItem) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const router = useRouter()
  const { t } = useTranslation("common")
  return (
    <Link href={route} passHref>
      <Menu.Item
        component="a"
        style={
          router.route === route || (router.route.includes("profile") && route.includes("profile"))
            ? {
                backgroundColor: dark ? theme.colors.gray[0] : theme.colors.dark[4],
                color: dark ? theme.black : theme.colors.gray[0],
                pointerEvents: "none",
              }
            : {}
        }
        sx={(theme) => ({
          borderRadius: 0,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1],
          },
        })}
        title={t(title)}
        icon={icon}
      >
        <Text weight="bold">{t(text)}</Text>
      </Menu.Item>
    </Link>
  )
}

export default HeaderMenuItem

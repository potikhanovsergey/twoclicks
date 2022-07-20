import { useMantineColorScheme, Menu, Text, useMantineTheme } from "@mantine/core"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

interface IHeaderMenuItem {
  icon: ReactNode
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
          router.route === route
            ? {
                backgroundColor: dark ? theme.colors.dark[4] : theme.colors.gray[0],
                color: dark ? theme.colors.gray[4] : theme.black,
                pointerEvents: "none",
              }
            : {}
        }
        disabled={router.route === route}
        title={t(title)}
        icon={icon}
      >
        <Text weight="bold">{t(text)}</Text>
      </Menu.Item>
    </Link>
  )
}

export default HeaderMenuItem

import {
  Group,
  Avatar,
  Menu,
  Divider,
  UnstyledButton,
  Text,
  Button,
  useMantineTheme,
} from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/router"
import ColorSchemeToggle from "../base/ColorSchemeToggle"
import LanguageSwitcher from "../base/LanguageSwitcher"
import HeaderMenuItem from "./HeaderMenuItem"
import logout from "app/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Link from "next/link"
import { memo, useEffect, useState } from "react"

import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"
import { IoPersonCircle } from "@react-icons/all-files/io5/IoPersonCircle"

export const ProfileItem = {
  title: "goToTheProfile",
  text: "profile",
  route: "/profile",
}

export const ConstMenuItems = [
  {
    title: "openThePortfolioBuilder",
    text: "portfolioBuilder",
    route: "/build",
  },
  {
    title: "openTheHelpCenter",
    text: "helpcenter",
    route: "/support",
  },
  {
    title: "aboutUsPage",
    text: "aboutUs",
    route: "/",
  },
  {
    title: "whatsNewPage",
    text: "whatsNew",
    route: "/news",
  },
]

function HeaderProfile() {
  const { t } = useTranslation("common")
  // const { data: session, status } = useSession();
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [menuHovered, menuHoveredHandlers] = useDisclosure(false)
  const router = useRouter()
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    const handleComplete = () => {
      setMenuOpened(false)
    }

    router.events.on("routeChangeComplete", handleComplete)

    return () => {
      router.events.off("routeChangeComplete", handleComplete)
    }
  })
  return (
    <Group position="center">
      {!user && (
        <Link passHref href={`/auth/?next=${router.asPath}`}>
          <Button
            component="a"
            size="xs"
            title="Войти в аккаунт"
            color="dark"
            variant={dark ? "white" : "filled"}
          >
            {t("signin")}
          </Button>
        </Link>
      )}
      <Menu
        opened={menuOpened}
        onChange={setMenuOpened}
        closeOnClickOutside
        position="bottom-end"
        closeOnItemClick={false}
        width="256px"
        radius="md"
      >
        <Menu.Target>
          <UnstyledButton
            onMouseEnter={menuHoveredHandlers.open}
            onMouseLeave={menuHoveredHandlers.close}
            aria-label="Open settings and navigation menu"
            px={16}
            sx={(theme) => ({
              display: "flex",
              flexWrap: "nowrap",
              gap: "8px",
              padding: 4,
              borderRadius: theme.radius.md,
              color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
              backgroundColor: menuHovered
                ? theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[2]
                : "",
            })}
          >
            {user && (
              <Text weight="bold" style={{ whiteSpace: "nowrap" }}>
                {user.name}
              </Text>
            )}
            <Group spacing={8}>
              {user?.avatar ? (
                <Avatar
                  imageProps={{
                    width: "26px",
                    height: "26px",
                  }}
                  radius="xl"
                  size="sm"
                  src={user.avatar}
                  alt={`${user.name} avatar`}
                />
              ) : (
                <Avatar size="sm">
                  <IoPersonCircle
                    size="100%"
                    fill={dark ? theme.colors.gray[0] : theme.colors.dark[5]}
                  />
                </Avatar>
              )}
              <FaChevronDown size={16} fill={dark ? theme.colors.gray[0] : theme.colors.dark[5]} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown p={0}>
          <Menu.Label>{t("general")}</Menu.Label>
          {/* MENU STARTS */}
          {user?.id && <HeaderMenuItem {...ProfileItem} />}
          {ConstMenuItems.map((menuItem, i) => (
            <HeaderMenuItem key={menuItem.title} {...menuItem} />
          ))}
          {/* MENU ENDS */}
          {user?.id && (
            <Menu.Item
              color="red"
              sx={{ borderRadius: 0 }}
              title={t("signOutOfTheAccount")}
              onClick={async () => await logoutMutation()}
            >
              <Text weight="bold">{t("signout")}</Text>
            </Menu.Item>
          )}
          {/* /* LOG OUT ENDS */}
          <Divider />

          <Menu.Label>{t("settings")}</Menu.Label>
          <Menu.Item
            pt={0}
            component="div"
            sx={() => ({
              cursor: "default",
              backgroundColor: `${dark ? theme.colors.dark[6] : theme.white} !important`,
            })}
          >
            <Group spacing={4} align="center">
              <LanguageSwitcher />
              <ColorSchemeToggle />
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default memo(HeaderProfile)

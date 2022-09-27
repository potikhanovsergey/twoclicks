import {
  Group,
  Avatar,
  Menu,
  Divider,
  UnstyledButton,
  Text,
  Button,
  useMantineTheme,
  Sx,
} from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/router"
import ColorSchemeToggle from "../base/ColorSchemeToggle"
import LanguageSwitcher from "../base/LanguageSwitcher"
import logout from "app/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Link from "next/link"
import { memo, useEffect, useMemo, useState } from "react"

import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"
import { IoPersonCircle } from "@react-icons/all-files/io5/IoPersonCircle"
import ButtonGroup, { GroupButtonProps } from "../base/ButtonGroup"

export const ProfileItem = {
  href: "/profile",
  children: "profile",
}

export const MenuItemSx: Sx = (theme) => ({
  fontWeight: 700,
  fontSize: "14px",
  padding: "10px",
  "> div": {
    justifyContent: "flex-start",
  },
})

export const ConstMenuItems = [
  {
    href: "/build",
    children: "pageBuilder",
  },
  {
    href: "/support",
    children: "helpcenter",
  },
  {
    href: "/",
    children: "aboutUs",
  },
  // {
  //   href: "/whats-new",
  //   children: "whatsNew",
  // },
]

function HeaderProfile({ withAuthButton = true }: { withAuthButton?: boolean }) {
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

  const menuItems: GroupButtonProps[] = useMemo(() => {
    const formatedMenuItems: GroupButtonProps[] = ConstMenuItems.map((i) => ({
      elType: "menuItem",
      sx: MenuItemSx,
      children: t(i.children),
      href: i.href,
    }))

    if (user) {
      formatedMenuItems.unshift({
        elType: "menuItem",
        sx: MenuItemSx,
        children: t(ProfileItem.children),
        href: ProfileItem.href,
      })
      formatedMenuItems.push({
        elType: "menuItem",
        sx: (theme) => ({
          color: theme.colors.red[5],
          fontWeight: 700,
          fontSize: "14px",
          "> div": { justifyContent: "flex-start" },
        }),
        children: t("signout"),
        onClick: () => logoutMutation(),
      })
    }
    return formatedMenuItems
  }, [user])

  return (
    <Group position="center">
      {!user && withAuthButton && (
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
              color: dark ? theme.colors.dark[0] : theme.black,
              backgroundColor: menuHovered
                ? theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[2]
                : "",
            })}
          >
            {user && (
              <Text weight="bold" style={{ whiteSpace: "nowrap" }} color={dark ? "gray.0" : "dark"}>
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
          <ButtonGroup buttons={menuItems} wrapperProps={{ sx: { flexDirection: "column" } }} />
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

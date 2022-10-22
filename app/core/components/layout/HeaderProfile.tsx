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
  Skeleton,
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
import { memo, Suspense, useEffect, useMemo, useState } from "react"

import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"
import { IoPersonCircle } from "@react-icons/all-files/io5/IoPersonCircle"
import ButtonGroup, { GroupButtonProps } from "../base/ButtonGroup"
import { useSession } from "@blitzjs/auth"

export const ProfileItem = {
  href: "/profile",
  children: "profile",
}

export const MenuItemSx: Sx = (theme) => ({
  "> div": {
    justifyContent: "flex-start",
  },
})

export const ConstMenuItems = [
  {
    href: "/build",
    children: "pageBuilder",
  },
  // {
  //   href: "/support",
  //   children: "helpcenter",
  // },
  {
    href: "/",
    children: "aboutUs",
  },
  { href: "/faq", children: "faq" },
  // {
  //   href: "/whats-new",
  //   children: "whatsNew",
  // },
]

const UserAvatar = () => {
  const user = useCurrentUser()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return user?.avatar ? (
    <Avatar radius="xl" size={32} src={user.avatar} alt={`${user.name} avatar`} />
  ) : (
    <Avatar size="sm">
      <IoPersonCircle size="100%" fill={dark ? theme.colors.gray[0] : theme.colors.dark[5]} />
    </Avatar>
  )
}

function HeaderProfile({ withAuthButton = true }: { withAuthButton?: boolean }) {
  const { t } = useTranslation("common")
  // const { data: session, status } = useSession();
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  const session = useSession()
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

  const { locale, route } = useRouter()

  const profileItem = useMemo(() => {
    return session
      ? {
          href: `/profile/${session.userId}`,
          children: "profile",
        }
      : null
  }, [session])

  const menuItems: GroupButtonProps[] = useMemo(() => {
    const formatedMenuItems: GroupButtonProps[] = ConstMenuItems.map((i) => ({
      elType: "menuItem",
      sx: MenuItemSx,
      children: t(i.children),
      href: i.href,
      active: i.href === route,
    }))

    if (session.userId) {
      if (session.role === "ADMIN") {
        formatedMenuItems.unshift({
          elType: "menuItem",
          sx: MenuItemSx,
          children: t("templates"),
          href: "/templates",
          active: "/templates" === route,
        })
        formatedMenuItems.unshift({
          elType: "menuItem",
          sx: MenuItemSx,
          children: t("pages"),
          href: "/pages",
          active: "/pages" === route,
        })
      }
      formatedMenuItems.unshift({
        elType: "menuItem",
        sx: MenuItemSx,
        children: t(ProfileItem.children),
        href: ProfileItem.href,
        active: "/profile" === route,
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
  }, [session, locale, route])

  const menuAdminItems: GroupButtonProps[] | null = useMemo(() => {
    if (session?.role !== "ADMIN") return null

    const formatedMenuAdminItems: GroupButtonProps[] = []

    if (session) {
      if (session.role === "ADMIN") {
        formatedMenuAdminItems.unshift({
          elType: "menuItem",
          sx: MenuItemSx,
          children: "Building Blocks",
          href: "/dashboard/building-blocks",
        })
        formatedMenuAdminItems.unshift({
          elType: "menuItem",
          sx: MenuItemSx,
          children: "Test section",
          href: "/dashboard/test-section",
        })
        formatedMenuAdminItems.unshift({
          elType: "menuItem",
          sx: MenuItemSx,
          children: "Support messages",
          href: "/dashboard/support-messages",
        })
        formatedMenuAdminItems.unshift({
          elType: "menuItem",
          sx: MenuItemSx,
          children: "Pages",
          href: "/dashboard/pages",
        })
      }
    }
    return formatedMenuAdminItems
  }, [session, locale])

  return (
    <Group position="center">
      {!session.userId && withAuthButton && (
        <Link passHref href={`/auth/?next=${router.asPath}`}>
          <Button component="a" size="xs" color="dark" variant={dark ? "white" : "filled"}>
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
        radius="sm"
      >
        <Menu.Target>
          <UnstyledButton
            onMouseEnter={menuHoveredHandlers.open}
            onMouseLeave={menuHoveredHandlers.close}
            aria-label="Open settings and navigation menu"
          >
            <Group spacing={8}>
              <Suspense fallback={<Skeleton width={32} height={32} radius={1000} animate />}>
                <UserAvatar />
              </Suspense>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown p={0}>
          <Menu.Label>{t("general")}</Menu.Label>
          <ButtonGroup buttons={menuItems} wrapperProps={{ sx: { flexDirection: "column" } }} />
          {session?.role === "ADMIN" && menuAdminItems && (
            <>
              <Divider />
              <Menu.Label>Dashboard</Menu.Label>
              <ButtonGroup
                buttons={menuAdminItems}
                wrapperProps={{ sx: { flexDirection: "column" } }}
              />
            </>
          )}
          <Divider />
          <Menu.Label>{t("settings")}</Menu.Label>
          <Menu.Item
            pt={0}
            component="div"
            sx={() => ({
              cursor: "default",
              backgroundColor: `${dark ? theme.colors.dark[7] : theme.white} !important`,
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

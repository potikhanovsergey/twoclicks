import {
  Group,
  Avatar,
  Menu,
  Divider,
  UnstyledButton,
  ThemeIcon,
  Text,
  Button,
  useMantineTheme,
} from "@mantine/core"
import { FaChevronDown, FaSignOutAlt, FaBook } from "react-icons/fa"
import { AiFillBuild } from "react-icons/ai"
import { BsPersonFill, BsQuestionCircleFill } from "react-icons/bs"
import useTranslation from "next-translate/useTranslation"
// import { signOut, useSession } from 'next-auth/react';
import { useDisclosure } from "@mantine/hooks"
import { IoNewspaper } from "react-icons/io5"
import { useRouter } from "next/router"
import ColorSchemeToggle from "../base/ColorSchemeToggle"
import LanguageSwitcher from "../base/LanguageSwitcher"
import DefaultAvatar from "./DefaultAvatar"
import HeaderMenuItem from "./HeaderMenuItem"
import { useSession } from "@blitzjs/auth"
import logout from "app/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ProfileItem = {
  icon: (
    <ThemeIcon variant="gradient" gradient={{ from: "teal", to: "blue" }} size="md">
      <BsPersonFill />
    </ThemeIcon>
  ),
  title: "goToTheProfile",
  text: "profile",
  route: "/profile",
}

export const ConstMenuItems = [
  {
    icon: (
      <ThemeIcon variant="gradient" gradient={{ from: "yellow", to: "orange", deg: 105 }} size="md">
        <AiFillBuild />
      </ThemeIcon>
    ),
    title: "openThePortfolioBuilder",
    text: "portfolioBuilder",
    route: "/build",
  },
  {
    icon: (
      <ThemeIcon variant="gradient" gradient={{ from: "teal", to: "lime", deg: 105 }} size="md">
        <BsQuestionCircleFill />
      </ThemeIcon>
    ),
    title: "openTheHelpCenter",
    text: "helpcenter",
    route: "/support",
  },
  {
    icon: (
      <ThemeIcon variant="gradient" gradient={{ from: "grape", to: "violet", deg: 105 }} size="md">
        <FaBook />
      </ThemeIcon>
    ),
    title: "aboutUsPage",
    text: "aboutUs",
    route: "/",
  },
  {
    icon: (
      <ThemeIcon color="yellow" size="md">
        <IoNewspaper />
      </ThemeIcon>
    ),
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
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
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
          <Group
            style={{ cursor: "pointer" }}
            spacing={8}
            onMouseEnter={menuHoveredHandlers.open}
            onMouseLeave={menuHoveredHandlers.close}
            position="center"
            noWrap
          >
            <>
              {user && (
                <Text weight="bold" style={{ whiteSpace: "nowrap" }}>
                  {user.name}
                </Text>
              )}
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
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
                <Group spacing={8}>
                  {user?.avatar ? (
                    <Avatar radius="xl" size="sm" src={user.avatar} />
                  ) : (
                    <Avatar size="sm">
                      <DefaultAvatar width={22} />
                    </Avatar>
                  )}
                  <FaChevronDown size={16} />
                </Group>
              </UnstyledButton>
            </>
          </Group>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{t("general")}</Menu.Label>
          {/* MENU STARTS */}
          {user?.id && <HeaderMenuItem {...ProfileItem} />}
          {ConstMenuItems.map((menuItem, i) => (
            <HeaderMenuItem key={menuItem.title} {...menuItem} />
          ))}
          {/* MENU ENDS */}
          {user?.id && (
            <Menu.Item
              title={t("signOutOfTheAccount")}
              icon={
                <ThemeIcon color="red" size="md">
                  <FaSignOutAlt />
                </ThemeIcon>
              }
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
            <Group spacing={4}>
              <LanguageSwitcher />
              <ColorSchemeToggle />
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default HeaderProfile

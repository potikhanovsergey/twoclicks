import {
  Group,
  Avatar,
  Menu,
  Divider,
  UnstyledButton,
  ThemeIcon,
  Text,
  Button,
  Skeleton,
} from "@mantine/core"
import { FaChevronDown, FaSignOutAlt, FaBook } from "react-icons/fa"
import { AiFillBuild } from "react-icons/ai"
import { BsPersonFill, BsQuestionCircleFill } from "react-icons/bs"
import { useTranslation } from "next-i18next"
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

const ProfileItem = {
  icon: (
    <ThemeIcon variant="gradient" gradient={{ from: "teal", to: "blue" }} size="md">
      <BsPersonFill />
    </ThemeIcon>
  ),
  title: "goToTheProfile",
  text: "profile",
  route: "/profile",
}

const ConstMenuItems = [
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
  const session = useSession()
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [opened, openedHandlers] = useDisclosure(false)
  const [menuHovered, menuHoveredHandlers] = useDisclosure(false)
  const router = useRouter()
  return (
    <Group position="center">
      {!user && ( // TODO: i18n, session
        <Link passHref href={`/auth/?next=${router.pathname}`}>
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
        sx={() => ({
          ":hover": {
            cursor: "pointer",
          },
        })}
        opened={opened}
        onOpen={openedHandlers.open}
        onClose={openedHandlers.close}
        size="lg"
        placement="end"
        position="bottom"
        closeOnItemClick={false}
        control={
          <Group
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
        }
      >
        <Menu.Label>{t("general")}</Menu.Label>
        {/* MENU STARTS */}
        {session.userId && <HeaderMenuItem {...ProfileItem} />}
        {ConstMenuItems.map((menuItem, i) => (
          <HeaderMenuItem key={i} {...menuItem} />
        ))}
        {/* MENU ENDS */}
        {session.userId && (
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
          disabled
          component="div"
          style={{
            cursor: "default",
          }}
        >
          <Group spacing={4}>
            <LanguageSwitcher />
            <ColorSchemeToggle />
          </Group>
        </Menu.Item>
      </Menu>
    </Group>
  )
}

export default HeaderProfile

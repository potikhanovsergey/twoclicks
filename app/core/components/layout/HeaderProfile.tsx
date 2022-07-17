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
  const [opened, openedHandlers] = useDisclosure(false)
  const [menuHovered, menuHoveredHandlers] = useDisclosure(false)
  const router = useRouter()
  const handleLoginClick = () => {
    void router.push({ pathname: "/auth/", query: { next: router.pathname } })
  }
  return (
    <>
      {false ? (
        <Skeleton height={40} width={200} radius="md" animate /> // todo: session
      ) : (
        <Group position="center">
          {true && ( // TODO: i18n, session
            <Button
              size="xs"
              title="Войти в аккаунт"
              onClick={handleLoginClick}
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            >
              {t("signin")}
            </Button>
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
                  {false && (
                    <Text weight="bold" style={{ whiteSpace: "nowrap" }}>
                      никнейм
                    </Text>
                  )}{" "}
                  {/* todo: session */}
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
                      {/* {session?.user?.image ? <Avatar radius="xl" size="sm" src={session.user.image} /> : */}{" "}
                      {/* todo: session */}
                      <Avatar size="sm">
                        <DefaultAvatar width={22} />
                      </Avatar>{" "}
                      {/* } */}
                      <FaChevronDown size={16} />
                    </Group>
                  </UnstyledButton>
                </>
              </Group>
            }
          >
            <Menu.Label>{t("general")}</Menu.Label>
            {/* MENU STARTS */}
            {/* {session && <HeaderMenuItem {...ProfileItem} />} PROFILE todo: session */}
            {ConstMenuItems.map((menuItem, i) => (
              <HeaderMenuItem key={i} {...menuItem} />
            ))}
            {/* MENU ENDS */}
            {/* LOG OUT STARTS */}
            {/* {session && todo: session
              <Menu.Item
                title={t('signOutOfTheAccount')}
                icon={<ThemeIcon color="red" size="md">
                <FaSignOutAlt />
                      </ThemeIcon>}
                onClick={() => signOut({ redirect: false })}
              >
                <Text weight="bold">{t('signout')}</Text>
              </Menu.Item>} */}
            {/* LOG OUT ENDS */}
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
      )}
    </>
  )
}

export default HeaderProfile

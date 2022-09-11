import {
  Avatar,
  Group,
  Modal,
  Skeleton,
  useMantineTheme,
  Text,
  Button,
  ThemeIcon,
  Stack,
} from "@mantine/core"
import { Suspense, useContext, useEffect, useMemo } from "react"
import useTranslation from "next-translate/useTranslation"
import { ModalContext } from "contexts/ModalContext"
import HeaderProfile, { ConstMenuItems, ProfileItem } from "../../layout/HeaderProfile"
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa"
import DefaultAvatar from "../../layout/DefaultAvatar"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import HeaderMenuItem from "../../layout/HeaderMenuItem"
import { useMutation } from "@blitzjs/rpc"
import logout from "app/auth/mutations/logout"
import Link from "next/link"
import { useMediaQuery, useScrollLock, useViewportSize } from "@mantine/hooks"
import ColorSchemeToggle from "../../base/ColorSchemeToggle"
import LanguageSwitcher from "../../base/LanguageSwitcher"

const MenuModal = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  // const { t } = useTranslation('common');
  const [modalContext, setModalContext = () => ({})] = useContext(ModalContext)

  const handleModalClose = () => {
    setModalContext((prevValue) => ({
      ...prevValue,
      menuModal: false,
    }))
  }
  const user = useCurrentUser()
  const { t } = useTranslation("common")
  const [logoutMutation] = useMutation(logout)
  const [, setScrollLocked] = useScrollLock()

  const { width } = useViewportSize()
  const menuOpened = useMemo(() => {
    return width <= theme.breakpoints.sm && !!modalContext?.menuModal
  }, [width, modalContext])

  useEffect(() => {
    setScrollLocked(menuOpened)
  }, [menuOpened])

  return (
    <Modal
      fullScreen
      opened={menuOpened}
      onClose={handleModalClose}
      zIndex={1000}
      title={
        <>
          <Group spacing={8}>
            {user?.avatar ? (
              <Avatar radius="xl" size="sm" src={user.avatar} />
            ) : (
              <Avatar size="sm">
                <DefaultAvatar width={22} />
              </Avatar>
            )}
            {user && (
              <Text weight="bold" style={{ whiteSpace: "nowrap" }}>
                {user.name}
              </Text>
            )}
          </Group>
        </>
      }
    >
      {/* MENU STARTS */}
      <Stack>
        {user?.id && (
          <Link passHref href={ProfileItem.route}>
            <Button
              title={t(ProfileItem.title)}
              color={dark ? "dark" : "violet"}
              variant={dark ? "filled" : "light"}
            >
              {t(ProfileItem.text)}
            </Button>
          </Link>
        )}
        {ConstMenuItems.map((menuItem) => (
          <Link passHref href={menuItem.route} key={menuItem.text}>
            <Button
              title={t(menuItem.title)}
              color={dark ? "dark" : "violet"}
              fullWidth
              variant={dark ? "filled" : "light"}
            >
              {t(menuItem.text)}
            </Button>
          </Link>
        ))}
        {/* MENU ENDS */}
        {user?.id && (
          <Button
            title={t("signOutOfTheAccount")}
            onClick={async () => await logoutMutation()}
            color="red"
          >
            <Text weight="bold">{t("signout")}</Text>
          </Button>
        )}
        {/* /* LOG OUT ENDS */}

        <Group spacing={4} align="center" position="center">
          <LanguageSwitcher />
          <ColorSchemeToggle />
        </Group>
      </Stack>
    </Modal>
  )
}

export default MenuModal

import { useMutation } from "@blitzjs/rpc"
import { Button, ButtonProps, Menu, Text } from "@mantine/core"
import logout from "app/auth/mutations/logout"
import useTranslation from "next-translate/useTranslation"

const LogoutButton = ({ isMenuItem = false, ...props }: ButtonProps & { isMenuItem?: boolean }) => {
  const { t } = useTranslation("common")
  const [logoutMutation] = useMutation(logout)

  return isMenuItem ? (
    <Menu.Item
      title={t("signOutOfTheAccount")}
      onClick={async () => await logoutMutation()}
      color="red"
      {...props}
    >
      <Text weight="bold">{t("signout")}</Text>
    </Menu.Item>
  ) : (
    <Button
      title={t("signOutOfTheAccount")}
      onClick={async () => await logoutMutation()}
      color="red"
      {...props}
    >
      <Text weight="bold">{t("signout")}</Text>
    </Button>
  )
}

export default LogoutButton

import { NotificationProps } from "@mantine/notifications"
import { BiMessageAltError, BiSave } from "react-icons/bi"
import { BsCheckLg } from "react-icons/bs"
import { Group, Text, ThemeIcon } from "@mantine/core"

const defaultErrorNotification: Partial<NotificationProps> = {
  autoClose: 10000,
  color: "red",
  icon: <BiMessageAltError />,
  title: "Error happened",
  message: "Something went wrong. Please, try again.",
}

const defaultSuccessNotification: Partial<NotificationProps> = {
  autoClose: 3000,
  color: "green",
  icon: <BsCheckLg />,
}

export const defaultUploadNotificationError: NotificationProps = {
  ...defaultErrorNotification,
  title: "Upload Error",
  message: (
    <Text>
      Something went wrong while uploading the image. <br /> Please, try again.
    </Text>
  ),
}

export const defaultSavePortfolioError: NotificationProps = {
  ...defaultErrorNotification,
  title: "Save portfolio error",
  message: (
    <Text>
      Something went wrong while saving portfolio. <br /> Please, try again.
    </Text>
  ),
}

export const defaultSavePortfolioSuccess: NotificationProps = {
  ...defaultSuccessNotification,
  autoClose: 3000,
  title: "Success!",
  message: (
    <Group align="center" spacing={8}>
      <Text>Your portfolio is successfully saved</Text>
      <ThemeIcon variant="light">
        <BiSave />
      </ThemeIcon>
    </Group>
  ),
}

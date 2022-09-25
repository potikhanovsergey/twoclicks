import { NotificationProps } from "@mantine/notifications"
import { Group, Text } from "@mantine/core"

import { BiMessageAltError } from "@react-icons/all-files/bi/BiMessageAltError"
import { BsCheck } from "@react-icons/all-files/bs/BsCheck"

export const defaultErrorNotification: Partial<NotificationProps> = {
  autoClose: 10000,
  color: "red",
  icon: <BiMessageAltError />,
  title: "Error happened",
  message: "Something went wrong. Please, try again.",
}

export const defaultSuccessNotification: Partial<NotificationProps> = {
  color: "green",
  title: "Success!",
  autoClose: 3000,
  icon: <BsCheck />,
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

export const defaultSavePageError: NotificationProps = {
  ...defaultErrorNotification,
  title: "Save page error",
  message: (
    <Text>
      Something went wrong while saving page. <br /> Please, try again.
    </Text>
  ),
}

export const defaultSavePageSuccess: NotificationProps = {
  ...defaultSuccessNotification,
  message: (
    <Group align="center" spacing={8}>
      <Text>Your page is successfully saved</Text>
    </Group>
  ),
}

import {
  Group,
  Container,
  Title,
  Stack,
  Text,
  Button,
  Image,
  MediaQuery,
  Center,
} from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import BaseLayout from "app/core/layouts/BaseLayout"
import IconPicker from "app/core/components/base/IconPicker"

const ComponentsPage = () => {
  // const { t } = useTranslation('pagesBuild');
  return (
    <BaseLayout>
      <Center style={{ height: "100%" }}>
        <IconPicker />
      </Center>
    </BaseLayout>
  )
}

ComponentsPage.suppressFirstRenderFlicker = true

export default ComponentsPage

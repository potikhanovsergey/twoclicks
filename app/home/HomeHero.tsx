import {
  Divider,
  Grid,
  Space,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  Button,
  Highlight,
  Container,
  useMantineTheme,
  Center,
  Group,
  Image,
  Box,
} from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { FaArrowRight } from "react-icons/fa"
import { BsBack } from "react-icons/bs"
import { MdSlowMotionVideo } from "react-icons/md"
import Clicks from "app/core/components/Clicks"

const HomeHero = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("pagesHome")

  return (
    <Container
      size="xl"
      pt={80}
      pb={200}
      sx={{
        position: "relative",
        minHeight: "calc(100vh - var(--layout-header-height))",
      }}
    >
      <Image
        src="landing/purple-circle.png"
        sx={{
          position: "absolute",
          pointerEvents: "none",
          top: "30px",
          left: "-240px",
          zIndex: -1,
          userSelect: "none",
        }}
        alt="Purple circle decoration"
        width={700}
        height={700}
      />
      <Image
        src="landing/pink-circle.png"
        sx={{
          position: "absolute",
          pointerEvents: "none",
          top: "-90px",
          right: "-240px",
          zIndex: -1,
          userSelect: "none",
        }}
        alt="Pink circle decoration"
        width={700}
        height={700}
      />
      <Stack align="center">
        <Title
          order={1}
          sx={{ textTransform: "uppercase", letterSpacing: "12px", fontWeight: 600 }}
          size={50}
        >
          Create your awesome
          <Text
            component="div"
            align="center"
            sx={{ textTransform: "uppercase", letterSpacing: "12px", fontWeight: 700 }}
            size={50}
            color="#FD76EF"
          >
            Presentation
          </Text>
        </Title>
        <Group align="center" spacing={4} noWrap>
          <Text size={40} sx={{ fontWeight: 600 }}>
            All it takes is just twoclicks
          </Text>
          <Clicks width="68px" style={{ marginTop: "12px", height: "auto" }} />
        </Group>
        <Button
          variant="outline"
          color={dark ? "gray.0" : "dark.9"}
          size="lg"
          fullWidth
          radius="md"
          sx={{ maxWidth: "200px" }}
        >
          <Text size="xl" sx={{ fontWeight: 600 }}>
            Get started
          </Text>
        </Button>
      </Stack>
    </Container>
  )
}

export default HomeHero

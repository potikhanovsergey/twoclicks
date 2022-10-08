import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Group,
  packSx,
  Stack,
  Sx,
  Text,
  Title,
} from "@mantine/core"
import ColorCircle from "../components/ColorCircle"

const CardHero = () => {
  return (
    <Container
      size="lg"
      pt={64}
      pb={64}
      sx={{
        minHeight: "70vh",
        borderRadius: 24,
        display: "flex",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "#f2f7f6",
        "@media (max-width: 768px)": {
          borderRadius: 0,
        },
      }}
    >
      <Box sx={{ zIndex: 1, height: "100%", width: "100%" }}>
        <Text
          color="lime"
          align="center"
          size="xl"
          sx={{
            "@media (max-width: 992px)": {
              fontSize: 18,
            },
          }}
        >
          <strong>Our Blog</strong>
        </Text>
        <Title
          order={2}
          align="center"
          color="black"
          size={64}
          mt={12}
          mb={24}
          sx={{
            "@media (max-width: 992px)": {
              fontSize: 48,
            },
            "@media (max-width: 768px)": {
              fontSize: 32,
            },
          }}
        >
          Resources for makers & <br />
          creatives to learn, sell & grow
        </Title>
        <Text
          color="dimmed"
          align="center"
          size="lg"
          sx={{
            "@media (max-width: 992px)": {
              fontSize: 16,
            },
          }}
        >
          The only corporate card and spent management platform designed to help you spend less.
        </Text>

        <Group
          spacing={32}
          sx={{
            "@media (max-width: 992px)": {
              gap: 16,
            },
            "@media (max-width: 576px)": {
              flexDirection: "column",
              alignItems: "stretch",
            },
          }}
          position="center"
          mt={32}
        >
          <Button
            size="lg"
            sx={{
              "@media (max-width: 992px)": {
                height: 48,
              },
            }}
          >
            Get started
          </Button>
          <Button
            size="lg"
            sx={{
              "@media (max-width: 992px)": {
                height: 48,
              },
            }}
          >
            View pricing
          </Button>
        </Group>
      </Box>

      <ColorCircle sx={{ top: "10%", left: "10%", backgroundColor: "#f6c1f5" }} />
      <ColorCircle sx={{ top: "15%", right: "10%", backgroundColor: "#918cf9" }} size={24} />
      <ColorCircle sx={{ left: "15%", bottom: "7%", backgroundColor: "#84e7a7" }} size={24} />
      <ColorCircle sx={{ bottom: "8%", right: "15%", backgroundColor: "#ffee00" }} size={36} />
    </Container>
  )
}

export default CardHero

import { Center, Container, Stack, Title, Group, Button, Text, Box, Image } from "@mantine/core"
import Clicks from "app/core/components/Clicks"
import Link from "next/link"

const HeroFromLanding = () => {
  return (
    <Center
      pt={64}
      pb={64}
      sx={{
        overflowX: "hidden",
      }}
    >
      <Container
        size="xl"
        pb={200}
        sx={{
          position: "relative",
          paddingTop: "48px",
          "@media (max-width: 768px)": {
            paddingTop: "48px",
          },
        }}
      >
        <Box
          sx={{
            width: "700px",
            height: "700px",
            position: "absolute",
            pointerEvents: "none",
            userSelect: "none",
            top: "30px",
            left: "-240px",
            "@media (max-width: 768px)": {
              width: "350px",
              height: "350px",
              top: "110px",
              left: "-140px",
            },
          }}
        >
          <Image src="/landing/purple-circle.png" alt="" />
        </Box>
        <Box
          sx={{
            width: "700px",
            height: "700px",
            position: "absolute",
            pointerEvents: "none",
            userSelect: "none",
            right: "-240px",
            top: "-90px",
            "@media (max-width: 768px)": {
              width: "350px",
              height: "350px",
              right: "-180px",
              top: "-120px",
            },
          }}
        >
          <Image src="/landing/pink-circle.png" alt="" />
        </Box>
        <Stack align="center">
          <Title
            order={1}
            sx={{
              textTransform: "uppercase",
              letterSpacing: "12px",
              fontWeight: 600,
              position: "relative",
              userSelect: "none",
              fontSize: "50px",
              "@media (max-width: 992px)": {
                fontSize: "32px",
                letterSpacing: "9px",
              },
              "@media (max-width: 768px)": {
                fontSize: "24px",
                letterSpacing: "6px",
              },
            }}
            align="center"
          >
            Create your awesome Presentation
          </Title>
          <Group align="center" spacing={4} noWrap mb="md">
            <Text
              sx={{
                fontWeight: 600,
                fontSize: "40px",
                "@media (max-width: 992px)": {
                  fontSize: "26px",
                },
                "@media (max-width: 768px)": {
                  fontSize: "20px",
                },
              }}
            >
              All it takes is just twoclicks
            </Text>
            <Clicks
              sx={{
                marginTop: "12px",
                height: "auto",
                width: "68px",
                "@media (max-width: 992px)": {
                  width: "48px",
                  marginTop: "10px",
                },
                "@media (max-width: 768px)": {
                  width: "32px",
                  marginTop: "8px",
                },
              }}
            />
          </Group>
          <Box
            component="span"
            sx={{
              transition: "0.4s ease all",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Button
              component="a"
              href="/"
              variant="outline"
              size="lg"
              fullWidth
              radius="md"
              sx={{
                maxWidth: "200px",
              }}
            >
              <Text size="xl" sx={{ fontWeight: 600 }}>
                Get started
              </Text>
            </Button>
          </Box>
        </Stack>
      </Container>
    </Center>
  )
}

export default HeroFromLanding

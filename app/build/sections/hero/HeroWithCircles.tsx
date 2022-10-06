import { Container, Box, Title, Text, Button, Group, Stack, Image } from "@mantine/core"

const HeroWithCircles = () => {
  return (
    <Box pt={64} pb={64}>
      <Container size="md" sx={{ position: "relative" }}>
        <Box
          sx={{
            width: "600px",
            height: "600px",
            position: "absolute",
            pointerEvents: "none",
            userSelect: "none",
            top: "-150px",
            zIndex: -1,
            right: "-200px",
            "@media (max-width: 768px)": {
              width: "450px",
              height: "450px",
              top: "-100px",
              right: "-200px",
              opacity: 0.7,
            },
            "@media (max-width: 576px)": {
              // width: "350px",
              // height: "350px",
              // top: "-120px",
              // right: "-100px",
              // opacity: 0.7,
              display: "none",
            },
          }}
        >
          <Image src="/landing/purple-circle.png" alt="" />
        </Box>
        <Box
          sx={{
            width: "500px",
            height: "500px",
            position: "absolute",
            pointerEvents: "none",
            userSelect: "none",
            top: 0,
            zIndex: -1,
            right: "100px",
            "@media (max-width: 768px)": {
              width: "400px",
              height: "400px",
              top: 0,
              right: 0,
              opacity: 0.7,
            },
            "@media (max-width: 576px)": {
              // width: "300px",
              // height: "300px",
              // top: "-20px",
              // right: "50px",
              // opacity: 0.7,
              display: "none",
            },
          }}
        >
          <Image src="/landing/pink-circle.png" alt="" />
        </Box>
        <Stack spacing={20}>
          <Title
            sx={{
              fontSize: "70px",
              "@media (max-width: 768px)": {
                fontSize: "50px",
              },
              "@media (max-width: 576px)": {
                fontSize: "30px",
              },
            }}
          >
            Creating brands to touch hearts and make them stand out
          </Title>
          <Text
            sx={{
              width: "600px",
              "@media (max-width: 576px)": {
                width: "100%",
              },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>
          <Group>
            <Button>Lets talk with us</Button>
            <Button>See our works</Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  )
}

export default HeroWithCircles

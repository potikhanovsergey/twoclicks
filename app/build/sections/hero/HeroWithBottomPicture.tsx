import { Container, Box, Button, Group, Stack, Title, Image, Text } from "@mantine/core"

const HeroWithBottomPicture = () => {
  return (
    <Box
      pb={64}
      pt={64}
      sx={{
        backgroundImage: `url("https://i.ibb.co/RNdRmtN/Group-3-2-1.png")`,
        minHeight: "90vh",
        maxHeight: "600px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "80%",
        backgroundPosition: "bottom",
        "@media (min-width: 1200px)": {
          minHeight: 0,
          height: "1200px",
        },
        "@media (max-width: 992px)": {
          backgroundPosition: "center",
        },
      }}
    >
      <Container size="md">
        <Group
          noWrap
          sx={{
            marginBottom: "40px",
            "@media (max-width: 768px)": {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <Title
            sx={{
              fontSize: "60px",
              "@media (max-width: 992px)": {
                fontSize: "50px",
              },
              "@media (max-width: 768px)": {
                fontSize: "40px",
              },
              "@media (max-width: 576px)": {
                fontSize: "30px",
                alignSelf: "flex-start",
              },
            }}
          >
            Collaboration for 3D artists
          </Title>
          <Stack align="flex-start">
            <Text>No downloads, no coding - all tools you need for 3D in the browser.</Text>
            <Button>Open Tools</Button>
          </Stack>
        </Group>
      </Container>
    </Box>
  )
}

export default HeroWithBottomPicture

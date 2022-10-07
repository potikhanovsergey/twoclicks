import { Container, Box, Button, Group, Stack, Title, Image, Text, Grid } from "@mantine/core"

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
          backgroundPosition: "50% 70%",
        },
      }}
    >
      <Container size="md">
        <Grid
          align="center"
          sx={{
            marginBottom: "40px",
            // "@media (max-width: 768px)": {
            //   flexDirection: "column",
            //   alignItems: "flex-start",
            // },
          }}
        >
          <Grid.Col sm={7} xs={12}>
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
          </Grid.Col>
          <Grid.Col sm={5} xs={12}>
            <Stack align="flex-start">
              <Text>No downloads, no coding - all tools you need for 3D in the browser.</Text>
              <Button>Open Tools</Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}

export default HeroWithBottomPicture

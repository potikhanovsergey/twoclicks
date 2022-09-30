import { Box, Title, Text, Grid, Image, Container, Center, Button, SimpleGrid } from "@mantine/core"

const mockdata = [
  {
    src: "https://ucarecdn.com/1359520b-8f81-40fa-9dba-6a31dcd88717/",
  },
  {
    src: "https://ucarecdn.com/481a2d73-ea4c-4821-ba86-3882d30f10f1/",
  },
  {
    src: "https://ucarecdn.com/fd860466-9bb2-4b99-a276-23e25c61c889/",
  },
]

const GalleryWithButton = () => {
  return (
    <Box my="xl">
      <Container size="xl">
        <Grid
          sx={{
            marginBottom: "40px",
          }}
          align="flex-start"
          columns={10}
        >
          <Grid.Col md={4} sm={10}>
            <Title
              order={2}
              weight="bold"
              sx={{
                fontSize: "50px",
                "@media (max-width: 576px)": {
                  fontSize: "40px",
                },
              }}
            >
              Nice colorful pictures
            </Title>
          </Grid.Col>
          <Grid.Col md={6} sm={10}>
            <Text
              sx={{
                opacity: "50%",
                paddingTop: "14px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore.
            </Text>
          </Grid.Col>
        </Grid>
        <SimpleGrid
          cols={3}
          sx={{ justifyItems: "center", marginBottom: "40px" }}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          {mockdata.map((e, i) => (
            <Image
              key={i}
              src={e.src}
              alt=""
              fit="cover"
              styles={{
                figure: {
                  height: "100%",
                },
                imageWrapper: {
                  height: "100%",
                },
                image: {
                  height: "100% !important",
                },
                root: {
                  height: "100% !important",
                },
              }}
            />
          ))}
        </SimpleGrid>
        <Center>
          <Button size="xl" radius="xl" color="pink" variant="filled">
            See more
          </Button>
        </Center>
      </Container>
    </Box>
  )
}

export default GalleryWithButton

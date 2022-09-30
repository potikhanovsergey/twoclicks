import {
  Box,
  Group,
  Title,
  Text,
  SimpleGrid,
  Image,
  Container,
  Center,
  Button,
} from "@mantine/core"

const mockdata = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVl9KmndCeZTmuX3HS4h7RJ4V8OMl-uoFnQ&usqp=CAU",
  },
  {
    src: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1020.9375&fit=crop&crop=faces",
  },
  {
    src: "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg?w=2000",
  },
]

const GalleryWithButton = () => {
  return (
    <Box my="xl">
      <Container size="xl">
        <Group
          sx={{
            flexWrap: "nowrap",
            marginBottom: "40px",
            "@media (max-width: 768px)": {
              flexWrap: "wrap",
            },
          }}
          align="flex-start"
        >
          <Title
            order={2}
            weight="bold"
            sx={{
              fontSize: "50px",
              width: "40%",
              "@media (max-width: 768px)": {
                width: "100%",
              },
              "@media (max-width: 576px)": {
                fontSize: "40px",
              },
            }}
          >
            Nice colorful pictures
          </Title>
          <Text
            sx={{
              width: "60%",
              opacity: "50%",
              paddingTop: "14px",
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore.
          </Text>
        </Group>
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
                  height: "100%",
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

import {
  Box,
  Group,
  Stack,
  Image,
  Text,
  Title,
  Divider,
  Avatar,
  Container,
  Grid,
} from "@mantine/core"

const mocdata = [
  {
    src: "https://ucarecdn.com/e27efe2b-0379-434d-a1ae-7032cc7c1331/",
    name: "Sergey",
    title: "Moscow",
    desk: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
  },
  {
    src: "https://ucarecdn.com/c7a89916-f499-4fb9-90da-cb89f738c59a/noroot.jpg",
    name: "Darya",
    title: "Moscow",
    desk: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
  },
  {
    src: "https://ucarecdn.com/68af31a6-8891-4116-8cf9-5ee125913524/noroot.png",
    name: "Unicorn",
    title: "Moscow",
    desk: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
  },
]

const FeaturesWithPeople = () => {
  return (
    <Box>
      <Container size="lg" my={20}>
        <Grid columns={12}>
          <Grid.Col sm={4} xs={12}>
            <Image
              src="https://ucarecdn.com/4917b211-08bf-45e4-b9a9-997ebca6d6bc/Body.png"
              alt=""
              height={450}
              width="100%"
              fit="contain"
              sx={{
                "@media (max-width: 576px)": {
                  marginBottom: "20px",
                },
              }}
            />
          </Grid.Col>
          <Grid.Col sm={7} xs={12} sx={{ marginLeft: "10px" }}>
            <Stack>
              <Grid columns={10} sx={{ alignItems: "flex-end" }}>
                <Grid.Col xs={3}>
                  <Title
                    sx={{
                      fontSize: "40px",
                      "@media (max-width: 1200px)": {
                        fontSize: "30px",
                      },
                      "@media (max-width: 992px)": {
                        fontSize: "24px",
                      },
                    }}
                  >
                    Who are our users?
                  </Title>
                </Grid.Col>
                <Grid.Col
                  xs={7}
                  sx={{
                    textAlign: "right",
                    "@media (max-width: 576px)": {
                      textAlign: "left",
                    },
                  }}
                >
                  <Text>We`ve created users personas</Text>
                </Grid.Col>
              </Grid>
              <Divider
                size="sm"
                sx={{
                  marginBottom: "60px",
                  "@media (max-width: 992px)": {
                    marginBottom: "40px",
                  },
                  "@media (max-width: 576px)": {
                    marginBottom: "20px",
                  },
                }}
              />
              <Group
                noWrap
                sx={{
                  "@media (max-width: 576px)": {
                    flexDirection: "column",
                  },
                }}
              >
                {mocdata.map((e, i) => (
                  <Stack key={i} spacing={10}>
                    <Avatar src={e.src} size="lg" radius="xl" />
                    <Text>{e.name}</Text>
                    <Text color="dimmed" size={14}>
                      {e.title}
                    </Text>
                    <Text color="dimmed" size={12}>
                      {e.desk}
                    </Text>
                  </Stack>
                ))}
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}

export default FeaturesWithPeople

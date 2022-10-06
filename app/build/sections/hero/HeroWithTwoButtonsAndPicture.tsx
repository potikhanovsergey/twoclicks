import { Container, Box, Stack, Text, Title, Group, Button, Image } from "@mantine/core"

const HeroWithTwoButtonsAndPicture = () => {
  return (
    <Box
      pt={64}
      pb={64}
      sx={{
        "@media (max-width: 768px) ": {
          paddingTop: "48px",
          paddingBottom: "48px",
        },
        "@media (max-width: 576px)": {
          paddingTop: "24",
          paddingBottom: "24",
        },
      }}
    >
      <Container size="md">
        <Group
          noWrap
          position="apart"
          sx={{ "@media (max-width: 768px)": { display: "flex", flexDirection: "column" } }}
        >
          <Stack
            sx={{
              gap: "40px",
              "@media (max-width: 768px)": { gap: "20px" },
              "@media (max-width: 576px)": { gap: "10px" },
            }}
          >
            <Title
              sx={{
                fontSize: "40px",
                "@media (max-width: 768px)": {
                  fontSize: "30px",
                },
                "@media (max-width: 576px)": {
                  fontSize: "24px",
                },
              }}
            >
              It`s time to start
            </Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <Group>
              <Button>Get started</Button>
              <Button>Watch Demo</Button>
            </Group>
          </Stack>
          <Stack>
            <Image
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              alt=""
              height={400}
              width="100%"
              fit="cover"
            />
          </Stack>
        </Group>
      </Container>
    </Box>
  )
}

export default HeroWithTwoButtonsAndPicture

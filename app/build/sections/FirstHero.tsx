import { Group, Stack, Title, Button, Text, Image, Container } from "@mantine/core"
import { CgAdidas } from "@react-icons/all-files/cg/CgAdidas"

const FirstHero = () => {
  return (
    <Container size="xl">
      <Group position="apart" py="xl" noWrap grow>
        <Stack align="flex-start" justify="center">
          <Title order={1} style={{ fontSize: "40px" }}>
            My First Hero
          </Title>
          <Text size="lg">
            This is my first, but very very important hero section for page builder ^^ Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Button
            variant="gradient"
            gradient={{ from: "dark", to: "red", deg: 60 }}
            rightIcon={<CgAdidas />}
          >
            See my best works
          </Button>
        </Stack>
        <Stack>
          <Image
            radius="md"
            src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            alt="Random unsplash image"
          />
        </Stack>
      </Group>
    </Container>
  )
}

export default FirstHero

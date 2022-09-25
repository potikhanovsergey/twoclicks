import { Group, Stack, Title, Button, Text, Image, Container } from "@mantine/core"
import { CgAdidas } from "@react-icons/all-files/cg/CgAdidas"
import YouTubeFrame from "app/core/components/YoutubeFrame"

const firstHeroVideo = () => {
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
          <YouTubeFrame src="https://mantine.dev/" />
        </Stack>
      </Group>
    </Container>
  )
}

export default firstHeroVideo

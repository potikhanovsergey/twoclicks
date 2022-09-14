import { Container, Title, useMantineTheme } from "@mantine/core"

const WhoIsThisFor = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  return (
    <Container size="xl" px={40}>
      <Title
        order={2}
        size={34}
        sx={{ textTransform: "uppercase", letterSpacing: "8px", fontWeight: 600 }}
        align="right"
      >
        Who is this for
      </Title>
    </Container>
  )
}

export default WhoIsThisFor

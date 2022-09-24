import { Box, Button, Container, Overlay, Text, Title } from "@mantine/core"

const MantineHeroWithContentOnLeft = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container
        sx={{
          height: 700,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          paddingBottom: 144,
          zIndex: 1,
          position: "relative",
          "@media (max-width: 768px)": {
            height: 500,
            paddingBottom: 72,
          },
        }}
      >
        <Title
          sx={{
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#fff",
            "@media (max-width: 768px)": {
              fontSize: 40,
              lineHeight: 1.2,
            },
            "@media (max-width: 576px)": {
              fontSize: 28,
              lineHeight: 1.3,
            },
          }}
        >
          A fully featured React components library
        </Title>
        <Text
          sx={{
            maxWidth: 600,
            color: "#fff",
            "@media (max-width: 768px)": {
              maxWidth: "100%",
              fontSize: 14,
            },
          }}
          size="xl"
          mt="xl"
        >
          Build fully functional accessible web applications faster than ever – Mantine includes
          more than 120 customizable components and hooks to cover you in any situation
        </Text>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          sx={{
            marginTop: 36,
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  )
}

export default MantineHeroWithContentOnLeft

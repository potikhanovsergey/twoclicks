import { createStyles, Overlay, Container, Title, Button, Text, MediaQuery } from "@mantine/core"

export default function HeroContentLeft() {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <MediaQuery smallerThan="sm" styles={{ height: 500, paddingBottom: "48px" }}>
        <Container
          style={{
            height: 700,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            paddingBottom: "96px",
            zIndex: 1,
            position: "relative",
          }}
        >
          <MediaQuery smallerThan="sm" styles={{ fontSize: 40, lineHeight: 1.2 }}>
            <MediaQuery smallerThan="xs" styles={{ fontSize: 28, lineHeight: 1.3 }}>
              <Title
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  lineHeight: 1.1,
                }}
              >
                A fully featured React components library
              </Title>
            </MediaQuery>
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ maxWidth: "100%", fontSize: "14px" }}>
            <Text
              style={{
                maxWidth: 600,
              }}
              size="xl"
              mt="xl"
            >
              Build fully functional accessible web applications faster than ever – Mantine includes
              more than 120 customizable components and hooks to cover you in any situation
            </Text>
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
            <Button
              variant="gradient"
              size="xl"
              radius="xl"
              style={{
                marginTop: "24px",
              }}
            >
              Get started
            </Button>
          </MediaQuery>
        </Container>
      </MediaQuery>
    </div>
  )
}

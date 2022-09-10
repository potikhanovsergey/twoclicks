import { createStyles, Container, Title, Text, Button, MediaQuery } from "@mantine/core"
import Editor from "app/core/components/base/Editor"
import { ReactNode } from "react"

export const MantineTest = () => {
  return (
    <div
      style={{
        backgroundColor: "#11284b",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
        paddingTop: "48px",
        paddingBottom: "48px",
      }}
    >
      <Container size="lg">
        <MediaQuery smallerThan="md" styles={{ flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <MediaQuery smallerThan="md" styles={{ marginRight: 0 }}>
              <div
                style={{
                  paddingTop: "32px",
                  paddingBottom: "32px",
                  marginRight: "48px",
                }}
              >
                <MediaQuery
                  smallerThan="md"
                  styles={{ maxWidth: "100%", fontSize: 34, lineHeight: 1.15 }}
                >
                  <Title
                    style={{
                      color: "#fff",
                      fontFamily: `Greycliff CF`,
                      fontWeight: 900,
                      lineHeight: 1.05,
                      maxWidth: 500,
                      fontSize: 48,
                    }}
                  >
                    A{" "}
                    <Text
                      component="span"
                      inherit
                      variant="gradient"
                      gradient={{ from: "pink", to: "yellow" }}
                    >
                      fully featured
                    </Text>{" "}
                    React components library
                  </Title>
                </MediaQuery>
                <MediaQuery smallerThan="md" styles={{ maxWidth: "100%" }}>
                  <Text
                    style={{
                      color: "#fff",
                      opacity: 0.75,
                      maxWidth: 500,
                    }}
                    mt={30}
                  >
                    <Editor
                      defaultValue={{
                        time: 1635603431943,
                        blocks: [
                          {
                            id: "12iM3lqzcm",
                            type: "paragraph",
                            data: {
                              text: `Build fully functional accessible web applications with ease – Mantine includes
                                more than 100 customizable components and hooks to cover you in any situation`,
                            },
                          },
                        ],
                      }}
                    />
                  </Text>
                </MediaQuery>
                <MediaQuery smallerThan="md" styles={{ width: "100%" }}>
                  <Button
                    variant="gradient"
                    gradient={{ from: "pink", to: "yellow" }}
                    size="xl"
                    style={{
                      paddingLeft: 50,
                      paddingRight: 50,
                      fontFamily: `Greycliff CF`,
                      fontSize: 22,
                    }}
                    mt={40}
                  >
                    Get started
                  </Button>
                </MediaQuery>
              </div>
            </MediaQuery>
          </div>
        </MediaQuery>
      </Container>
    </div>
  )
}

MantineTest.displayName = "@skillcase/mantineTest"

export default MantineTest

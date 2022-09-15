import {
  Container,
  Group,
  Title,
  Image,
  Box,
  Text,
  useMantineTheme,
  Stack,
  Center,
} from "@mantine/core"
import PortfolioLink from "app/build/PortfolioLink"
import SaveButton from "app/build/SaveButton"
import TogglePublishPortfolio from "app/build/TogglePublishPortfolio"

const HowToUseIt = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <>
      <Container size="xl" px={40}>
        <Title
          order={2}
          size={34}
          sx={{ textTransform: "uppercase", letterSpacing: "8px", fontWeight: 600 }}
          align="center"
          mb={120}
        >
          How to use it
        </Title>
        <Stack spacing={96}>
          <Group sx={{ position: "relative" }}>
            <Box
              sx={{
                boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
                borderRadius: "30px",
              }}
            >
              <Image
                src="landing/sections-modal.png"
                alt="sections modal example"
                width={700}
                height="auto"
                radius={10}
              />
            </Box>
            <Box
              p={10}
              sx={{
                boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
                backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                borderRadius: "30px",
                position: "absolute",
                top: "80px",
                right: "5%",
              }}
            >
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                Choose template or start <br />
                from scratch
              </Text>
            </Box>
          </Group>
          <Group position="right" sx={{ position: "relative" }}>
            <Box
              sx={{
                boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
                borderRadius: "30px",
              }}
            >
              <Image
                src="landing/sections-modal.png"
                alt="sections modal example"
                width={700}
                height="auto"
                radius={10}
              />
            </Box>
            <Box
              p={10}
              sx={{
                boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
                backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                borderRadius: "30px",
                position: "absolute",
                top: "180px",
                left: "5%",
              }}
            >
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                Enrich your page by <br />
                adding new sections
              </Text>
            </Box>
          </Group>
          <Group sx={{ position: "relative" }}>
            <Box
              sx={{
                boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
                borderRadius: "30px",
              }}
              ml={120}
            >
              <Image
                src="landing/tools-menu.png"
                alt="sections modal example"
                width={400}
                height="auto"
                radius={10}
              />
            </Box>
            <Box
              p={10}
              sx={{
                boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
                backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                borderRadius: "30px",
                position: "absolute",
                top: "40px",
                right: "10%",
              }}
            >
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                Edit elements and sections <br /> as you wish
              </Text>
            </Box>
          </Group>
          <Group sx={{ position: "relative" }}>
            <Box
              p={10}
              sx={{
                boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
                backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                borderRadius: "30px",
                position: "absolute",
                top: "60px",
                left: "5%",
              }}
            >
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                Save and publish your page
              </Text>
            </Box>
          </Group>
          <Center>
            <Box
              p={10}
              sx={{
                boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
                backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                borderRadius: "30px",
                // position: "absolute",
                // top: "60px",
                // left: "5%",
                width: "400px",
                align: "center",
              }}
            >
              <PortfolioLink id={"1"} />
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                Share with other people <br />
                and you`re done!
              </Text>
            </Box>
          </Center>
        </Stack>
      </Container>
    </>
  )
}

export default HowToUseIt

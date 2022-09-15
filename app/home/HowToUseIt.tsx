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
  Button,
} from "@mantine/core"
import PortfolioLink from "app/build/PortfolioLink"
import SaveButton from "app/build/SaveButton"
import TogglePublishPortfolio from "app/build/TogglePublishPortfolio"
import ShadowCard from "app/core/components/base/ShadowCard"
import { FaEye, FaSave } from "react-icons/fa"
import { AppStore } from "store"

const HowToUseIt = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <>
      <Container
        size="xl"
        px={40}
        sx={{
          backgroundImage: "url(landing/bg-path.svg)",
          backgroundRepeat: "no-repeat",
          overflow: "visible",
          backgroundPosition: "top -200px right - 20px",
        }}
      >
        <Title
          order={2}
          size={34}
          sx={{ textTransform: "uppercase", letterSpacing: "8px", fontWeight: 600 }}
          align="center"
          mb={120}
        >
          How to use it
        </Title>
        <Stack spacing={128}>
          <Group>
            <Box
              sx={{
                boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
                borderRadius: "30px",
                position: "relative",
              }}
            >
              <Image
                src="landing/sections-modal.png"
                alt="sections modal example"
                width={700}
                height="auto"
                radius={10}
              />
              <ShadowCard
                sx={{
                  position: "absolute",
                  top: "80px",
                  right: "-440px",
                }}
              >
                <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                  Choose template or start <br />
                  from scratch
                </Text>
              </ShadowCard>
            </Box>
          </Group>
          <Group position="right">
            <Box
              sx={{
                boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
                borderRadius: "30px",
                position: "relative",
              }}
            >
              <Image
                src="landing/sections-modal.png"
                alt="sections modal example"
                width={700}
                height="auto"
                radius={10}
              />
              <ShadowCard
                sx={{
                  position: "absolute",
                  top: "180px",
                  left: "-360px",
                  zIndex: 1,
                }}
              >
                <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                  Enrich your page by adding <br /> new sections
                </Text>
              </ShadowCard>
            </Box>
          </Group>
          <Group position="center" spacing={140}>
            <Box
              sx={{
                boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
                borderRadius: "30px",
              }}
            >
              <Image
                src="landing/tools-menu.png"
                alt="sections modal example"
                width={400}
                height="auto"
                radius={10}
              />
            </Box>
            <ShadowCard>
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                Edit elements and sections <br /> as you wish
              </Text>
            </ShadowCard>
          </Group>
          <Group position="center" spacing={140}>
            <ShadowCard sx={{ position: "relative", transform: "translateX(-70%)" }}>
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
                Save and publish your page
              </Text>
              <Box
                sx={{
                  position: "absolute",
                  right: "-150px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  gradient={{ from: "violet", to: "red", deg: 60 }}
                  leftIcon={<FaSave />}
                  tabIndex={-1}
                  sx={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: "-38px",
                    left: 0,
                    userSelect: "none",
                  }}
                >
                  Save changes
                </Button>
                <Button
                  variant="filled"
                  color="violet"
                  size="lg"
                  tabIndex={-1}
                  leftIcon={<FaEye />}
                  sx={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: "96px",
                    userSelect: "none",
                  }}
                >
                  Publish portfolio
                </Button>
              </Box>
            </ShadowCard>
          </Group>
          <Center my={48}>
            <ShadowCard
              py={24}
              sx={{
                width: "400px",
              }}
            >
              <PortfolioLink id={"6321d3c786636b3da6ce61e0"} shouldSearch={false} centered />
              <Text weight={700} size={24} sx={{ letterSpacing: "3px" }} align="center">
                Share with other people <br />
                and you`re done!
              </Text>
            </ShadowCard>
          </Center>
        </Stack>
      </Container>
    </>
  )
}

export default HowToUseIt

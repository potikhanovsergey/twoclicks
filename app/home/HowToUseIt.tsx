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
import ShadowCard from "app/core/components/base/ShadowCard"
import { FaEye, FaSave } from "react-icons/fa"
import { useScroll, motion, useTransform } from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const HowToUseIt = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  return (
    <>
      <Container size="xl" px={40} sx={{ position: "relative" }} ref={containerRef}>
        <Box
          component="svg"
          width="790"
          viewBox="0 0 528 945"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{
            position: "absolute",
            top: "206px",
            zIndex: -1,
            transform: "translateX(-50%)",
            left: "50%",
          }}
        >
          <motion.path
            style={{ pathLength: scrollYProgress }}
            d="M502.982 26.5024C511.148 20.8357 525.882 8.70237 519.482 5.50237C513.082 2.30237 505.815 18.169 502.982 26.5024ZM502.982 26.5024C504.815 16.5023 506.782 -2.59792 499.982 1.00221C493.182 4.60234 499.148 19.5024 502.982 26.5024ZM502.982 26.5024C515.482 77.3356 217.504 46.0024 123.504 115.5C7.99911 200.897 19.3619 338.93 23.4984 367C33.0034 431.5 58.4997 484.5 222.982 537.002C391.435 590.771 573.853 595.99 516.5 665.5C474.007 717 180.005 710 72.003 737.5C-25.1533 762.238 -31.9998 840.5 114.484 883.502C196.847 907.681 241.985 927.002 252.985 943.502M252.985 943.502C265.318 939.669 287.885 930.302 279.485 923.502C271.085 916.702 258.318 934.002 252.985 943.502ZM252.985 943.502C258.485 934.669 267.585 916.602 259.985 915.002C252.385 913.402 252.152 933.335 252.985 943.502Z"
            stroke="#845EF7"
          />
        </Box>
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
                maxWidth: "700px",
                width: "63%",
              }}
            >
              <Image
                src="landing/sections-modal.png"
                alt="sections modal example"
                height="auto"
                width="100%"
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
                maxWidth: "700px",
                width: "63%",
              }}
            >
              <Image
                src="landing/sections-modal.png"
                alt="sections modal example"
                width="100%"
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
          <Group position="center" spacing={140} noWrap>
            <Box
              sx={{
                boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
                borderRadius: "30px",
                maxWidth: "400px",
                width: "63%",
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

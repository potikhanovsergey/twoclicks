import {
  Container,
  Group,
  Title,
  Box,
  Text,
  Stack,
  Center,
  Button,
  ContainerProps,
} from "@mantine/core"
import PortfolioLink from "app/build/PortfolioLink"
import ShadowCard from "app/core/components/base/ShadowCard"
import { useScroll, m } from "framer-motion"
import { useRef } from "react"

import { FaEye } from "@react-icons/all-files/fa/FaEye"
import { IoMdSave } from "@react-icons/all-files/io/IoMdSave"
import NextImage from "app/core/components/base/NextImage"

const HowToUseIt = (props: ContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  return (
    <Container size="xl" px={40} sx={{ position: "relative" }} ref={containerRef} {...props}>
      <Box
        component="svg"
        width="790"
        viewBox="0 0 530 950"
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
        <m.path
          style={{ pathLength: scrollYProgress }}
          d="M507.997 29.0001C517.997 24.5 530.497 11 528.997 7.00011C527.241 2.31856 515.497 7.50011 509.997 30.5001C512.83 20.6667 516.797 1 509.997 1C501.497 1 505.497 20 512.997 31C439.497 30.3333 260.798 48.8 133.998 128C-24.5022 227 5.99778 435 124.498 495.5C242.998 556 521.998 585.5 534.498 638C546.998 690.5 374.283 704.934 233.498 721C67 740 -87.5031 784.5 59.9977 859.5C128.496 892.5 243.123 922.5 260.623 948C269.497 942.5 274.243 942.254 282.496 934C289.496 927 280.496 910.5 258.996 951C264.33 940.5 273.396 918.7 264.996 919.5C254.496 920.5 260.623 943 260.623 951"
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
            <Box sx={{ position: "relative", borderRadius: "10px" }}>
              <NextImage
                src="/landing/sections-modal.png"
                alt="sections modal example"
                width={700}
              />
            </Box>
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
            <Box sx={{ position: "relative", borderRadius: "10px" }}>
              <NextImage
                src="/landing/sections-modal.png"
                alt="sections modal example"
                width={700}
              />
            </Box>
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
            <Box
              sx={{
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <NextImage
                src="/landing/tools-menu.png"
                alt="sections modal example"
                width={400}
                layout="fill"
              />
            </Box>
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
                component="span"
                variant="gradient"
                size="lg"
                gradient={{ from: "violet", to: "red", deg: 60 }}
                leftIcon={<IoMdSave />}
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
                component="span"
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
  )
}

export default HowToUseIt

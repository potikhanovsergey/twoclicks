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
import LandingTitle from "app/core/components/base/LandingTitle"

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
        viewBox="0 0 528 945"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        sx={{
          position: "absolute",
          top: "206px",
          zIndex: -1,
          transform: "translateX(-50%)",
          left: "50%",
          "@media (max-width: 1200px)": {
            display: "none",
          },
        }}
      >
        <m.path
          style={{ pathLength: scrollYProgress }}
          d="M502.982 26.5024C511.148 20.8357 525.882 8.70237 519.482 5.50237C513.082 2.30237 505.815 18.169 502.982 26.5024ZM502.982 26.5024C504.815 16.5023 506.782 -2.59792 499.982 1.00221C493.182 4.60234 499.148 19.5024 502.982 26.5024ZM502.982 26.5024C515.482 77.3356 217.504 46.0024 123.504 115.5C7.99911 200.897 19.3619 338.93 23.4984 367C33.0034 431.5 58.4997 484.5 222.982 537.002C391.435 590.771 573.853 595.99 516.5 665.5C474.007 717 180.005 710 72.003 737.5C-25.1533 762.238 -31.9998 840.5 114.484 883.502C196.847 907.681 241.985 927.002 252.985 943.502M252.985 943.502C265.318 939.669 287.885 930.302 279.485 923.502C271.085 916.702 258.318 934.002 252.985 943.502ZM252.985 943.502C258.485 934.669 267.585 916.602 259.985 915.002C252.385 913.402 252.152 933.335 252.985 943.502Z"
          stroke="#845EF7"
        />
      </Box>
      <LandingTitle>How to use it</LandingTitle>
      <Stack
        sx={{
          gap: "128px",
          "@media (max-width: 768px)": {
            alignItems: "center",
            gap: "64px",
          },
        }}
      >
        <Box
          sx={{
            boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
            borderRadius: "30px",
            position: "relative",
            maxWidth: "700px",
            width: "63%",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "10px",
              "@media (max-width: 768px)": {
                paddingTop: "110px",
              },
            }}
          >
            <ShadowCard
              sx={{
                position: "absolute",
                top: "80px",
                right: "-60%",
                zIndex: 1,
                "@media (max-width: 768px)": {
                  right: 0,
                  top: 0,
                },
              }}
            >
              <Text
                weight={700}
                sx={{
                  letterSpacing: "3px",
                  fontSize: "24px",
                  "@media (max-width: 992px)": {
                    fontSize: "20px",
                  },
                  "@media (max-width: 768px)": {
                    fontSize: "16px",
                  },
                }}
              >
                Choose template or start <br />
                from scratch
              </Text>
            </ShadowCard>
            <NextImage
              src="/landing/sections-modal.png"
              alt="sections modal example"
              sx={{
                width: "700px",
                "@media (max-width: 992px)": {
                  width: "500px",
                },
                "@media (max-width: 768px)": {
                  width: "300px",
                },
              }}
            />
          </Box>
        </Box>
        <Group position="right">
          <Box
            sx={{
              boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
              borderRadius: "30px",
              position: "relative",
              maxWidth: "700px",
              width: "63%",
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "10px",
                "@media (max-width: 768px)": {
                  paddingTop: "110px",
                },
              }}
            >
              <ShadowCard
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "-50%",
                  zIndex: 1,
                  "@media (max-width: 768px)": {
                    left: 0,
                    top: 0,
                  },
                }}
              >
                <Text
                  weight={700}
                  sx={{
                    letterSpacing: "3px",
                    fontSize: "24px",
                    "@media (max-width: 992px)": {
                      fontSize: "20px",
                    },
                    "@media (max-width: 768px)": {
                      fontSize: "16px",
                    },
                  }}
                >
                  Enrich your page by adding <br /> new sections
                </Text>
              </ShadowCard>
              <NextImage
                src="/landing/sections-modal.png"
                alt="sections modal example"
                sx={{
                  width: "700px",
                  "@media (max-width: 992px)": {
                    width: "500px",
                  },
                  "@media (max-width: 768px)": {
                    width: "300px",
                  },
                }}
              />
            </Box>
          </Box>
        </Group>
        <Group
          position="center"
          noWrap
          sx={{
            gap: "12%",
            "@media (max-width: 768px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Box
            sx={{
              boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
              borderRadius: "30px",
              maxWidth: "400px",
              width: "63%",
              "@media (max-width: 768px)": {
                width: "80%",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "10px",
                "@media (max-width: 768px)": {
                  paddingTop: "36px",
                },
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
            <Text
              weight={700}
              sx={{
                letterSpacing: "3px",
                fontSize: "24px",
                "@media (max-width: 992px)": {
                  fontSize: "20px",
                },
                "@media (max-width: 768px)": {
                  fontSize: "16px",
                },
              }}
            >
              Edit elements and sections <br /> as you wish
            </Text>
          </ShadowCard>
        </Group>

        <ShadowCard
          sx={{
            position: "relative",
            transform: "translateX(-70%)",
            margin: "0 auto",
            "@media (max-width: 992px)": {
              transform: "translateX(-50%)",
            },
            "@media (max-width: 768px)": {
              transform: "none",
              margin: "0 auto 100px",
            },
          }}
        >
          <Text
            weight={700}
            sx={{
              letterSpacing: "3px",
              fontSize: "24px",
              "@media (max-width: 992px)": {
                fontSize: "20px",
              },
              "@media (max-width: 768px)": {
                fontSize: "16px",
              },
            }}
          >
            Save and publish your page
          </Text>
          <Box
            sx={{
              position: "absolute",
              right: "-180px",
              top: "50%",
              transform: "translateY(-50%)",
              "@media (max-width: 992px)": {
                right: "-48px",
              },
              "@media (max-width: 768px)": {
                top: "125px",
                right: "auto",
                transform: "none",
              },
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
                fontSize: "24px",
                "@media (max-width: 992px)": {
                  fontSize: "20px",
                },
                "@media (max-width: 768px)": {
                  fontSize: "16px",
                },
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
        <Center my={48}>
          <ShadowCard
            py={24}
            sx={{
              width: "400px",
            }}
          >
            <PortfolioLink id={"6321d3c786636b3da6ce61e0"} shouldSearch={false} centered />
            <Text
              weight={700}
              sx={{
                letterSpacing: "3px",
                fontSize: "24px",
                "@media (max-width: 992px)": {
                  fontSize: "20px",
                },
                "@media (max-width: 768px)": {
                  fontSize: "16px",
                },
              }}
              align="center"
            >
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

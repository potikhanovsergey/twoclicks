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
  useMantineTheme,
} from "@mantine/core"
import PageLink from "app/build/PageLink"
import ShadowCard from "app/core/components/base/ShadowCard"
import { useScroll, m } from "framer-motion"
import { useRef } from "react"

import { FaEye } from "@react-icons/all-files/fa/FaEye"
import { IoMdSave } from "@react-icons/all-files/io/IoMdSave"
import NextImage from "app/core/components/base/NextImage"
import LandingTitle from "app/core/components/base/LandingTitle"
import Image from "next/image"
import useTranslation from "next-translate/useTranslation"

const HowToUseIt = (props: ContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  const { t } = useTranslation("landing")
  const theme = useMantineTheme()
  return (
    <Container size="xl" px={40} ref={containerRef} {...props}>
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
          "@media (max-width: 1200px)": {
            display: "none",
          },
        }}
      >
        <m.path
          style={{ pathLength: scrollYProgress }}
          d="M507.997 29.0001C517.997 24.5 530.497 11 528.997 7.00011C527.241 2.31856 515.497 7.50011 509.997 30.5001C512.83 20.6667 516.797 1 509.997 1C501.497 1 505.497 20 512.997 31C439.497 30.3333 260.798 48.8 133.998 128C-24.5022 227 5.99778 435 124.498 495.5C242.998 556 521.998 585.5 534.498 638C546.998 690.5 374.283 704.934 233.498 721C67 740 -87.5031 784.5 59.9977 859.5C128.496 892.5 243.123 922.5 260.623 948C269.497 942.5 274.243 942.254 282.496 934C289.496 927 280.496 910.5 258.996 951C264.33 940.5 273.396 918.7 264.996 919.5C254.496 920.5 260.623 943 260.623 951"
          stroke={theme.colors.primary[5] as "string"}
        />
      </Box>
      <LandingTitle
        align="center"
        sx={{
          marginBottom: "120px",
          "@media (max-width: 992px)": {
            marginBottom: "40px",
          },
        }}
      >
        {t("howToUseIt")}
      </LandingTitle>
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
                  maxWidth: "320px",
                  "@media (max-width: 992px)": {
                    fontSize: "20px",
                  },
                  "@media (max-width: 768px)": {
                    fontSize: "16px",
                  },
                }}
              >
                {t("chooseTemplate")}
              </Text>
            </ShadowCard>
            <Box
              sx={{
                position: "relative",
                width: "715px",
                height: "331px",
                "> *": {
                  boxShadow: `${theme.fn.rgba(theme.colors.violet[5], 0.2)} 0px 8px 24px`,
                  borderRadius: "4px",
                },
                "@media (max-width: 992px)": {
                  width: "500px",
                  height: "auto",
                },
                "@media (max-width: 768px)": {
                  width: "300px",
                },
              }}
            >
              <Image
                src="/landing/empty.jpg"
                alt="sections modal example"
                layout="responsive"
                width={2422}
                height={1128}
              />
            </Box>
          </Box>
        </Box>
        <Group position="right" sx={{ width: "100%" }}>
          <Box
            sx={{
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
                    maxWidth: "400px",
                    "@media (max-width: 992px)": {
                      fontSize: "20px",
                    },
                    "@media (max-width: 768px)": {
                      fontSize: "16px",
                      maxWidth: "300px",
                    },
                  }}
                >
                  {t("enrichYourPage")}
                </Text>
              </ShadowCard>
              <Box
                sx={{
                  width: "715px",
                  height: "331px",
                  position: "relative",

                  "> *": {
                    boxShadow: `${theme.fn.rgba(theme.colors.violet[5], 0.2)} 0px 8px 24px`,
                    borderRadius: "4px",
                  },
                  "@media (max-width: 992px)": {
                    width: "500px",
                  },
                  "@media (max-width: 768px)": {
                    width: "300px",
                    height: "auto",
                    marginLeft: "auto",
                  },
                }}
              >
                <Image
                  src="/landing/modal.jpg"
                  alt="sections modal example"
                  layout="responsive"
                  objectFit="cover"
                  width={2386}
                  height={1128}
                />
              </Box>
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
              borderRadius: "30px",
              maxWidth: "400px",
              width: "63%",
              "@media (max-width: 768px)": {
                width: "80%",
                paddingTop: "36px",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "10px",
                boxShadow: `${theme.fn.rgba(theme.colors.violet[5], 0.2)} 0px 8px 24px`,
              }}
            >
              <NextImage
                src="/landing/tools.jpg"
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
                maxWidth: "320px",
                "@media (max-width: 992px)": {
                  fontSize: "20px",
                },
                "@media (max-width: 768px)": {
                  fontSize: "16px",
                },
              }}
            >
              {t("editElements")}
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
            {t("saveAndPublish")}
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
                top: "155px",
                right: "auto",
                left: "10px",
                transform: "none",
              },
            }}
          >
            <Button
              component="span"
              // variant="gradient"
              size="lg"
              // gradient={{ from: "primary", to: "red", deg: 60 }}
              variant="filled"
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
                  fontSize: "14px",
                  height: "40px",
                },
              }}
            >
              {t("saveChanges")}
            </Button>
            <Button
              component="span"
              color="dark"
              size="lg"
              tabIndex={-1}
              leftIcon={<FaEye />}
              sx={{
                pointerEvents: "none",
                position: "absolute",
                top: 0,
                left: "96px",
                userSelect: "none",
                "@media (max-width: 768px)": {
                  fontSize: "14px",
                  height: "40px",
                },
              }}
            >
              {t("publishPage")}
            </Button>
          </Box>
        </ShadowCard>
        <Center my={40}>
          <ShadowCard
            py={24}
            sx={{
              maxWidth: "400px",
            }}
          >
            <PageLink id={"6321d3c786636b3da6ce61e0"} centered withEllipsis />
            <Text
              weight={700}
              sx={{
                letterSpacing: "3px",
                fontSize: "24px",
                maxWidth: "320px",
                "@media (max-width: 992px)": {
                  fontSize: "20px",
                },
                "@media (max-width: 768px)": {
                  fontSize: "16px",
                },
              }}
              align="center"
            >
              {t("sharePage")}
            </Text>
          </ShadowCard>
        </Center>
      </Stack>
    </Container>
  )
}

export default HowToUseIt

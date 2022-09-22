import {
  Stack,
  Title,
  Text,
  Button,
  Container,
  useMantineTheme,
  Center,
  Group,
  Box,
  createStyles,
  BoxProps,
} from "@mantine/core"
import Clicks from "app/core/components/Clicks"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, m } from "framer-motion"

import Image from "next/image"
import Link from "next/link"

const TextLoop = () => {
  const [index, setIndex] = useState(0)
  const theme = useMantineTheme()

  const titles = useMemo(() => {
    return [
      {
        color: theme.colors.red[5],
        text: "Page",
      },
      {
        color: theme.colors.indigo[5],
        text: "Portfolio",
      },
      {
        color: theme.colors.pink[5],
        text: "Presentation",
      },
      {
        color: theme.colors.violet[5],
        text: "Landing",
      },
    ]
  }, [])

  const variants = useMemo(() => {
    return {
      enter: () => {
        return {
          y: -30,
          opacity: 0,
        }
      },
      center: {
        zIndex: 1,
        y: 0,
        opacity: 1,
      },
      exit: () => {
        return {
          zIndex: 0,
          opacity: 0,
          y: 30,
        }
      },
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1
      if (next === titles.length) {
        next = 0
      }
      setIndex(next)
    }, 3 * 1000)
  }, [index])

  return (
    <Center
      sx={{
        height: "70px",
        "@media (max-width: 768px)": {
          height: "48px",
        },
      }}
    >
      <AnimatePresence>
        <m.span
          style={{
            position: "absolute",
            textTransform: "uppercase",
            fontWeight: 700,
            color: titles[index].color,
          }}
          variants={variants}
          key={index}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 200 },
            opacity: { duration: 0.5 },
          }}
        >
          {titles[index].text}
        </m.span>
      </AnimatePresence>
    </Center>
  )
}

const HomeHero = (props: BoxProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <Center sx={{ minHeight: "calc(100vh - var(--layout-header-height))" }} {...props}>
      <Container
        size="xl"
        pb={200}
        sx={{
          position: "relative",
          paddingTop: "80px",
          "@media (max-width: 768px)": {
            paddingTop: "40px",
          },
        }}
      >
        <Box
          component={m.span}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }}
          transition={{ duration: 0.7 }}
          sx={{
            width: "700px",
            height: "700px",
            position: "absolute",
            pointerEvents: "none",
            zIndex: -1,
            userSelect: "none",
            top: "30px",
            left: "-240px",
            "@media (max-width: 768px)": {
              width: "350px",
              height: "350px",
              top: "110px",
              left: "-140px",
            },
          }}
        >
          <Image
            src="/landing/purple-circle.png"
            quality={1}
            layout="fill"
            objectFit="cover"
            alt=""
            // sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
            // sizes="(max-width: 768px) 300px, (min-width: 768px) 700px"
          />
        </Box>
        <Box
          component={m.span}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }}
          transition={{ duration: 0.7 }}
          sx={{
            width: "700px",
            height: "700px",
            position: "absolute",
            pointerEvents: "none",
            zIndex: -1,
            userSelect: "none",
            right: "-240px",
            top: "-90px",
            "@media (max-width: 768px)": {
              width: "350px",
              height: "350px",
              right: "-180px",
              top: "-120px",
            },
          }}
        >
          <Image
            src="/landing/pink-circle.png"
            width={700}
            height={700}
            quality={1}
            layout="responsive"
            alt=""
            sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
          />
        </Box>
        <Stack align="center">
          <Title
            order={1}
            sx={{
              textTransform: "uppercase",
              letterSpacing: "12px",
              fontWeight: 600,
              position: "relative",
              userSelect: "none",
              fontSize: "50px",
              "@media (max-width: 992px)": {
                fontSize: "32px",
                letterSpacing: "9px",
              },
              "@media (max-width: 768px)": {
                fontSize: "24px",
                letterSpacing: "6px",
              },
            }}
            align="center"
          >
            Create your awesome <br />
            <TextLoop />
          </Title>
          <Group align="center" spacing={4} noWrap mb="md">
            <Text
              sx={{
                fontWeight: 600,
                fontSize: "40px",
                "@media (max-width: 992px)": {
                  fontSize: "26px",
                },
                "@media (max-width: 768px)": {
                  fontSize: "20px",
                },
              }}
            >
              All it takes is just twoclicks
            </Text>
            <Clicks
              sx={{
                marginTop: "12px",
                height: "auto",
                width: "68px",
                "@media (max-width: 992px)": {
                  width: "48px",
                  marginTop: "10px",
                },
                "@media (max-width: 768px)": {
                  width: "32px",
                  marginTop: "8px",
                },
              }}
            />
          </Group>
          <Box
            component="span"
            sx={{
              transition: "0.4s ease all",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Link href="/build" passHref>
              <Button
                component="a"
                variant="outline"
                color={dark ? "gray.0" : "dark.9"}
                size="lg"
                fullWidth
                radius="md"
                sx={{
                  maxWidth: "200px",
                }}
              >
                <Text size="xl" sx={{ fontWeight: 600 }}>
                  Get started
                </Text>
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Center>
  )
}

export default HomeHero

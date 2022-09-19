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
} from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import Clicks from "app/core/components/Clicks"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, m } from "framer-motion"

import Image from "next/image"

const useStyles = createStyles((theme) => ({
  image: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: -1,
    userSelect: "none",
    width: "700px",
    height: "700px",
  },
}))

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
  }, [index, setIndex])

  return (
    <Center style={{ height: "70px" }}>
      <AnimatePresence>
        <m.span
          style={{
            position: "absolute",
            textTransform: "uppercase",
            letterSpacing: "12px",
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

const HomeHero = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("pagesHome")

  const { classes } = useStyles()
  return (
    <Center sx={{ minHeight: "calc(100vh - var(--layout-header-height))" }}>
      <Container
        size="xl"
        pt={80}
        pb={200}
        sx={{
          position: "relative",
        }}
      >
        <m.span
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }}
          transition={{ duration: 0.7 }}
          className={classes.image}
          style={{
            top: "30px",
            left: "-240px",
          }}
        >
          <Image
            src="/landing/purple-circle.png"
            width={700}
            quality={1}
            height={700}
            layout="responsive"
            alt=""
            sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
          />
        </m.span>
        <m.span
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }}
          transition={{ duration: 0.7 }}
          className={classes.image}
          style={{
            right: "-240px",
            top: "-90px",
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
        </m.span>
        <Stack align="center">
          <Title
            order={1}
            sx={{
              textTransform: "uppercase",
              letterSpacing: "12px",
              fontWeight: 600,
              position: "relative",
            }}
            size={50}
          >
            Create your awesome <br />
            <TextLoop />
          </Title>
          <Group align="center" spacing={4} noWrap mb="md">
            <Text size={40} sx={{ fontWeight: 600 }}>
              All it takes is just twoclicks
            </Text>
            <Clicks width="68px" style={{ marginTop: "12px", height: "auto" }} />
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
            <Button
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
          </Box>
        </Stack>
      </Container>
    </Center>
  )
}

export default HomeHero

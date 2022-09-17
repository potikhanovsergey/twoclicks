import {
  Stack,
  Title,
  Text,
  Button,
  Container,
  useMantineTheme,
  Center,
  Group,
  Image,
  Box,
} from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import Clicks from "app/core/components/Clicks"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const variants = {
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
        color: theme.colors.green[5],
        text: "Presentation",
      },
      {
        color: theme.colors.violet[5],
        text: "Landing",
      },
    ]
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
        <motion.span
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
        </motion.span>
      </AnimatePresence>
    </Center>
  )
}

const HomeHero = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("pagesHome")

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
        <motion.span
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="landing/purple-circle.png"
            sx={{
              position: "absolute",
              pointerEvents: "none",
              top: "30px",
              left: "-240px",
              zIndex: -1,
              userSelect: "none",
            }}
            alt="Purple circle decoration"
            width={700}
            height={700}
          />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="landing/pink-circle.png"
            sx={{
              position: "absolute",
              pointerEvents: "none",
              top: "-90px",
              right: "-240px",
              zIndex: -1,
              userSelect: "none",
            }}
            alt="Pink circle decoration"
            width={700}
            height={700}
          />
        </motion.span>
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
          <Button
            variant="outline"
            color={dark ? "gray.0" : "dark.9"}
            size="lg"
            fullWidth
            radius="md"
            sx={{
              maxWidth: "200px",
              transition: "0.4s ease all",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Text size="xl" sx={{ fontWeight: 600 }}>
              Get started
            </Text>
          </Button>
        </Stack>
      </Container>
    </Center>
  )
}

export default HomeHero

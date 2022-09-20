import {
  Center,
  Container,
  Stack,
  StackProps,
  Title,
  useMantineTheme,
  Text,
  ContainerProps,
} from "@mantine/core"
import { m, useInView } from "framer-motion"
import { ReactNode, useRef, useState } from "react"

import { BiCodeAlt } from "@react-icons/all-files/bi/BiCodeAlt"
import { FaLaptop } from "@react-icons/all-files/fa/FaLaptop"
import { FaRegHeart } from "@react-icons/all-files/fa/FaRegHeart"
import { FiCamera } from "@react-icons/all-files/fi/FiCamera"
import { HiOutlineLightBulb } from "@react-icons/all-files/hi/HiOutlineLightBulb"
import { FaPalette } from "@react-icons/all-files/fa/FaPalette"
import { RiQuillPenLine } from "@react-icons/all-files/ri/RiQuillPenLine"

interface CardProps extends StackProps {
  icon: ReactNode
  text: string
  isTextVisible?: boolean
  initial?: {
    [key: string]: unknown
  }
  animate?: {
    [key: string]: unknown
  }
}

const Card = ({
  icon,
  text,
  sx,
  children,
  initial,
  animate,
  isTextVisible = false,
  ...rest
}: CardProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  const [textVisible, setTextVisible] = useState(isTextVisible)
  return (
    <m.div
      style={{ position: "absolute" }}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.75, delay: 0.3, ease: "easeOut" }}
      onAnimationStart={() => {
        !isTextVisible && setTextVisible(false)
      }}
      onAnimationComplete={() => {
        !isTextVisible && setTextVisible(true)
      }}
    >
      <Stack
        align="center"
        spacing={4}
        sx={{
          whiteSpace: "nowrap",
          ...sx,
        }}
        {...rest}
      >
        <Center
          sx={(theme) => ({
            width: "80px",
            height: "80px",
            boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
            backgroundColor: dark ? theme.colors.dark[6] : theme.white,
            borderRadius: "10px",
            svg: {
              width: "40%",
              height: "auto",
            },
          })}
        >
          {icon}
        </Center>
        <Text
          sx={{
            letterSpacing: "3px",
            opacity: textVisible ? 1 : 0,
            transition: "0.4s ease opacity",
          }}
          weight={700}
        >
          {text}
        </Text>
        {children}
      </Stack>
    </m.div>
  )
}

const Cards: CardProps[] = [
  {
    icon: <BiCodeAlt />,
    text: "developer",
    initial: {
      y: 0,
      x: 0,
      opacity: 0,
    },
    animate: {
      y: -96,
      x: -308,
      opacity: 1,
    },
    sx: {
      transform: "rotate(15deg)",
    },
  },
  {
    icon: <RiQuillPenLine />,
    text: "writer",
    initial: {
      y: 0,
      x: 0,
      opacity: 0,
    },
    animate: {
      y: -228,
      x: -40,
      opacity: 1,
    },
    sx: {
      transform: "rotate(15deg)",
    },
  },
  {
    icon: <FaLaptop />,
    text: "freelancer",
    initial: {
      y: 0,
      x: 0,
      opacity: 0,
    },
    animate: {
      y: -160,
      x: 260,
      opacity: 1,
    },
    sx: {
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <HiOutlineLightBulb />,
    text: "startup",
    initial: {
      y: 0,
      x: 0,
      opacity: 0,
    },
    animate: {
      y: 100,
      x: 308,
      opacity: 1,
    },
    sx: {
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <FiCamera />,
    text: "photographer",
    initial: {
      y: 0,
      x: 0,
      opacity: 0,
    },
    animate: {
      y: 228,
      x: 40,
      opacity: 1,
    },
    sx: {
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <FaPalette />,
    text: "designer",
    initial: {
      y: 0,
      x: 0,
      opacity: 0,
    },
    animate: {
      y: 140,
      x: -240,
      opacity: 1,
    },
    sx: {
      transform: "rotate(15deg)",
    },
  },
]

const WhoIsThisFor = (props: ContainerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: false,
  })

  return (
    <Container size="xl" px={40} {...props}>
      <Title
        order={2}
        size={34}
        sx={{ textTransform: "uppercase", letterSpacing: "8px", fontWeight: 600 }}
        align="right"
      >
        Who is this for
      </Title>
      <Center mt={64} sx={{ minHeight: "500px" }}>
        <div ref={ref}>
          <Card
            icon={<FaRegHeart />}
            text={"you"}
            isTextVisible
            sx={{
              position: "relative",
            }}
          >
            {Cards.map((card, i) => {
              return <Card {...card} key={i} animate={inView ? card.animate : card.initial} />
            })}
          </Card>
        </div>
      </Center>
    </Container>
  )
}

export default WhoIsThisFor

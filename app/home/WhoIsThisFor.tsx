import {
  Center,
  Container,
  Stack,
  StackProps,
  Title,
  useMantineTheme,
  Text,
  Box,
} from "@mantine/core"
import { ReactNode } from "react"
import { BiCodeAlt } from "react-icons/bi"
import { FaLaptopHouse, FaRegHeart } from "react-icons/fa"
import { FiCamera } from "react-icons/fi"
import { HiOutlineLightBulb } from "react-icons/hi"
import { MdOutlineDesignServices } from "react-icons/md"
import { RiQuillPenLine } from "react-icons/ri"

interface CardProps extends StackProps {
  icon: ReactNode
  text: string
}

const Card = ({ icon, text, sx, ...rest }: CardProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <Stack
      align="center"
      spacing={4}
      sx={{
        position: "absolute",
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
      <Text sx={{ letterSpacing: "3px" }} weight={700}>
        {text}
      </Text>
    </Stack>
  )
}

const Cards: CardProps[] = [
  {
    icon: <BiCodeAlt />,
    text: "developer",
    sx: {
      top: "128px",
      left: "178px",
      transform: "rotate(15deg)",
    },
  },
  {
    icon: <RiQuillPenLine />,
    text: "writer",
    sx: {
      top: "-20px",
      left: "500px",
      transform: "rotate(15deg)",
    },
  },
  {
    icon: <FaLaptopHouse />,
    text: "freelancer",
    sx: {
      top: "40px",
      right: "256px",
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <HiOutlineLightBulb />,
    text: "startup",
    sx: {
      top: "300px",
      right: "230px",
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <FiCamera />,
    text: "photographer",
    sx: {
      top: "440px",
      right: "500px",
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <MdOutlineDesignServices />,
    text: "designer",
    sx: {
      top: "360px",
      left: "250px",
      transform: "rotate(15deg)",
    },
  },
  {
    icon: <FaRegHeart />,
    text: "you",
    sx: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
]

const WhoIsThisFor = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  return (
    <Container size="xl" px={40}>
      <Title
        order={2}
        size={34}
        sx={{ textTransform: "uppercase", letterSpacing: "8px", fontWeight: 600 }}
        align="right"
      >
        Who is this for
      </Title>
      <Box mt={64} sx={{ position: "relative", minHeight: "500px" }}>
        {Cards.map((card, i) => (
          <Card {...card} key={i} />
        ))}
      </Box>
    </Container>
  )
}

export default WhoIsThisFor

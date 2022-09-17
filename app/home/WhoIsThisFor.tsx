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

const Card = ({ icon, text, sx, children, ...rest }: CardProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <Stack
      align="center"
      spacing={4}
      sx={{
        position: "absolute",
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
      <Text sx={{ letterSpacing: "3px" }} weight={700}>
        {text}
      </Text>
      {children}
    </Stack>
  )
}

const Cards: CardProps[] = [
  {
    icon: <BiCodeAlt />,
    text: "developer",
    sx: {
      top: "-96px",
      left: "-308px",
      transform: "rotate(15deg)",
    },
  },
  {
    icon: <RiQuillPenLine />,
    text: "writer",
    sx: {
      top: "-228px",
      left: "-40px",
      transform: "rotate(15deg)",
    },
  },
  {
    icon: <FaLaptopHouse />,
    text: "freelancer",
    sx: {
      top: "-160px",
      right: "-260px",
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <HiOutlineLightBulb />,
    text: "startup",
    sx: {
      bottom: "-100px",
      right: "-308px",
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <FiCamera />,
    text: "photographer",
    sx: {
      bottom: "-228px",
      left: "40px",
      transform: "rotate(-15deg)",
    },
  },
  {
    icon: <MdOutlineDesignServices />,
    text: "designer",
    sx: {
      bottom: "-140px",
      left: "-240px",
      transform: "rotate(15deg)",
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
      <Center mt={64} sx={{ minHeight: "500px" }}>
        <Card
          icon={<FaRegHeart />}
          text={"you"}
          sx={{
            position: "relative",
          }}
        >
          {Cards.map((card, i) => (
            <Card {...card} key={i} />
          ))}
        </Card>
      </Center>
    </Container>
  )
}

export default WhoIsThisFor

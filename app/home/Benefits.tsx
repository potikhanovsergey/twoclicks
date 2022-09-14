import {
  Box,
  Container,
  SimpleGrid,
  Title,
  Text,
  Stack,
  Center,
  AspectRatio,
  Space,
  useMantineTheme,
} from "@mantine/core"
import { ReactNode, useMemo } from "react"
import { FiEdit } from "react-icons/fi"
import {
  HiOutlineDeviceMobile,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineTemplate,
} from "react-icons/hi"
import { TbClick } from "react-icons/tb"

interface BenefitsCardProps {
  title: string
  icon: ReactNode
  text: ReactNode
}

const BenefitsCard = ({ title, icon, text }: BenefitsCardProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <Stack align="center" spacing={0}>
      <Text weight={700} size={28} mb="sm">
        {title}
      </Text>
      <AspectRatio
        mb="lg"
        sx={{
          width: "60%",
          boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
          backgroundColor: dark ? theme.colors.dark[6] : theme.white,
          borderRadius: "10px",
          maxWidth: "200px",
          svg: {
            width: "25%",
            height: "auto",
          },
          "svg, path": {
            strokeWidth: 1.3,
          },
        }}
        ratio={16 / 10}
      >
        <Center>{icon}</Center>
      </AspectRatio>
      <Text weight={600} size={24} align="center">
        {text}
      </Text>
    </Stack>
  )
}

const Benefits = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  const BenefitsCards: BenefitsCardProps[] = useMemo(() => {
    return [
      {
        title: "Fast",
        icon: <HiOutlineLightningBolt color={theme.colors.yellow[5]} />,
        text: (
          <>
            Make a page while <br /> drinking your tea
          </>
        ),
      },
      {
        title: "Simple",
        icon: <TbClick color={theme.colors.green[5]} />,
        text: (
          <>
            Click on element <br /> you want to edit
          </>
        ),
      },
      {
        title: "Fancy",
        icon: <HiOutlineSparkles color={theme.colors.pink[5]} />,
        text: (
          <>
            Predesigned <br /> theme and palette
          </>
        ),
      },
      {
        title: "Responsive",
        icon: <HiOutlineDeviceMobile color={theme.colors.blue[5]} />,
        text: (
          <>
            Looks good on
            <br /> different devices
          </>
        ),
      },
      {
        title: "Templates",
        icon: <HiOutlineTemplate color={theme.colors.red[5]} />,
        text: (
          <>
            Don`t think on <br /> design, it`s ready
          </>
        ),
      },
      {
        title: "Customizible",
        icon: <FiEdit color={theme.colors.violet[5]} />,
        text: (
          <>
            Edit any element <br /> however you want
          </>
        ),
      },
    ]
  }, [])
  return (
    <Container size="xl" px={40}>
      <Title
        order={2}
        size={34}
        sx={{ textTransform: "uppercase", letterSpacing: "8px", fontWeight: 600 }}
      >
        Our benefits
      </Title>
      <Space h={40} />
      <Box
        sx={{
          width: "auto",
          boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
          borderRadius: "50px",
          backgroundColor: dark ? theme.colors.dark[7] : theme.white,
        }}
        px="xl"
        py={64}
      >
        <SimpleGrid cols={3} spacing={0} sx={{ rowGap: "116px" }}>
          {BenefitsCards.map((card, i) => (
            <BenefitsCard {...card} key={i} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default Benefits

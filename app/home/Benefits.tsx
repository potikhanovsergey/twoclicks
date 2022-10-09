import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Stack,
  Center,
  AspectRatio,
  Space,
  useMantineTheme,
  ContainerProps,
} from "@mantine/core"
import { ReactNode, useMemo, useRef } from "react"
import { AnimatePresence, m, useInView } from "framer-motion"

import { FiEdit } from "@react-icons/all-files/fi/FiEdit"
import { HiOutlineLightningBolt } from "@react-icons/all-files/hi/HiOutlineLightningBolt"
import { HiOutlineSparkles } from "@react-icons/all-files/hi/HiOutlineSparkles"
import { HiOutlineTemplate } from "@react-icons/all-files/hi/HiOutlineTemplate"
import { BsPhone } from "@react-icons/all-files/bs/BsPhone"
import { HiCursorClick } from "@react-icons/all-files/hi/HiCursorClick"
import LandingTitle from "app/core/components/base/LandingTitle"
import useTranslation from "next-translate/useTranslation"

interface BenefitsCardProps {
  title: string
  icon: ReactNode
  text: ReactNode
}

const BenefitsCard = ({ title, icon, text }: BenefitsCardProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("landing")

  return (
    <m.div initial="initial" whileHover="hover">
      <Stack align="center" spacing={0}>
        <Text
          weight={700}
          mb="sm"
          sx={{
            fontSize: "28px",
            "@media (max-width: 992px)": {
              fontSize: "24px",
            },
            "@media (max-width: 768px)": {
              fontSize: "22px",
            },
          }}
        >
          {t(title)}
        </Text>
        <Box
          sx={{
            position: "relative",
            width: "60%",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <AspectRatio
            mb="lg"
            sx={{
              width: "100%",
              boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
              backgroundColor: dark ? theme.colors.dark[6] : theme.white,
              borderRadius: "10px",
              maxWidth: "200px",
              marginLeft: "auto",
              marginRight: "auto",
              svg: {
                width: "20%",
                height: "auto",
              },
            }}
            ratio={16 / 10}
          >
            <Center>{icon}</Center>
          </AspectRatio>
        </Box>
        <Text
          weight={600}
          align="center"
          sx={{
            fontSize: "24px",
            "@media (max-width: 992px)": {
              fontSize: "20px",
            },
            "@media (max-width: 768px)": {
              fontSize: "16px",
            },
          }}
        >
          {text}
        </Text>
      </Stack>
    </m.div>
  )
}

const Benefits = (props: ContainerProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("landing")

  const BenefitsCards: BenefitsCardProps[] = useMemo(() => {
    return [
      {
        title: "Fast",
        icon: <HiOutlineLightningBolt color={theme.colors.yellow[5]} />,
        text: (
          <>
            {t("fast1")} <br /> {t("fast2")}
          </>
        ),
      },
      {
        title: "Simple",
        icon: <HiCursorClick color={theme.colors.green[5]} />,
        text: (
          <>
            {t("simple1")} <br /> {t("simple2")}
          </>
        ),
      },
      {
        title: "Fancy",
        icon: <HiOutlineSparkles color={theme.colors.pink[5]} />,
        text: (
          <>
            {t("fancy1")} <br /> {t("fancy2")}
          </>
        ),
      },
      {
        title: "Responsive",
        icon: <BsPhone color={theme.colors.blue[5]} />,
        text: (
          <>
            {t("responsive1")}
            <br /> {t("responsive2")}
          </>
        ),
      },
      {
        title: "Templates",
        icon: <HiOutlineTemplate color={theme.colors.red[5]} />,
        text: (
          <>
            {t("templates1")} <br /> {t("templates2")}
          </>
        ),
      },
      {
        title: "Customizible",
        icon: <FiEdit color={theme.colors.violet[5]} />,
        text: (
          <>
            {t("custom1")} <br /> {t("custom2")}
          </>
        ),
      },
    ]
  }, [])

  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    margin: "50px",
  })

  return (
    <Container size="xl" px={40} {...props}>
      <LandingTitle>{t("ourAdvantages")}</LandingTitle>
      <Space h={40} />
      <AnimatePresence>
        <m.div
          ref={ref}
          animate={
            inView ? { opacity: 1, scale: 1, animationDelay: "1500ms" } : { opacity: 0, scale: 0.7 }
          }
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              width: "auto",
              boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
              borderRadius: "50px",
              backgroundColor: dark ? theme.colors.dark[7] : theme.white,
              "@media (max-width: 768px)": {
                boxShadow: "none",
                backgroundColor: "transparent",
                padding: 0,
              },
            }}
            px="xl"
            py={64}
          >
            <SimpleGrid
              cols={3}
              spacing={0}
              breakpoints={[
                { maxWidth: 992, cols: 2 },
                { maxWidth: 768, cols: 1 },
              ]}
              sx={{
                rowGap: "116px",
                "@media (max-width: 992px)": {
                  rowGap: "96px",
                },
                "@media (max-width: 768px)": {
                  rowGap: "64px",
                },
              }}
            >
              {BenefitsCards.map((card, i) => (
                <BenefitsCard {...card} key={i} />
              ))}
            </SimpleGrid>
          </Box>
        </m.div>
      </AnimatePresence>
    </Container>
  )
}

export default Benefits

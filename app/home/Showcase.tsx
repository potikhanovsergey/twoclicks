import {
  Container,
  Group,
  SimpleGrid,
  Title,
  Box,
  useMantineTheme,
  Text,
  Overlay,
  createStyles,
  Badge,
  BoxProps,
  AspectRatio,
  ContainerProps,
  MediaQuery,
} from "@mantine/core"
import Clicks from "app/core/components/Clicks"
import Link from "next/link"

import NextImage from "app/core/components/base/NextImage"
import LandingTitle from "app/core/components/base/LandingTitle"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"

interface ShowcasesProps extends BoxProps {
  link: string
  src: string
  alt: string
}

const useStyles = createStyles((theme, _params, getRef) => ({
  showcaseCard: {
    boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
    borderRadius: "30px",
    width: 400,
    height: 400,
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      backgroundColor: "rgba(0,0,0,.4)",
      transition: "0.4s ease all",
    },
    "&:hover": {
      "&:after": {
        opacity: 1,
      },
      [`& .${getRef("text")}`]: {
        opacity: 1,
      },
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },

  showcaseText: {
    ref: getRef("text"),
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 201,
    opacity: 0,
    transition: "0.4s ease all",
    pointerEvents: "none",
    color: theme.white,
  },
}))

const Showcases: ShowcasesProps[] = [
  { link: "/", src: "/landing/showcase-1.png", alt: "First showcase page" },
  { link: "/", src: "/landing/showcase-2.png", alt: "Second showcase page" },
  { link: "/", src: "/landing/showcase-3.png", alt: "Third showcase page" },
]

const ShowcaseCard = ({ link, src, alt, children, ...rest }: ShowcasesProps) => {
  const { classes } = useStyles()
  const { t } = useTranslation("landing")

  return (
    <AspectRatio ratio={16 / 9}>
      <Link href={link} passHref>
        <Box className={classes.showcaseCard} component="a" target="_blank" {...rest}>
          <Image src={src} alt={alt} layout="fill" style={{ borderRadius: "30px" }} />
          <Badge variant="filled" className={classes.showcaseText} size="xl">
            {t("clickToView")}
          </Badge>
        </Box>
      </Link>
    </AspectRatio>
  )
}

const Showcase = (props: ContainerProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("landing")

  return (
    <Container size="xl" px={40} {...props}>
      <Box sx={{ margin: "0 auto 128px" }}>
        <LandingTitle align="center">{t("showcaseTitle")}</LandingTitle>
      </Box>
      <Box sx={{ position: "relative" }}>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 992, cols: 2 },
            { maxWidth: 768, cols: 1 },
          ]}
          sx={{
            gap: "60px",
            "@media (max-width: 576px)": {
              gap: "28px",
            },
          }}
        >
          {Showcases.map((showcase, i) => (
            <ShowcaseCard {...showcase} key={i} />
          ))}
        </SimpleGrid>
        <Box
          p={10}
          sx={{
            boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
            backgroundColor: dark ? theme.colors.dark[6] : theme.white,
            borderRadius: "30px",
            position: "absolute",
            top: "-70px",
            left: "15%",
            zIndex: 201,
            maxWidth: "360px",
          }}
        >
          <Text
            weight={700}
            sx={{
              fontSize: "24px",
              letterSpacing: "3px",
              "@media (max-width: 576px)": {
                fontSize: "16px",
              },
            }}
          >
            {t("showcaseFirstCard")}
          </Text>
        </Box>
        <Box
          p={10}
          sx={{
            boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
            backgroundColor: dark ? theme.colors.dark[6] : theme.white,
            borderRadius: "30px",
            position: "absolute",
            bottom: "-150px",
            right: "16%",
            maxWidth: "480px",
            "@media (max-width: 576px)": {
              bottom: "-110px",
              right: 0,
              maxWidth: "400px",
            },
          }}
        >
          <Text
            weight={700}
            sx={{
              fontSize: "24px",
              letterSpacing: "3px",
              "@media (max-width: 576px)": {
                fontSize: "16px",
              },
            }}
          >
            {t("showcaseSecondCard")}
          </Text>
        </Box>
      </Box>
    </Container>
  )
}

export default Showcase

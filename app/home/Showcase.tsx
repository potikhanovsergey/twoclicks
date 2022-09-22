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
} from "@mantine/core"
import Clicks from "app/core/components/Clicks"
import Link from "next/link"

import NextImage from "app/core/components/base/NextImage"
import LandingTitle from "app/core/components/base/LandingTitle"

interface ShowcasesProps extends BoxProps {
  link: string
  src: string
  alt: string
}

const useStyles = createStyles((theme, _params, getRef) => ({
  showcaseCard: {
    boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
    borderRadius: "30px",
    position: "relative",
    "&:hover": {
      [`& .${getRef("overlay")}`]: {
        opacity: 0.75,
      },
      [`& .${getRef("text")}`]: {
        opacity: 1,
      },
    },
  },

  showcaseOverlay: {
    ref: getRef("overlay"),
    transition: "0.4s ease all",
    opacity: 0,
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
  const theme = useMantineTheme()
  const { classes } = useStyles()

  return (
    <AspectRatio ratio={1}>
      <Link href={link} passHref>
        <Box className={classes.showcaseCard} component="a" target="_blank" {...rest}>
          <NextImage
            src={src}
            alt={alt}
            width={400}
            height={400}
            style={{ borderRadius: "30px" }}
          />
          <Overlay
            color={theme.black}
            className={classes.showcaseOverlay}
            opacity={0}
            radius={30}
          />
          <Badge variant="filled" color="violet" className={classes.showcaseText} size="xl">
            Click to view
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

  return (
    <Container size="xl" px={40} {...props}>
      <Box sx={{ margin: "0 auto 128px" }}>
        <LandingTitle align="center">
          Showcase: made with twoclicks
          <span>
            <Clicks style={{ width: "68px", transform: "translateY(16px)" }} />
          </span>
        </LandingTitle>
      </Box>
      <Box sx={{ position: "relative" }}>
        <SimpleGrid cols={3} spacing={60}>
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
          }}
        >
          <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
            And you can use them <br /> as templates for pages!
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
          }}
        >
          <Text weight={700} size={24} sx={{ letterSpacing: "3px" }}>
            Create a pretty page and <br /> we will add it here 👀
          </Text>
        </Box>
      </Box>
    </Container>
  )
}

export default Showcase

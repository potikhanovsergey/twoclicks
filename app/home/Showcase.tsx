import {
  Container,
  Group,
  SimpleGrid,
  Title,
  Box,
  useMantineTheme,
  Image,
  Text,
  Overlay,
  createStyles,
  Center,
  Button,
  Badge,
  BoxProps,
} from "@mantine/core"
import Clicks from "app/core/components/Clicks"
import Link from "next/link"
import { ReactNode } from "react"

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
      [`& .${getRef("overlay")}, .${getRef("text")}`]: {
        opacity: 0.75,
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
  },
}))

const Showcases: ShowcasesProps[] = [
  { link: "/", src: "/landing/showcase-1.png", alt: "preview first portfolio" },
  { link: "/", src: "/landing/showcase-2.png", alt: "preview second portfolio" },
  { link: "/", src: "/landing/showcase-3.png", alt: "preview third portfolio" },
]

const ShowcaseCard = ({ link, src, alt, children, ...rest }: ShowcasesProps) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()

  return (
    <Link href={link} passHref>
      <Box className={classes.showcaseCard} component="a">
        <Image src={src} alt="alt" radius={30} />
        <Overlay color={theme.black} className={classes.showcaseOverlay} opacity={0} radius={30} />
        <Badge
          variant="filled"
          color="violet"
          className={classes.showcaseText}
          size="xl"
          sx={{ pointerEvents: "none" }}
        >
          Click to view
        </Badge>
      </Box>
    </Link>
  )
}

const Showcase = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <Container size="xl" px={40}>
      <Group position="center" spacing={0} noWrap mb={128}>
        <Title
          order={2}
          size={34}
          sx={{ textTransform: "uppercase", letterSpacing: "8px", fontWeight: 600 }}
          align="center"
        >
          Showcase: these pages <br /> were made with twoclicks
        </Title>
        <Clicks width="68px" style={{ marginTop: "52px", height: "auto" }} />
      </Group>
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

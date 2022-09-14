import {
  Container,
  Group,
  SimpleGrid,
  Title,
  Box,
  useMantineTheme,
  Image,
  Text,
} from "@mantine/core"
import Clicks from "app/core/components/Clicks"

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
          <Box
            sx={{
              boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
              borderRadius: "30px",
            }}
          >
            <Image src="/landing/showcase-1.png" alt="preview first portfolio" radius={30} />
          </Box>
          <Box
            sx={{
              boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
              borderRadius: "30px",
            }}
          >
            <Image src="/landing/showcase-2.png" alt="preview second portfolio" radius={30} />
          </Box>
          <Box
            sx={{
              boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
              borderRadius: "30px",
            }}
          >
            <Image src="/landing/showcase-3.png" alt="preview third portfolio" radius={30} />
          </Box>
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
            Create a pretty page and <br /> we will add it here👀
          </Text>
        </Box>
      </Box>
    </Container>
  )
}

export default Showcase

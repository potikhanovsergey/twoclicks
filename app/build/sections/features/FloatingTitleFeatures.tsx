import {
  Box,
  Container,
  Grid,
  Image,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { FaMagic } from "@react-icons/all-files/fa/FaMagic"
import { FaFire } from "@react-icons/all-files/fa/FaFire"
import { FaSkull } from "@react-icons/all-files/fa/FaSkull"
import { SiOctopusdeploy } from "@react-icons/all-files/si/SiOctopusdeploy"
import { RiMagicFill } from "@react-icons/all-files/ri/RiMagicFill"
import { GiCoolSpices } from "@react-icons/all-files/gi/GiCoolSpices"

const items = [
  {
    icon: <RiMagicFill size={32} color="white" />,
    title: "How do we do it",
    text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur enim
    molestiae repudiandae aliquam.`,
  },
  {
    icon: <FaMagic size={32} color="white" />,
    title: "How do we do it",
    text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur enim
    molestiae repudiandae aliquam.`,
  },
  {
    icon: <FaFire size={32} color="white" />,
    title: "How do we do it",
    text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur enim
    molestiae repudiandae aliquam.`,
  },
  {
    icon: <GiCoolSpices size={32} color="white" />,
    title: "How do we do it",
    text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur enim
    molestiae repudiandae aliquam.`,
  },
  {
    icon: <FaSkull size={32} color="white" />,
    title: "How do we do it",
    text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur enim
    molestiae repudiandae aliquam.`,
  },
  {
    icon: <SiOctopusdeploy size={32} color="white" />,
    title: "How do we do it",
    text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur enim
    molestiae repudiandae aliquam.`,
  },
]

const FloatingTitleFeatures = () => {
  return (
    <Box
      py={96}
      sx={{
        backgroundColor: "#180636",
        minHeight: "80vh",
        overflow: "clip",
        "@media (max-width: 992px)": {
          padding: "0 48px",
        },
        "@media (max-width: 576px)": {
          padding: 0,
        },
      }}
    >
      <Container size="md" sx={{ position: "relative", zIndex: 1 }}>
        <Image
          sx={{
            position: "absolute",
            pointerEvents: "none",
            zIndex: -1,
            userSelect: "none",
            bottom: "0",
            left: "-300px",
            "@media (max-width: 992px)": {
              bottom: "50px",
              left: "-150px",
            },
          }}
          styles={{
            image: {
              width: "700px",
              height: "700px",
              "@media (max-width: 992px)": {
                width: "500px !important",
                height: "500px !important",
              },
            },
          }}
          src="https://ucarecdn.com/feca8bfb-10aa-4c2e-a01e-fe80f892babc/purplecircle.png"
          alt=""
        />
        <Image
          src="https://ucarecdn.com/73435f08-96c0-4d56-8948-30d2be9978d3/pinkcircle.png"
          sx={{
            position: "absolute",
            pointerEvents: "none",
            zIndex: -1,
            userSelect: "none",
            right: "-440px",
            top: "-90px",
            "@media (max-width: 992px)": {
              right: "-450px",
              top: "15px",
            },
          }}
          styles={{
            image: {
              width: "700px",
              height: "700px",
              "@media (max-width: 992px)": {
                width: "500px !important",
                height: "500px !important",
              },
            },
          }}
          width={700}
          height={700}
          alt=""
        />
        <Grid gutter={80}>
          <Grid.Col span={12} md={4}>
            <Title
              order={2}
              size={36}
              color="white"
              sx={{
                position: "sticky",
                top: "40%",
                "@media (max-width: 992px)": {
                  position: "static",
                  top: "auto",
                },
              }}
            >
              Как мы это делаем?
            </Title>
          </Grid.Col>
          <Grid.Col span={12} md={8}>
            <SimpleGrid cols={1} spacing={32} breakpoints={[{ minWidth: "sm", cols: 2 }]}>
              {items.map((item, i) => (
                <Stack
                  p={24}
                  key={i}
                  spacing={8}
                  sx={{ backgroundColor: "rgba(255,255,255, .025)", borderRadius: 12 }}
                >
                  <ThemeIcon
                    size="lg"
                    variant="filled"
                    sx={{
                      "> svg": {
                        width: "50%",
                      },
                    }}
                  >
                    {item.icon}
                  </ThemeIcon>
                  <Title span order={2} color="white">
                    {item.title}
                  </Title>
                  <Text color="dimmed">{item.text}</Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}

export default FloatingTitleFeatures

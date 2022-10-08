import {
  Card,
  Container,
  Group,
  Badge,
  Title,
  SimpleGrid,
  Text,
  Box,
  ThemeIcon,
} from "@mantine/core"

import { FaCloudscale } from "@react-icons/all-files/fa/FaCloudscale"
import { FaUserAlt } from "@react-icons/all-files/fa/FaUserAlt"
import { FaCookieBite } from "@react-icons/all-files/fa/FaCookieBite"

const mockdata = [
  {
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: <FaCloudscale size={50} stroke="2" color="#000" />,
  },
  {
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: <FaUserAlt size={50} stroke="2" color="#000" />,
  },
  {
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: <FaCookieBite size={50} stroke="2" color="#000" />,
  },
]

const MantineFeaturesWithCards = () => {
  return (
    <Box>
      <Container size="lg" py="xl">
        <Group position="center">
          <Badge variant="filled" size="lg">
            Best company ever
          </Badge>
        </Group>
        <Title
          order={2}
          sx={{
            fontSize: 34,
            fontWeight: 900,
            "@media (max-width: 768px)": {
              fontSize: 24,
            },
          }}
          align="center"
          mt="sm"
        >
          Integrate effortlessly with any technology stack
        </Title>
        <Text
          color="dimmed"
          sx={{
            maxWidth: 600,
            margin: "auto",
            "&::after": {
              content: '""',
              display: "block",
              backgroundColor: "#000",
              width: 45,
              height: 2,
              marginTop: 12,
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
          align="center"
          mt="md"
        >
          Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
          hunger drives it to try biting a Steel-type Pokémon.
        </Text>
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          {mockdata.map((feature) => (
            <Card
              key={feature.title}
              shadow="md"
              radius="md"
              sx={{ border: `1px solid #333` }}
              p="xl"
            >
              <ThemeIcon size="xl">{feature.icon}</ThemeIcon>
              <Text
                size="lg"
                weight={500}
                sx={{
                  "&::after": {
                    content: '""',
                    display: "block",
                    backgroundColor: "#000",
                    width: 45,
                    height: 2,
                    marginTop: 12,
                  },
                }}
                mt="md"
              >
                {feature.title}
              </Text>
              <Text size="sm" color="dimmed" mt="sm">
                {feature.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default MantineFeaturesWithCards

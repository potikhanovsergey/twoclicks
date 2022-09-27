import { Container, SimpleGrid, ThemeIcon, Title, Text, Box } from "@mantine/core"
import { FaCloudscale, FaUserAlt, FaCookieBite, FaLock, FaComments } from "react-icons/fa"

export const mockdata = [
  {
    icon: <FaCloudscale />,
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
  },
  {
    icon: <FaUserAlt />,
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
  },
  {
    icon: <FaCookieBite />,
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
  },
  {
    icon: <FaLock />,
    title: "Secure by default",
    description:
      "Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right",
  },
  {
    icon: <FaComments />,
    title: "24/7 Support",
    description:
      "Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail",
  },
]

const MantineFeaturesWithMonotoneIcons = () => {
  return (
    <Box>
      <Container sx={{ paddingTop: 96, paddingBottom: 96 }}>
        <Title
          sx={{
            fontFamily: `Greycliff CF, sans-serif`,
            fontWeight: 900,
            marginBottom: 16,
            textAlign: "center",
            "@media (max-width: 768px)": {
              fontSize: 28,
              textAlign: "left",
            },
          }}
        >
          Integrate effortlessly with any technology stack
        </Title>
        <Container size={560} p={0}>
          <Text
            size="sm"
            sx={{
              textAlign: "center",
              "@media (max-width: 768px)": {
                textAlign: "left",
              },
            }}
          >
            Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
            hunger drives it to try biting a Steel-type Pokémon.
          </Text>
        </Container>
        <SimpleGrid
          mt={60}
          cols={3}
          spacing={48}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: "xl" },
            { maxWidth: 755, cols: 1, spacing: "xl" },
          ]}
        >
          {mockdata.map((feature, index) => (
            <div key={index}>
              <ThemeIcon variant="light" size={40} radius={40}>
                {feature.icon}
              </ThemeIcon>
              <Text style={{ marginTop: 12, marginBottom: 7 }}>{feature.title}</Text>
              <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                {feature.description}
              </Text>
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default MantineFeaturesWithMonotoneIcons

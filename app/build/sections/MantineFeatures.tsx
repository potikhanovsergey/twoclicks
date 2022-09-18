import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, Col } from "@mantine/core"

import { RiOpenSourceFill } from "@react-icons/all-files/ri/RiOpenSourceFill"
import { FaFileCode } from "@react-icons/all-files/fa/FaFileCode"
import { IoFlame } from "@react-icons/all-files/io5/IoFlame"

const features = [
  {
    icon: <RiOpenSourceFill size={26} />,
    title: "Free and open source",
    description: "All packages are published under MIT license, you can use Mantine in any project",
  },
  {
    icon: <FaFileCode size={26} />,
    title: "TypeScript based",
    description: "Build type safe applications, all components and hooks export types",
  },
  {
    icon: <FaFileCode size={26} />,
    title: "No annoying focus ring",
    description:
      "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
  },
  {
    icon: <IoFlame size={26} />,
    title: "Flexible",
    description:
      "Customize colors, spacing, shadows, fonts and many other settings with global theme object",
  },
]

const MantineFeatures = () => {
  return (
    <div
      style={{
        padding: `32px 16px`,
      }}
    >
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title
            order={2}
            style={{
              fontSize: 36,
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "12px",
              color: "#fff",
            }}
          >
            A fully featured React components library for your next project
          </Title>
          <Text color="dimmed">
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and hooks to cover you in any situation
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: "blue", to: "cyan" }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Get started
          </Button>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
            {features.map((feature) => (
              <div key={feature.title}>
                <ThemeIcon
                  size={44}
                  radius="md"
                  variant="gradient"
                  gradient={{ deg: 133, from: "blue", to: "cyan" }}
                >
                  {feature.icon}
                </ThemeIcon>
                <Text size="lg" mt="sm" weight={500}>
                  {feature.title}
                </Text>
                <Text color="dimmed" size="sm">
                  {feature.description}
                </Text>
              </div>
            ))}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>
  )
}

export default MantineFeatures

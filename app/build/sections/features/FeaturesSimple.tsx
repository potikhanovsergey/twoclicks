import { Container, Box, Stack, ThemeIcon, Text, SimpleGrid } from "@mantine/core"
import { FaMoneyBillWave, FaGlobeAmericas, FaUsers, FaPencilRuler } from "react-icons/fa"

const mockdata = [
  {
    icon: <FaMoneyBillWave size="50%" />,
    title: "$335",
    desc: "Live Price Updates",
  },
  {
    icon: <FaGlobeAmericas size="50%" />,
    title: "100+",
    desc: "Country Supported",
  },
  {
    icon: <FaUsers size="50%" />,
    title: "56M+",
    desc: "Verified users",
  },
  {
    icon: <FaPencilRuler size="50%" />,
    title: "5000+",
    desc: "Tutorials",
  },
]

const FeaturesSimple = () => {
  return (
    <Box pt={64} pb={64}>
      <Container
        size="md"
        pt={20}
        pb={20}
        sx={{
          backgroundColor: "#7033fb",
          borderRadius: "20px",
          "@media (max-width: 992px)": { borderRadius: "0px" },
        }}
      >
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: 768, cols: 2 },
            { maxWidth: 576, cols: 1 },
          ]}
          sx={{ "@media (max-width: 768px)": { gap: "40px 0px" } }}
        >
          {mockdata.map((el, i) => (
            <Stack key={i} align="center" spacing={4}>
              <ThemeIcon variant="filled" color="violet" size={50}>
                {el.icon}
              </ThemeIcon>
              <Text size={30} weight="bold" color="white">
                {el.title}
              </Text>
              <Text color="white">{el.desc}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default FeaturesSimple

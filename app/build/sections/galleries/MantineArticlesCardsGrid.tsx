import { Card, AspectRatio, Container, SimpleGrid, Image, Text, Box } from "@mantine/core"

const mockdata = [
  {
    title: "Top 10 places to visit in Norway this summer",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 18, 2022",
  },
  {
    title: "Best forests to visit in North America",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 27, 2022",
  },
  {
    title: "Hawaii beaches review: better than you think",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 9, 2022",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 12, 2022",
  },
]

const MantineArticlesCardsGrid = () => {
  return (
    <Box>
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {mockdata.map((article) => (
            <Card
              key={article.title}
              p="md"
              radius="md"
              sx={{
                transition: "transform 150ms ease, box-shadow 150ms ease",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                },
              }}
            >
              <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} alt={article.title} />
              </AspectRatio>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
                {article.date}
              </Text>
              <Text sx={{ fontFamily: `Greycliff CF, sans-serif`, fontWeight: 600 }} mt={5}>
                {article.title}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default MantineArticlesCardsGrid

import { Container, Box, Image, Group, SimpleGrid } from "@mantine/core"

const mockdata = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/160px-Apple_logo_black.svg.png",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nokia_wordmark.svg/400px-Nokia_wordmark.svg.png",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/ru/thumb/8/8d/Mazda_2018.svg/400px-Mazda_2018.svg.png",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/400px-Rockstar_Games_Logo.svg.png",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/HUGO-BOSS_POS.png/400px-HUGO-BOSS_POS.png",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Chanel_logo.svg/400px-Chanel_logo.svg.png",
  },
]

const Partners = () => {
  return (
    <Box>
      <Container size="xl">
        <SimpleGrid
          cols={6}
          sx={{
            alignItems: "center",
            justifyItems: "center",
            gap: "40px 20px !important",
          }}
          breakpoints={[
            { maxWidth: "lg", cols: 5 },
            { maxWidth: "md", cols: 4 },
            { maxWidth: "sm", cols: 3 },
            { maxWidth: "xs", cols: 1 },
          ]}
        >
          {mockdata.map((el, i) => (
            <Image src={el.src} key="i" alt="" fit="contain" width={150} height={70} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Partners

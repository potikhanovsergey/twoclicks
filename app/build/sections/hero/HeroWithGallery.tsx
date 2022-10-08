import {
  Container,
  Box,
  SimpleGrid,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Image,
  Grid,
} from "@mantine/core"

const mocdata = [
  {
    src: "https://i.ibb.co/F65jgbY/images-q-tbn-ANd9-Gc-RAwa-WXv-Uxxlc-QGv-Gb-Ax-Kphz8g1-SXRj-N9-JHGg-usqp-CAU.jpg",
  },
  {
    src: "https://i.ibb.co/37wkXSQ/images-q-tbn-ANd9-Gc-Qjs-Ki-Oz-Vt-X4-Bdo-Ji7ynf21g0-D-p-XUb8vx-RA-usqp-CAU.jpg",
  },
  {
    src: "https://i.ibb.co/qswTxq2/images-q-tbn-ANd9-Gc-TNfe-Sn-Yy-r-SJq9x-Nkj-Mvfiz-Htcl-W3-b-NIj-FA-usqp-CAU.jpg",
  },
  {
    src: "https://i.ibb.co/jZsgyY4/images-q-tbn-ANd9-Gc-Qif9x-E-jg-GWdc-BUe-Dk-JQNa-Fxs5381-PYd-QSaw-usqp-CAU.jpg",
  },
  {
    src: "https://i.ibb.co/cQ6MFgs/images-q-tbn-ANd9-Gc-Rnlbl-Evdg-Fv-Oi-RDKf4z-Wrq-Uun-EK7-YFZo-Sxw-usqp-CAU.jpg",
  },
  {
    src: "https://i.ibb.co/c3sbyyt/images-q-tbn-ANd9-Gc-Qu-Ohc6-YEem-Vz48h-LZl1c-Yr6-Tn-C0hso-MMUL9-A-usqp-CAU.jpg",
  },
  {
    src: "https://i.ibb.co/4sx64jG/images-q-tbn-ANd9-Gc-Te-Rfa-C3z64-Wie-TVs-Wh1-URPBVi-Lnha-TDSGeg-usqp-CAU.jpgs",
  },
  {
    src: "https://i.ibb.co/82V3c1Z/images-q-tbn-ANd9-Gc-Tz-wc3r5-CI8-O4-Fx-PVRR7xpi4q-FOWCw0-Tvf-Kg-usqp-CAU.jpg",
  },
  { src: "https://i.ibb.co/kxPPYYn/aesthetic-clouds-phone-wallpaper-15-1.jpg" },
]

const HeroWithGallery = () => {
  return (
    <Box pt={64} pb={64}>
      <Container size="md">
        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[{ maxWidth: 769, cols: 1 }]}
          sx={{
            "@media (max-width: 768px)": {
              gap: "64px 24px",
            },
          }}
        >
          <Stack
            sx={{
              gap: "2px",
              justifyContent: "center",
              width: "100%",
              "@media (max-width: 768px)": {
                alignItems: "center",
                textAlign: "center",
                maxWidth: "60%",
                margin: "0 auto",
              },
              "@media (max-width: 576px)": {
                maxWidth: "100%",
              },
            }}
          >
            <Title
              sx={{
                fontSize: "40px",
                "@media (max-width: 768px)": {
                  fontSize: "30px",
                },
                "@media (max-width: 576px)": {
                  fontSize: "26px",
                },
              }}
            >
              Best 4k wallpapers
            </Title>
            <Text
              weight="bold"
              sx={{
                fontSize: "24px",
                "@media (max-width: 576px)": {
                  fontSize: "20px",
                },
              }}
            >
              For the people, by the people
            </Text>
            <Text sx={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <Group
              sx={{
                "@media (max-width: 768px)": {
                  justifyContent: "center",
                },
              }}
            >
              <Button>Explore walllpapers</Button>
              <Button>Know more</Button>
            </Group>
          </Stack>
          <SimpleGrid
            cols={3}
            breakpoints={[{ maxWidth: 576, cols: 2 }]}
            sx={{
              gap: "30px",
              // "@media (max-width: 992px)": {
              //   maxWidth: "50%",
              //   margin: "0 auto",
              // },
              width: "100%",
              "@media (max-width: 768px)": {
                margin: "0 auto",
                maxWidth: "80%",
              },
              "@media (max-width: 576px)": {
                maxWidth: "100%",
              },
            }}
          >
            {mocdata.map((item, i) => (
              <Image
                src={item.src}
                alt=""
                key={i}
                fit="cover"
                radius="xl"
                height={160}
                width="100%"
                sx={{
                  "@media (min-width: 577px)": {
                    ":nth-child(3n+2)": {
                      marginTop: "-30px",
                    },
                  },
                }}
              />
            ))}
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default HeroWithGallery

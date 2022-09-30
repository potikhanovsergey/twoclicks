import { Box, Container, Title, Text, Group, Image, Stack, ThemeIcon } from "@mantine/core"
import { FaWordpress, FaPalette, FaEdit, FaStar } from "react-icons/fa"

const mockdata = [
  {
    title: "Clean code",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    icon: <FaWordpress size="50%" />,
  },
  {
    title: "Responsive design",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    icon: <FaPalette size="50%" />,
  },
  {
    title: "Custom objects",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    icon: <FaEdit size="50%" />,
  },
  {
    title: "Nice theme",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    icon: <FaStar size="50%" />,
  },
]

const FeaturesWithPicture = () => {
  return (
    <Box py="xl">
      <Container size="md">
        <Title
          order={2}
          align="center"
          sx={{
            fontSize: "40px",
            maxWidth: "500px",
            margin: "0 auto 16px auto",
            "@media (max-width: 768px)": {
              fontSize: "30px",
            },
            "@media (max-width: 576px)": {
              fontSize: "20px",
            },
          }}
        >
          Benefits that you get from my product
        </Title>
        <Text
          align="center"
          color="dimmed"
          sx={{
            maxWidth: "500px",
            margin: "0 auto 64px auto",
            "@media (max-width: 768px)": {
              margin: "0 auto 40px auto",
            },
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
        <Group
          position="center"
          grow
          sx={{
            gap: "64px",
            flexWrap: "nowrap",
            "@media (max-width: 992px)": {
              gap: "10px",
            },
            "@media (max-width: 768px)": {
              flexDirection: "column",
            },
          }}
        >
          <Stack align="center">
            <Image
              src="https://ucarecdn.com/cb374d55-e697-4219-8e95-ffced68567e1/"
              alt=""
              styles={{
                imageWrapper: {
                  width: "70%",
                  margin: "0 auto",
                },
              }}
              sx={{
                "@media (max-width: 768px)": {
                  marginBottom: "40px",
                },
                "@media (max-width: 576px)": {
                  marginBottom: "20px",
                },
              }}
            />
          </Stack>
          <Stack
            sx={{
              "@media (max-width: 768px)": {
                maxWidth: "100%",
                padding: "0 40px",
              },
              "@media (max-width: 576px)": {
                padding: "0 10px",
              },
            }}
          >
            {mockdata.map((el, i) => (
              <Group
                key={i}
                noWrap
                align="flex-start"
                sx={{
                  "@media (max-width: 576px)": {
                    flexDirection: "column",
                  },
                }}
              >
                <ThemeIcon
                  variant="light"
                  size={50}
                  radius={40}
                  sx={{
                    "@media (max-width: 576px)": {
                      minWidth: "40px",
                      minHeight: "40px",
                      width: "40px",
                      height: "40px",
                    },
                  }}
                >
                  {el.icon}
                </ThemeIcon>
                <Stack spacing={0}>
                  <Text mb={8}>{el.title}</Text>
                  <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                    {el.text}
                  </Text>
                </Stack>
              </Group>
            ))}
          </Stack>
        </Group>
      </Container>
    </Box>
  )
}

export default FeaturesWithPicture

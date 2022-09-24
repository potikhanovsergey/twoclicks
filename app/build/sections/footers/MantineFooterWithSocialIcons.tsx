import { Container, Group, ActionIcon, Box, Image } from "@mantine/core"
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa"

const MantineFooterWithSocialIcons = () => {
  return (
    <Box
      sx={{
        marginTop: 120,
        borderTop: `1px solid #333`,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 24,
          paddingBottom: 24,
          "@media (max-width: 576px)": {
            flexDirection: "column",
          },
        }}
      >
        <Image
          src="https://ucarecdn.com/f74c587f-932f-49cc-b0b9-a73904e61070/"
          alt="logo"
          width="100px"
          height="auto"
        />
        <Group
          spacing={0}
          sx={{
            "@media (max-width: 576px)": {
              marginTop: 16,
            },
          }}
          position="right"
          noWrap
        >
          <ActionIcon size="lg">
            <FaTwitter />
          </ActionIcon>
          <ActionIcon size="lg">
            <FaYoutube />
          </ActionIcon>
          <ActionIcon size="lg">
            <FaInstagram />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  )
}

export default MantineFooterWithSocialIcons

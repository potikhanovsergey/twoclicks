import { Container, Group, ActionIcon, Box, Image, Divider } from "@mantine/core"

import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"

const MantineFooterWithSocialIcons = () => {
  return (
    <Box pt={64}>
      <Divider size="sm" />
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
          <ActionIcon size={40}>
            <FaTwitter size="50%" />
          </ActionIcon>
          <ActionIcon size={40}>
            <FaYoutube size="50%" />
          </ActionIcon>
          <ActionIcon size={40}>
            <FaInstagram size="50%" />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  )
}

export default MantineFooterWithSocialIcons

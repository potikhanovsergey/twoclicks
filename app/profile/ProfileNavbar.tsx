import { Navbar, Space } from "@mantine/core"
import { ProfileLinks } from "./ProfileLinks"

const ProfileNavbar = () => (
  <Navbar
    height="100vh"
    style={{ top: "var(--layout-header-height)" }}
    py={0}
    px="md"
    hidden
    hiddenBreakpoint="sm"
    width={{ sm: 200, lg: 300 }}
  >
    <Navbar.Section grow>
      <Space h={16} />
      <ProfileLinks />
    </Navbar.Section>
  </Navbar>
)

export default ProfileNavbar

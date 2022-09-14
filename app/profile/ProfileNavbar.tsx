import { Navbar, NavbarProps, Group, Divider, Space } from "@mantine/core"
import Logo from "app/core/components/Logo"
import { ProfileLinks } from "./ProfileLinks"

const ProfileNavbar = () => (
  <Navbar
    height="100vh"
    style={{ top: 0 }}
    py={0}
    px="md"
    hidden
    hiddenBreakpoint="sm"
    width={{ sm: 200, lg: 300 }}
  >
    {/* HEADER STARTS */}
    <Navbar.Section pt={4} pl={10}>
      <Space h={4} />
      <Group
        style={{ height: "var(--build-header-height)", minHeight: "var(--build-header-height)" }}
        align="center"
      >
        <Logo width={140} />
      </Group>
    </Navbar.Section>
    {/* HEADER ENDS */}
    <Navbar.Section grow>
      <Space h={16} />
      <ProfileLinks />
    </Navbar.Section>
  </Navbar>
)

export default ProfileNavbar

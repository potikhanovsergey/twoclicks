import { Navbar, NavbarProps, Group, Space } from "@mantine/core"
import Logo from "app/core/components/Logo"
import { ProfileLinks } from "./ProfileLinks"

interface IProileNavbar extends Omit<NavbarProps, "children"> {
  menuOpened: boolean
}

const ProfileNavbar = ({ menuOpened }: IProileNavbar) => (
  <Navbar
    height="100vh"
    style={{ top: 0 }}
    py={0}
    px="md"
    hiddenBreakpoint="sm"
    hidden={!menuOpened}
    width={{ sm: 200, lg: 300 }}
  >
    {/* HEADER STARTS */}
    <Navbar.Section pt={4} pl={10}>
      <Group
        style={{ height: "var(--layout-header-height)", minHeight: "var(--layout-header-height)" }}
        align="center"
      >
        <Logo height="auto" width={140} />
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

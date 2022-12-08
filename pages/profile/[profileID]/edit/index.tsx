import { Group, Text, Button, useMantineTheme, Container, Grid, Divider } from "@mantine/core"
import ButtonGroup, { GroupButtonProps } from "app/core/components/base/ButtonGroup"
import { MenuItemSx } from "app/core/components/layout/HeaderProfile"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import EditGeneral from "app/profile/EditGeneral"
import Link from "next/link"
import { useState } from "react"

const EditProfile = () => {
  const user = useCurrentUser()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  const [activeTab, setActiveTab] = useState("general")

  const items = [
    { name: "General", tab: "general" },
    { name: "Socials", tab: "socials" },
  ]

  const menuItems: GroupButtonProps[] = items.map((i) => ({
    children: i.name,
    onClick: () => setActiveTab(i.tab),
    active: activeTab === i.tab,
    sx: MenuItemSx,
    size: "xl",
  }))

  return (
    <Container size="lg" py={64} px={64}>
      <Group position="apart">
        <Group spacing={6}>
          <Link href={`/profile/${user?.id}`} passHref>
            <Text size={28} weight={700} color="dark" component="a">
              Profile /
            </Text>
          </Link>
          <Text size={28} weight={700} color="dimmed">
            Edit profile
          </Text>
        </Group>
        <Button variant={dark ? "white" : "filled"} radius="xl" color="dark" component="a">
          Save General
        </Button>
      </Group>
      <Grid mt={36}>
        <Grid.Col span={3}>
          <ButtonGroup buttons={menuItems} wrapperProps={{ sx: { flexDirection: "column" } }} />
        </Grid.Col>
        <Grid.Col span={9}>
          {user &&
            {
              general: <EditGeneral user={user} />,
              social: <EditGeneral user={user} />,
            }[activeTab]}
        </Grid.Col>
      </Grid>
    </Container>
  )
}

EditProfile.getLayout = getBaseLayout({})

export default EditProfile

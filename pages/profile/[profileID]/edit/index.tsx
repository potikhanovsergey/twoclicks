import { useMutation } from "@blitzjs/rpc"
import { Group, Text, Button, useMantineTheme, Container, Grid, Divider } from "@mantine/core"
import { useForm } from "@mantine/form"
import ButtonGroup, { GroupButtonProps } from "app/core/components/base/ButtonGroup"
import { MenuItemSx } from "app/core/components/layout/HeaderProfile"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import EditGeneral from "app/profile/EditGeneral"
import EditSocials from "app/profile/EditSocials"
import updateUser from "app/users/mutations/updateUser"
import { isAlphanumeric } from "helpers/utils"
import Link from "next/link"
import { useState } from "react"

export interface GeneralFormProps {
  name: string
  caption: string
  subtitle: string
  customID: string
  skills: string[]
}

export interface SocialsFormProps {
  publicEmail: string | null
  vk: string | null
  instagram: string | null
  telegram: string | null
  twitter: string | null
  facebook: string | null
}

const items = [
  { name: "General", tab: "general" },
  { name: "Socials", tab: "socials" },
]

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // fragment locator
  return !!pattern.test(str)
}

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

const EditProfile = () => {
  const user = useCurrentUser()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  const [activeTab, setActiveTab] = useState("general")

  const menuItems: GroupButtonProps[] = items.map((i) => ({
    children: i.name,
    onClick: () => setActiveTab(i.tab),
    active: activeTab === i.tab,
    sx: MenuItemSx,
    size: "xl",
  }))

  const generalForm = useForm<GeneralFormProps>({
    initialValues: {
      name: user?.name || "",
      caption: user?.caption || "",
      subtitle: user?.subtitle || "",
      customID: user?.customID || user?.id || "",
      skills: user?.skills || [],
    },
    validate: {
      customID: (value) => (isAlphanumeric(value) ? null : "Only letters and numbers allowed"),
    },
  })

  const [updateUserMutation, { isLoading }] = useMutation(updateUser)

  const handleEditGeneralSubmit = () => {
    const isValid = generalForm.validate()
    if (isValid && user) {
      void updateUserMutation({ where: { id: user.id }, data: generalForm.values })
    }
  }

  const socialsForm = useForm<SocialsFormProps>({
    initialValues: {
      vk: user?.vk || "",
      telegram: user?.telegram || "",
      facebook: user?.facebook || "",
      instagram: user?.instagram || "",
      twitter: user?.twitter || "",
      publicEmail: user?.publicEmail || "",
    },
    validate: {
      publicEmail: (value) => (EMAIL_REGEXP.test(value) || !value.length ? null : "Invalid email"),
      vk: (value) => (validURL(value) || !value.length ? null : "Invalid URL"),
      telegram: (value) => (validURL(value) || !value.length ? null : "Invalid URL"),
      facebook: (value) => (validURL(value) || !value.length ? null : "Invalid URL"),
      instagram: (value) => (validURL(value) || !value.length ? null : "Invalid URL"),
      twitter: (value) => (validURL(value) || !value.length ? null : "Invalid URL"),
    },
  })

  const handleEditSocialsSubmit = () => {
    const isValid = socialsForm.validate()
    if (isValid && user) {
      const updateValues: Partial<SocialsFormProps> = {}
      for (let key in socialsForm.values) {
        if (socialsForm.isValid(key)) {
          updateValues[key] = socialsForm.values[key]
        }
      }
      void updateUserMutation({ where: { id: user.id }, data: updateValues })
    }
  }

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
        {activeTab === "general" ? (
          <Button
            onClick={handleEditGeneralSubmit}
            variant={dark ? "white" : "filled"}
            radius="xl"
            color="dark"
            loading={isLoading}
          >
            Save General
          </Button>
        ) : (
          <Button
            onClick={handleEditSocialsSubmit}
            variant={dark ? "white" : "filled"}
            radius="xl"
            color="dark"
            loading={isLoading}
          >
            Save socials
          </Button>
        )}
      </Group>
      <Grid mt={36}>
        <Grid.Col span={3}>
          <ButtonGroup buttons={menuItems} wrapperProps={{ sx: { flexDirection: "column" } }} />
        </Grid.Col>
        <Grid.Col span={9}>
          {user &&
            {
              general: <EditGeneral form={generalForm} user={user} />,
              socials: <EditSocials form={socialsForm} user={user} />,
            }[activeTab]}
        </Grid.Col>
      </Grid>
    </Container>
  )
}

EditProfile.getLayout = getBaseLayout({})

export default EditProfile

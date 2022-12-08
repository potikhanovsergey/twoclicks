import { Avatar, Group, Stack, Button, TextInput } from "@mantine/core"
import { User } from "@prisma/client"

const inputs = [
  {
    label: "Your name",
    placeholder: "Darya",
  },
  {
    label: "Caption 1 (e.g. your profession)",
    placeholder: "Darya",
  },
  {
    label: "Caption 2 (e.g. your location)",
    placeholder: "Darya",
  },
  {
    label: "Profile URL",
    placeholder: "daryasyomina",
  },
]

const EditGeneral = ({ user }: { user: User }) => {
  return (
    <>
      <Group>
        <Avatar src={user.avatar} size={120} radius={120} />
        <Stack spacing={4}>
          <Button variant="light" color="gray" radius="xl">
            Upload a new photo
          </Button>
          <Button variant="light" color="red" radius="xl">
            Delete photo
          </Button>
        </Stack>
      </Group>
      <Stack spacing={10} mt="xl">
        {inputs.map((input, i) => (
          <TextInput key="i" label={input.label} placeholder={input.placeholder} variant="filled" />
        ))}
      </Stack>
    </>
  )
}

export default EditGeneral

import { Avatar, Group, Stack, Button, TextInput } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import { User } from "@prisma/client"
import { isAlphanumeric } from "helpers/utils"
import { GeneralFormProps } from "pages/profile/[profileID]/edit"

const EditGeneral = ({ user, form }: { user: User; form: UseFormReturnType<GeneralFormProps> }) => {
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
        <TextInput
          label="Your name"
          required
          placeholder="Enter your name"
          variant="filled"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Caption 1 (e.g. your profession)"
          required
          placeholder="Enter caption 1"
          value={user.caption || ""}
          variant="filled"
          {...form.getInputProps("caption")}
        />
        <TextInput
          label="Caption 2 (e.g. your location)"
          required
          placeholder="Enter caption 1"
          value={user.subtitle || ""}
          variant="filled"
          {...form.getInputProps("subtitle")}
        />
        <TextInput
          label="Profile ID"
          required
          placeholder="daryasyomina"
          variant="filled"
          {...form.getInputProps("customID")}
        />
      </Stack>
    </>
  )
}

export default EditGeneral

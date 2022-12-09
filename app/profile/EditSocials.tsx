import { Avatar, Group, Stack, TextInput } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { User } from "@prisma/client"
import { SocialsFormProps } from "pages/profile/[profileID]/edit"
import { SOCIALS_ICON_MAP } from "./ProfileAbout"

const EditSocials = ({ user, form }: { user: User; form: UseFormReturnType<SocialsFormProps> }) => {
  return (
    <>
      <Group>
        <Avatar src={user.avatar} size={120} radius={120} />
      </Group>
      <Stack spacing={10} mt="xl">
        <TextInput
          label="Your public email"
          placeholder="publicemail@gmail.com"
          variant="filled"
          icon={SOCIALS_ICON_MAP["publicEmail"]}
          {...form.getInputProps("publicEmail")}
        />
        <TextInput
          label="Telegram URL"
          placeholder="https://t.me/potikhanovsergey"
          variant="filled"
          icon={SOCIALS_ICON_MAP["telegram"]}
          {...form.getInputProps("telegram")}
        />
        <TextInput
          label="Instagram URL"
          placeholder="Enter your instagram URL"
          value={user.caption || ""}
          variant="filled"
          icon={SOCIALS_ICON_MAP["instagram"]}
          {...form.getInputProps("instagram")}
        />
        <TextInput
          label="VK URL"
          placeholder="Enter your VK URL"
          variant="filled"
          icon={SOCIALS_ICON_MAP["vk"]}
          {...form.getInputProps("vk")}
        />
        <TextInput
          label="Facebook URL"
          placeholder="Enter your facebook URL"
          value={user.subtitle || ""}
          icon={SOCIALS_ICON_MAP["facebook"]}
          variant="filled"
          {...form.getInputProps("facebook")}
        />
        <TextInput
          label="Twitter URL"
          placeholder="Enter your twitter URL"
          variant="filled"
          icon={SOCIALS_ICON_MAP["twitter"]}
          {...form.getInputProps("twitter")}
        />
      </Stack>
    </>
  )
}

export default EditSocials

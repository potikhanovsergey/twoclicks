import { Avatar, Group, Stack, Button, TextInput, MultiSelect, Text } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { User } from "@prisma/client"
import { GeneralFormProps } from "pages/profile/[profileID]/edit"
import { useState } from "react"

const EditGeneral = ({ user, form }: { user: User; form: UseFormReturnType<GeneralFormProps> }) => {
  const onSkillsChange = (value) => {
    form.setFieldValue("skills", value)
  }

  const onSkillsCreate = (query) => {
    form.setFieldValue("skills", [...form.values.skills, query])
    return query
  }

  const onSkillsInput = (e) => {
    if (!form.values.skills.some((item) => item === e.currentTarget.value)) {
      form.clearFieldError("skills")
    }
  }

  const handleGetCreateLabel = (query: string) => (
    <Text>
      Add <b>{query}</b> tag
    </Text>
  )

  const [inputTagValue, setInputTagValue] = useState("")
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputTagValue.length) {
      if (!form.values.skills.some((tag) => tag === inputTagValue)) {
        form.setFieldValue("skills", [...form.values.skills, inputTagValue])
        setInputTagValue("")
      } else {
        form.setFieldError("skills", "This tag already exists")
      }
    }
  }
  return (
    <>
      <Group>
        <Avatar src={user.avatar} size={120} radius={120} />
        {/* <Stack spacing={4}>
          <Button variant="light" color="gray" radius="xl">
            Upload a new photo
          </Button>
          <Button variant="light" color="red" radius="xl">
            Delete photo
          </Button>
        </Stack> */}
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
        <MultiSelect
          label={
            <Text>
              Add tags{" "}
              <Text color="dimmed" inherit span>
                (up to 10)
              </Text>
            </Text>
          }
          dropdownPosition="top"
          placeholder="Select tags"
          searchable
          creatable
          value={form.values.skills}
          onChange={onSkillsChange}
          onInput={onSkillsInput}
          maxSelectedValues={10}
          clearable
          error={form.errors.tags}
          data={["Developer", "Designer", "Artist", "Writer", ...form.values.skills]}
          getCreateLabel={handleGetCreateLabel}
          onCreate={onSkillsCreate}
          styles={{
            searchInput: {
              height: "auto !important",
            },
          }}
          onKeyDown={handleKeyDown}
          clearButtonLabel="Clear the tags"
          searchValue={inputTagValue}
          onSearchChange={setInputTagValue}
        />
      </Stack>
    </>
  )
}

export default EditGeneral

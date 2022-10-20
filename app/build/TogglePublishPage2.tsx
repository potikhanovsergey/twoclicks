import { useMutation } from "@blitzjs/rpc"
import {
  Button,
  ButtonProps,
  Title,
  Stack,
  Group,
  Checkbox,
  TextInput,
  SimpleGrid,
  Text,
  MultiSelect,
  Select,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { openModal } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import updatePage from "app/build-pages/mutations/updatePage"
import Info from "app/core/components/Info"
import FeedPageCardBottom from "app/pages-grid/FeedPageCardBottom"
import PageCard, { PageCardProps } from "app/pages-grid/PageCard"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AppStore } from "store"
import TogglePublishPage from "./TogglePublishPage"

interface TogglePublishPage2Props extends ButtonProps {
  page: PageCardProps
}

const PublishModal = observer(({ page }: { page: PageCardProps }) => {
  const [previewFile, setPreviewFile] = useState<File | null>(null)

  useEffect(() => {
    if (previewFile) {
      const imageURL = URL.createObjectURL(previewFile)
      form.setFieldValue("previewImage", imageURL)
    }
  }, [previewFile])

  const [updatePageMutation, { isLoading }] = useMutation(updatePage)

  const [initialValues, setInitialValues] = useState<{
    name: string
    isTemplate: boolean
    previewImage: string | null
    tags: string[]
    feedType: string | null
  }>({
    name: page.name,
    isTemplate: Boolean(page.template),
    previewImage: page.previewImage || null,
    tags: page.tags,
    feedType: page.feedType || "All",
  })

  const form = useForm({
    initialValues,
  })

  const handleSave = async () => {
    // Upload image
    let imgSource: string | undefined
    if (previewFile) {
      if (form.values.previewImage !== page?.previewImage) {
        const data = new FormData()
        data.append("image", previewFile)
        data.append("key", "3e77a923cae4cb92226236ec6a44e793")
        data.append("action", "upload")
        data.append("format", "json")
        const axios = (await import("axios")).default

        const response = await axios("https://api.imgbb.com/1/upload", {
          method: "POST",
          data,
        })

        if ((response.status = 200 && response.data.data.url)) {
          imgSource = response.data.data.url
        } else {
          showNotification({
            title: "Upload error",
            color: "red",
            message: "Something went wrong while uploading the image",
          })
        }
      }
    }

    if (page) {
      const response = await updatePageMutation({
        id: page.id,
        previewImage: imgSource,
        name: form.values.name,
        template: form.values.isTemplate ? "user" : null,
        tags: form.values.tags,
        feedType: form.values.feedType,
      })
      if (response) {
        AppStore.updatePage(response)
        setInitialValues({
          name: response.name,
          isTemplate: Boolean(response.template),
          previewImage: response.previewImage,
          tags: response.tags,
          feedType: response.feedType,
        })
      }
    }
  }

  // Check if current values are the same as initial values
  const isSaveDisabled = useMemo(() => {
    const formTags = form.values.tags.slice().sort()
    console.log(form.values.feedType, initialValues.feedType)
    return (
      form.values.previewImage === initialValues?.previewImage &&
      form.values.name === initialValues.name &&
      form.values.isTemplate === initialValues.isTemplate &&
      form.values.feedType === initialValues.feedType &&
      formTags.length === initialValues.tags.length &&
      initialValues.tags
        .slice()
        .sort()
        .every(function (value, index) {
          return value === formTags[index]
        })
    )
  }, [
    form.values.tags,
    form.values.previewImage,
    form.values.name,
    form.values.isTemplate,
    form.values.feedType,
    initialValues?.previewImage,
    initialValues.name,
    initialValues.isTemplate,
    initialValues.feedType,
    initialValues.tags,
  ])

  const [inputTagValue, setInputTagValue] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputTagValue.length) {
      if (!form.values.tags.some((tag) => tag === inputTagValue)) {
        form.setFieldValue("tags", [...form.values.tags, inputTagValue])
        setInputTagValue("")
      } else {
        form.setFieldError("tags", "This tag already exists")
      }
    }
  }

  const handleGetCreateLabel = (query: string) => (
    <Text>
      Add <b>{query}</b> tag
    </Text>
  )

  const onCreate = (query) => {
    form.setFieldValue("tags", [...form.values.tags, query])
    return query
  }

  const onInput = (e) => {
    if (!form.values.tags.some((item) => item === e.currentTarget.value)) {
      form.clearFieldError("tags")
    }
  }

  const onChange = (value) => {
    form.setFieldValue("tags", value)
  }

  const pageCardOnDrop = useCallback((files) => {
    const file = files[0]
    setPreviewFile(file)
  }, [])
  return (
    <>
      {page && (
        <form>
          <Stack spacing={0}>
            <SimpleGrid cols={2}>
              <PageCard
                page={page}
                previewImage={form.values.previewImage}
                customizable
                onDrop={pageCardOnDrop}
                bottomNode={<FeedPageCardBottom page={page} />}
              />
              <Stack sx={{ height: "100%" }} justify="flex-start">
                <TextInput label="Page name" {...form.getInputProps("name")} />
                <MultiSelect
                  label={
                    <Text>
                      Add tags{" "}
                      <Text color="dimmed" inherit span>
                        (up to 10)
                      </Text>
                    </Text>
                  }
                  placeholder="Select tags"
                  searchable
                  creatable
                  value={form.values.tags}
                  onChange={onChange}
                  onInput={onInput}
                  maxSelectedValues={10}
                  clearable
                  error={form.errors.tags}
                  data={["Landing", "Project", "Portfolio", ...form.values.tags]}
                  getCreateLabel={handleGetCreateLabel}
                  onCreate={onCreate}
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
                <Select
                  label={
                    <Group align="center" spacing={4}>
                      Page type <Info withArrow label="Type of the page in feed filters" />
                    </Group>
                  }
                  data={["All", "Portfolio", "Project"]}
                  value={form.values.feedType}
                  onChange={(val) => form.setFieldValue("feedType", val)}
                />
                <Checkbox
                  label="Allow other users to copy the page"
                  {...form.getInputProps("isTemplate", { type: "checkbox" })}
                />
              </Stack>
            </SimpleGrid>
            <Group position="right" mt={32}>
              <TogglePublishPage variant="outline" id={page.id} color="primary" />
              <Button disabled={isSaveDisabled} loading={isLoading} size="xs" onClick={handleSave}>
                Save the settings
              </Button>
            </Group>
          </Stack>
        </form>
      )}
    </>
  )
})

const TogglePublishPage2 = ({ page, ...props }: TogglePublishPage2Props) => {
  const handleClick = () => {
    openModal({
      title: (
        <Title span order={2}>
          Publishing the page
        </Title>
      ),
      children: <PublishModal page={page} />,
      centered: true,
      size: "66%",
    })
  }

  return (
    <Button size="xs" {...props} onClick={handleClick}>
      Publication & Settings
    </Button>
  )
}

export default TogglePublishPage2

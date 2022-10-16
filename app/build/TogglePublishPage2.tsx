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
} from "@mantine/core"
import { openModal } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import updatePage from "app/build-pages/mutations/updatePage"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import FeedPageCardBottom from "app/pages-grid/FeedPageCardBottom"
import PageCard from "app/pages-grid/PageCard"
import { observer } from "mobx-react-lite"
import { useEffect, useMemo, useState } from "react"
import { AppStore } from "store"
import { BuildStore } from "store/build"
import TogglePublishPage from "./TogglePublishPage"

interface TogglePublishPage2Props extends ButtonProps {}

const PublishModal = observer(() => {
  const {
    data: { id },
  } = BuildStore
  const user = useCurrentUser()

  const page = useMemo(() => {
    const appPage = AppStore.pages.find((p) => p.id === id)
    if (appPage && user) {
      return {
        ...appPage,
        user: {
          name: user.name,
          avatar: user.avatar,
        },
      }
    }

    return null
  }, [id])

  const [customizable, setCustomizable] = useState(true)
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(page?.previewImage || null)

  useEffect(() => {
    if (previewFile) {
      const imageURL = URL.createObjectURL(previewFile)
      setPreviewImage(imageURL)
    }
  }, [previewFile])

  const isSaveDisabled = useMemo(() => {
    return previewImage === page?.previewImage
  }, [previewImage, page?.previewImage])

  const [updatePageMutation, { isLoading }] = useMutation(updatePage)

  const handleSave = async () => {
    // Upload image
    if (previewFile) {
      if (previewImage !== page?.previewImage) {
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
          page &&
            (await updatePageMutation({
              id: page.id,
              previewImage: response.data.data.url || undefined,
            }))
        } else {
          showNotification({
            title: "Upload error",
            color: "red",
            message: "Something went wrong while uploading the image",
          })
        }
      }
    }
  }

  return (
    <>
      {page && (
        <Stack spacing={0}>
          <SimpleGrid cols={2}>
            <PageCard
              page={page}
              previewImage={previewImage}
              customizable={customizable}
              onDrop={(files) => {
                const file = files[0]
                setPreviewFile(file)
              }}
              bottomNode={<FeedPageCardBottom page={page} />}
            />
            <Stack sx={{ height: "100%" }} justify="flex-start">
              <TextInput label="Page name" defaultValue={page.name} />
              <Checkbox label="Allow other users to copy the page" />
            </Stack>
          </SimpleGrid>
          <Group position="right" mt={32}>
            <TogglePublishPage variant="outline" id={page.id} color="primary" />
            <Button disabled={isSaveDisabled} loading={isLoading} size="xs" onClick={handleSave}>
              Save the settings
            </Button>
          </Group>
        </Stack>
      )}
    </>
  )
})

const TogglePublishPage2 = (props: TogglePublishPage2Props) => {
  return (
    <Button
      size="xs"
      {...props}
      onClick={() => {
        openModal({
          title: (
            <Title span order={2}>
              Publishing the page
            </Title>
          ),
          children: <PublishModal />,
          centered: true,
          size: "66%",
        })
      }}
    >
      Publish page
    </Button>
  )
}

export default TogglePublishPage2

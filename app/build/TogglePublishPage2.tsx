import { Button, ButtonProps, Text, Title, Box, Center, Stack, Group } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import PageCard from "app/pages-grid/PageCard"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AppStore } from "store"
import { BuildStore } from "store/build"

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

  const [customizable, setCustomizable] = useState(false)
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (previewFile) {
      const imageURL = URL.createObjectURL(previewFile)
      setPreviewImage(imageURL)
    } else {
      setPreviewImage(null)
    }
  }, [previewFile])

  return (
    <>
      {page && (
        <Stack spacing={0}>
          <Box
            sx={{
              maxWidth: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-start",
              "> div": { width: "100%" },
            }}
          >
            <Group position="apart" align="center">
              <Text size="md" span weight={400}>
                Preview (16x9)
              </Text>
              <Button
                compact
                variant="default"
                size="sm"
                onClick={() => setCustomizable((c) => !c)}
              >
                {customizable ? "Save preview" : "Edit preview"}
              </Button>
            </Group>
            <PageCard
              page={page}
              previewImage={previewImage}
              customizable={customizable}
              onDrop={(files) => {
                const file = files[0]
                setPreviewFile(file)
              }}
            />
          </Box>
          <Button mt={32} sx={{ alignSelf: "center" }}>
            Publish the page
          </Button>
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

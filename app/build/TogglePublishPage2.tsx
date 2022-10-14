import { Button, ButtonProps, Text, Title, Box, Center, Stack, Group } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import PageCard from "app/pages-grid/PageCard"
import { observer } from "mobx-react-lite"
import { useCallback, useMemo, useState } from "react"
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
            <Title order={4} span>
              Preview
            </Title>
            <PageCard page={page} customizable />
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

import {
  useMantineTheme,
  Group,
  Stack,
  Tooltip,
  ActionIcon,
  Button,
  Text,
  Box,
  Mark,
  Space,
} from "@mantine/core"
import { formatDate } from "helpers/utils"
import Link from "next/link"

import { Page } from "@prisma/client"
import { openConfirmModal } from "@mantine/modals"
import { useMutation } from "@blitzjs/rpc"
import deletePage from "./mutations/deletePage"
import { useEffect } from "react"
import { AppStore } from "store"
import PageLink from "app/build/PageLink"
import TogglePublishPage from "app/build/TogglePublishPage"
import { TemplateModal } from "app/core/components/modals/base/TemplateModal"

import { HiPencilAlt } from "@react-icons/all-files/hi/HiPencilAlt"
import { HiTemplate } from "@react-icons/all-files/hi/HiTemplate"
import { RiDeleteBinLine } from "@react-icons/all-files/ri/RiDeleteBinLine"

export interface PageCardProps {
  page: Page
  withEdit?: boolean
}

const PageCard = ({ page, withEdit = true }: PageCardProps) => {
  // const { t } = useTranslation('build');
  const theme = useMantineTheme()

  const [deletePageMutation, { isSuccess }] = useMutation(deletePage)

  useEffect(() => {
    if (isSuccess) {
      AppStore.removePage(page.id)
    }
  }, [isSuccess])

  const openDeleteModal = () =>
    openConfirmModal({
      title: <Text weight="bold">Delete your page</Text>,
      centered: true,
      children: (
        <>
          <Text size="sm">
            Are you sure you want to delete your page? <br />
            This action is &nbsp;
            <Mark color="red">
              <strong>irreversible</strong>
            </Mark>
            .
          </Text>
        </>
      ),
      labels: { confirm: "Yes, delete the page", cancel: "No, don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => deletePageMutation({ id: page.id }),
    })

  const dark = theme.colorScheme === "dark"

  return (
    <Box
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: "0px 5px 16px -2px rgba(34, 60, 80, 0.2)",
        listStyle: "none",
        ":not(:last-child)": { marginBottom: theme.spacing.md },
      })}
    >
      <Group position="apart" align="flex-start">
        <Stack spacing={0} align="flex-start">
          <Text weight="bold" size="xl">
            {page.name}
          </Text>
          <PageLink id={page.id} />
          <Space h="xs" />
          <TogglePublishPage id={page.id} />
        </Stack>
        <Stack spacing="xs">
          <Group spacing="xs" position="right">
            <TemplateModal
              page={page}
              color="dark"
              size="sm"
              rightIcon={<HiTemplate />}
              component={Button}
              variant={dark ? "white" : "filled"}
            >
              Use as a template
            </TemplateModal>
            {withEdit && (
              <Link passHref href={`/build/${page.id}`}>
                <Button color="violet" size="sm" component="a" rightIcon={<HiPencilAlt />}>
                  Edit page
                </Button>
              </Link>
            )}
            <Tooltip label="Delete page" withArrow position="bottom">
              <ActionIcon color="red" variant="filled" size="lg" onClick={openDeleteModal}>
                <RiDeleteBinLine />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text color={theme.colors.gray[6]} align="end" size="xs">
            last edit {formatDate(page.updatedAt)}
          </Text>
        </Stack>
      </Group>
    </Box>
  )
}

export default PageCard

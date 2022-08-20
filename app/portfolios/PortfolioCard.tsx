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
import { formatDate } from "helpers"
import Link from "next/link"

import { Portfolio } from "@prisma/client"
import { HiPencilAlt } from "react-icons/hi"
import { RiDeleteBinLine } from "react-icons/ri"
import { openConfirmModal } from "@mantine/modals"
import { useMutation } from "@blitzjs/rpc"
import deletePortfolio from "./mutations/deletePortfolio"
import { useEffect } from "react"
import { AppStore } from "store"
import PortfolioLink from "app/build/PortfolioLink"
import TogglePublishPortfilio from "app/build/TogglePublishPortfolio"

export interface PortfolioPreview
  extends Pick<Portfolio, "name" | "id" | "updatedAt" | "isPublished"> {
  withEdit?: boolean
}

const PortfolioCard = ({ name, id, updatedAt, isPublished, withEdit = true }: PortfolioPreview) => {
  // const { t } = useTranslation('pagesBuild');
  const theme = useMantineTheme()

  const [deletePortfolioMutation, { isSuccess }] = useMutation(deletePortfolio)

  useEffect(() => {
    if (isSuccess) {
      AppStore.removePortfolio(id)
    }
  }, [isSuccess])

  const openDeleteModal = () =>
    openConfirmModal({
      title: <Text weight="bold">Delete your portfolio</Text>,
      centered: true,
      children: (
        <>
          <Text size="sm">
            Are you sure you want to delete your portfolio? <br />
            This action is &nbsp;
            <Mark color="red">
              <strong>irreversible</strong>
            </Mark>
            .
          </Text>
        </>
      ),
      labels: { confirm: "Yes, delete the portfolio", cancel: "No, don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => deletePortfolioMutation({ id }),
    })

  return (
    <Box
      p="md"
      component="li"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        listStyle: "none",
        ":not(:last-child)": { marginBottom: theme.spacing.md },
      })}
    >
      <Group position="apart" align="flex-start">
        <Stack spacing={0} align="flex-start">
          <Text weight="bold" size="xl">
            {name}
          </Text>
          <PortfolioLink id={id} />
          <Space h="xs" />
          <TogglePublishPortfilio id={id} />
        </Stack>
        <Stack spacing="xs">
          <Group spacing="xs" position="right">
            {withEdit && (
              <Link passHref href={`/build/${id}`}>
                <Button color="violet" component="a" rightIcon={<HiPencilAlt />}>
                  Edit portfolio
                </Button>
              </Link>
            )}
            <Tooltip label="Delete portfolio" withArrow position="bottom" color="violet">
              <ActionIcon color="red" variant="filled" size="lg" onClick={openDeleteModal}>
                <RiDeleteBinLine />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text color={theme.colors.gray[6]} align="end" size="xs">
            last edit {formatDate(updatedAt)}
          </Text>
        </Stack>
      </Group>
    </Box>
  )
}

export default PortfolioCard

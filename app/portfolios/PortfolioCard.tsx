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

import { Page } from "@prisma/client"
import { openConfirmModal } from "@mantine/modals"
import { useMutation } from "@blitzjs/rpc"
import deletePortfolio from "./mutations/deletePortfolio"
import { useEffect } from "react"
import { AppStore } from "store"
import PortfolioLink from "app/build/PortfolioLink"
import TogglePublishPortfilio from "app/build/TogglePublishPortfolio"
import { TemplateModal } from "app/core/components/modals/base/TemplateModal"

import { HiPencilAlt } from "@react-icons/all-files/hi/HiPencilAlt"
import { HiTemplate } from "@react-icons/all-files/hi/HiTemplate"
import { RiDeleteBinLine } from "@react-icons/all-files/ri/RiDeleteBinLine"

export interface PortfolioPreview {
  portfolio: Page
  withEdit?: boolean
}

const PortfolioCard = ({ portfolio, withEdit = true }: PortfolioPreview) => {
  // const { t } = useTranslation('build');
  const theme = useMantineTheme()

  const [deletePortfolioMutation, { isSuccess }] = useMutation(deletePortfolio)

  useEffect(() => {
    if (isSuccess) {
      AppStore.removePortfolio(portfolio.id)
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
      onConfirm: () => deletePortfolioMutation({ id: portfolio.id }),
    })

  return (
    <Box
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: `0px 5px 10px 2px rgba(34, 60, 80, 0.1)`,
        listStyle: "none",
        ":not(:last-child)": { marginBottom: theme.spacing.md },
      })}
    >
      <Group position="apart" align="flex-start">
        <Stack spacing={0} align="flex-start">
          <Text weight="bold" size="xl">
            {portfolio.name}
          </Text>
          <PortfolioLink id={portfolio.id} />
          <Space h="xs" />
          <TogglePublishPortfilio id={portfolio.id} />
        </Stack>
        <Stack spacing="xs">
          <Group spacing="xs" position="right">
            <TemplateModal
              portfolio={portfolio}
              color="orange"
              size="sm"
              rightIcon={<HiTemplate />}
              component={Button}
            >
              Use as a template
            </TemplateModal>
            {withEdit && (
              <Link passHref href={`/build/${portfolio.id}`}>
                <Button color="violet" size="sm" component="a" rightIcon={<HiPencilAlt />}>
                  Edit portfolio
                </Button>
              </Link>
            )}
            <Tooltip label="Delete portfolio" withArrow position="bottom">
              <ActionIcon color="red" variant="filled" size="lg" onClick={openDeleteModal}>
                <RiDeleteBinLine />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text color={theme.colors.gray[6]} align="end" size="xs">
            last edit {formatDate(portfolio.updatedAt)}
          </Text>
        </Stack>
      </Group>
    </Box>
  )
}

export default PortfolioCard

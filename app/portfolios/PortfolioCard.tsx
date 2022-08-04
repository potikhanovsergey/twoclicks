import {
  useMantineTheme,
  Group,
  Stack,
  Anchor,
  CopyButton,
  Tooltip,
  ActionIcon,
  Switch,
  Button,
  Text,
  Box,
  Mark,
} from "@mantine/core"
import { formatDate } from "helpers"
import Link from "next/link"
import { BiCheckDouble, BiCopy } from "react-icons/bi"

import { Portfolio } from "@prisma/client"
import { HiPencilAlt } from "react-icons/hi"
import { RiDeleteBinLine } from "react-icons/ri"
import { openConfirmModal } from "@mantine/modals"
import { useMutation } from "@blitzjs/rpc"
import deletePortfolio from "./mutations/deletePortfolio"
import { useEffect } from "react"
import { AppStore } from "store"

export type PortfolioPreview = Pick<Portfolio, "name" | "id" | "updatedAt">

const PortfolioCard = ({ name, id, updatedAt }: PortfolioPreview) => {
  // const { t } = useTranslation('pagesBuild');
  const theme = useMantineTheme()
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : process.env.NEXT_PUBLIC_PRODUCTION_URL

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
        <Text size="sm">
          Are you sure you want to delete your portfolio? <br />
          This action is &nbsp;
          <Mark color="red">
            <strong>irreversible</strong>
          </Mark>
          .
        </Text>
      ),
      labels: { confirm: "Delete portfolio", cancel: "No don't delete it" },
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
        <Stack spacing={0}>
          <Text weight="bold" size="xl">
            {name}
          </Text>
          <Group spacing={4} mb="xs">
            <Anchor href={`${baseURL}/p/${id}`} target="_blank" color="blue">
              {`${baseURL}/p/${id}`}
            </Anchor>
            <CopyButton value={`${baseURL}/p/${id}`} timeout={10000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Link copied" : "Copy link"} withArrow position="top">
                  <ActionIcon color={copied ? "teal" : "gray"} onClick={copy} size="sm">
                    {copied ? <BiCheckDouble size={16} /> : <BiCopy size={16} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
          <Switch label="Publish" radius="xl" color="violet" />
        </Stack>
        <Stack spacing="xs">
          <Group spacing="xs">
            <Link passHref href={`/build/${id}`}>
              <Button
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                component="a"
                rightIcon={<HiPencilAlt />}
              >
                Edit portfolio
              </Button>
            </Link>
            <ActionIcon color="red" variant="filled" size="lg" onClick={openDeleteModal}>
              <RiDeleteBinLine />
            </ActionIcon>
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

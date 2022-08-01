import {
  useMantineTheme,
  Paper,
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
} from "@mantine/core"
import { formatDate } from "helpers"
import Link from "next/link"
import { BiCheckDouble, BiCopy } from "react-icons/bi"

import { Portfolio } from "@prisma/client"
import { HiPencilAlt } from "react-icons/hi"

export type PortfolioPreview = Pick<Portfolio, "name" | "id" | "updatedAt">

const PortfolioCard = ({ name, id, updatedAt }: PortfolioPreview) => {
  // const { t } = useTranslation('pagesBuild');
  const theme = useMantineTheme()
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : process.env.NEXT_PUBLIC_PRODUCTION_URL
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
          <Text color={theme.colors.gray[6]} align="center" size="xs">
            last edit {formatDate(updatedAt)}
          </Text>
        </Stack>
      </Group>
    </Box>
  )
}

export default PortfolioCard

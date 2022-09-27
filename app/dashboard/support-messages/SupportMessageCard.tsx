import { Box, Text } from "@mantine/core"
import { SupportMessage } from "@prisma/client"
import { formatDate } from "helpers"

const SupportMessageCard = (supportMessage: SupportMessage) => {
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
      <Text size="xl" weight="bold">
        {supportMessage.subject}
      </Text>
      <Text color="gray" size="md" mb="md">
        {formatDate(supportMessage.createdAt)} {supportMessage.email}
      </Text>
      <Text size="md">{supportMessage.message}</Text>
    </Box>
  )
}

export default SupportMessageCard

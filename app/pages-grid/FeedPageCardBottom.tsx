import { Group, Avatar, Text } from "@mantine/core"
import { PageCardProps } from "./PageCard"

const FeedPageCardBottom = ({ page }: { page: PageCardProps }) => {
  return (
    <Group position="apart" align="center" noWrap>
      <Group spacing={6} align="center" noWrap>
        <Avatar
          src={page.user.avatar}
          variant="light"
          size="sm"
          radius="xl"
          alt={page.user.name + " profile"}
        />
        <Text
          weight="bold"
          size="sm"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "24ch",
            whiteSpace: "nowrap",
          }}
        >
          {page.user.name}
        </Text>
      </Group>

      <Text color="dimmed" size="sm">
        View count
      </Text>
    </Group>
  )
}

export default FeedPageCardBottom

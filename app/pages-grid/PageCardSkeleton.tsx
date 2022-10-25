import { Stack, Skeleton, Group } from "@mantine/core"

const PageCardSkeleton = () => {
  return (
    <Stack spacing={8}>
      <Skeleton animate height={222} />
      <Group position="apart">
        <Group spacing={6} noWrap align="center">
          <Skeleton radius="xl" width={26} height={26} animate />
          <Skeleton width={120} height={26} animate />
        </Group>
        <Skeleton width={40} height={26} animate />
      </Group>
    </Stack>
  )
}

export default PageCardSkeleton

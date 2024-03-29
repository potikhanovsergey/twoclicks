import { usePaginatedQuery } from "@blitzjs/rpc"
import { Container, Group, Pagination, Stack, Text, TextInput } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import getAllPages from "app/build-pages/queries/getAllPages"
import { useDidMount } from "hooks/useDidMount"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { HiSearch } from "@react-icons/all-files/hi/HiSearch"
import PageCard from "app/build-pages/PageCard"
import { AuthorizationError } from "blitz"
import { useSession } from "@blitzjs/auth"
import { Page } from "@prisma/client"

const ITEMS_PER_PAGE = 50

const DashboardPages = () => {
  const session = useSession()
  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])
  const [searchValue, setSearchValue] = useDebouncedState("", 200)

  const router = useRouter()
  const pageNumber = Number(router.query.page) || 1
  const [{ pages, hasMore, count }]: [
    {
      pages: (Page & { user: { name: string; email: string } })[]
      hasMore: boolean
      count: number
    },
    {}
  ] = usePaginatedQuery(getAllPages, {
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
    skip: ITEMS_PER_PAGE * (pageNumber - 1),
    take: ITEMS_PER_PAGE,
    include: { user: { select: { name: true, email: true } } },
    where: {
      user: {
        email: {
          contains: searchValue,
          mode: "insensitive",
        },
      },
    },
  })

  const goToPage = (page: number) => router.push({ query: { page } })

  const didMount = useDidMount()
  useEffect(() => {
    if (!didMount) {
      void goToPage(1)
    }
  }, [searchValue])

  return pages ? (
    <Container size="xl" my="md">
      <Group position="apart" mb="sm">
        <TextInput
          defaultValue={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          icon={<HiSearch />}
          placeholder="Enter email"
        ></TextInput>
        <Pagination
          page={pageNumber}
          onChange={goToPage}
          total={Math.ceil(count / ITEMS_PER_PAGE)}
        />
      </Group>
      <Stack spacing="xl">
        {pages.map((page) => (
          <div key={page.id}>
            <Group ml="md" spacing="sm">
              <Text weight="bold" size="lg">
                {page.user.name}
              </Text>
              <Text weight="bold" size="lg" color="primary">
                {page.user.email}
              </Text>
            </Group>
            <PageCard page={page} withEdit={false} />
          </div>
        ))}
        <Pagination
          page={pageNumber}
          onChange={goToPage}
          total={Math.ceil(count / ITEMS_PER_PAGE)}
        />
      </Stack>
    </Container>
  ) : (
    <></>
  )
}

DashboardPages.getLayout = getBaseLayout({})
DashboardPages.suppressFirstRenderFlicker = true

export default DashboardPages

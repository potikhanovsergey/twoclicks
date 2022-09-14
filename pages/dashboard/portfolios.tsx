import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { Button, Container, Group, Pagination, Stack, Text, TextInput } from "@mantine/core"
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import PortfolioCard from "app/portfolios/PortfolioCard"
import getAllPortfolios from "app/portfolios/queries/getAllPortfolios"
import { useDidMount } from "hooks/useDidMount"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { HiSearch } from "react-icons/hi"

const ITEMS_PER_PAGE = 50

const Portfolios = () => {
  // const [portfolios] = useQuery(getAllPortfolios, {
  //   orderBy: [
  //     {
  //       updatedAt: "desc",
  //     },
  //   ],
  // })
  const [searchValue, setSearchValue] = useDebouncedState("", 200)

  const router = useRouter()
  const page = Number(router.query.page) || 1
  const [{ portfolios, hasMore, count }] = usePaginatedQuery(getAllPortfolios, {
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
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

  return portfolios ? (
    <Container size="xl" my="md">
      <Group position="apart" mb="sm">
        <TextInput
          defaultValue={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          icon={<HiSearch />}
          placeholder="Enter email"
        ></TextInput>
        <Pagination page={page} onChange={goToPage} total={Math.ceil(count / ITEMS_PER_PAGE)} />
      </Group>
      <Stack spacing="xl">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id}>
            <Group ml="md" spacing="sm">
              <Text weight="bold" size="lg">
                {portfolio.user.name}
              </Text>
              <Text weight="bold" size="lg" color="violet">
                {portfolio.user.email}
              </Text>
            </Group>
            <PortfolioCard portfolio={portfolio} withEdit={false} />
          </div>
        ))}
        <Pagination page={page} onChange={goToPage} total={Math.ceil(count / ITEMS_PER_PAGE)} />
      </Stack>
    </Container>
  ) : (
    <></>
  )
}

Portfolios.getLayout = getBaseLayout({})
Portfolios.suppressFirstRenderFlicker = true

export default Portfolios

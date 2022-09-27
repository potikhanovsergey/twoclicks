import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { useEffect } from "react"
import { AuthorizationError } from "blitz"
import { useSession } from "@blitzjs/auth"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import getSupportMessages from "app/dashboard/support-messages/queries/getSupportMessages"
import SupportMessageCard from "app/dashboard/support-messages/SupportMessageCard"
import { Container, Group, LoadingOverlay, Pagination, TextInput } from "@mantine/core"
import { HiSearch } from "@react-icons/all-files/hi/HiSearch"
import { useDebouncedState } from "@mantine/hooks"
import { useRouter } from "next/router"
import { useDidMount } from "hooks/useDidMount"

const ITEMS_PER_PAGE = 50

const SupportMessages = () => {
  const session = useSession()
  const [searchValue, setSearchValue] = useDebouncedState("", 500)
  const router = useRouter()
  const pageNumber = Number(router.query.page) || 1

  const [{ supportMessages, count, hasMore }] = usePaginatedQuery(getSupportMessages, {
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    skip: ITEMS_PER_PAGE * (pageNumber - 1),
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        {
          email: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          message: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          subject: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
      ],
    },
  })

  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])

  const goToPage = (page: number) => router.push({ query: { page } })

  const didMount = useDidMount()
  useEffect(() => {
    if (!didMount) {
      void goToPage(1)
    }
  }, [searchValue])

  return supportMessages ? (
    <>
      <Container size="lg" my="md">
        <Group position="apart" mb="md">
          <TextInput
            defaultValue={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            icon={<HiSearch />}
            placeholder="Enter email, message or subject"
            sx={{ minWidth: "300px" }}
          />
          <Pagination
            page={pageNumber}
            onChange={goToPage}
            total={Math.ceil(count / ITEMS_PER_PAGE)}
          />
        </Group>
        {supportMessages.map((supportMessage) => (
          <SupportMessageCard {...supportMessage} key={supportMessage.id} />
        ))}
        <Pagination
          page={pageNumber}
          onChange={goToPage}
          total={Math.ceil(count / ITEMS_PER_PAGE)}
        />
      </Container>
    </>
  ) : (
    <></>
  )
}

SupportMessages.getLayout = getBaseLayout({})
SupportMessages.suppressFirstRenderFlicker = true

export default SupportMessages

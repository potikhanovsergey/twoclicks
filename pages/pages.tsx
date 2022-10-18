import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Box, Container, Group, SimpleGrid, Skeleton, Stack } from "@mantine/core"
import { useSession } from "@blitzjs/auth"
import { AuthorizationError } from "blitz"
import { useEffect } from "react"
import PagesHeader from "app/pages-grid/PagesHeader"
import PagesGrid from "app/pages-grid/PagesGrid"
import { usePaginatedQuery } from "@blitzjs/rpc"
import getAllPages from "app/build-pages/queries/getAllPages"
import { useRouter } from "next/router"
import { PageCardProps } from "app/pages-grid/PageCard"
import { FeedStore } from "store/feed"
import { observer } from "mobx-react-lite"
import { useDebouncedValue } from "@mantine/hooks"
import PageCardSkeleton from "app/pages-grid/PageCardSkeleton"

const ITEMS_PER_PAGE = 50

const PagesFeed = observer(({ pages }: { pages: PageCardProps[] }) => {
  return (
    <Container size="lg" pb="xl">
      <Box
        sx={(theme) => ({
          position: "sticky",
          top: "var(--layout-header-height)",
          background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          zIndex: 10,
        })}
      >
        <PagesHeader />
      </Box>
      {/* {hasSkeletons ? (
        <SimpleGrid cols={3} spacing={32}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
            <PageCardSkeleton key={i} />
          ))}
          <Skeleton visible animate height={200} />
        </SimpleGrid>
      ) : ( */}
      <PagesGrid pages={pages as PageCardProps[]} />
      {/* )} */}
    </Container>
  )
})

const Pages = () => {
  const session = useSession()
  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])

  const router = useRouter()

  const { searchValue } = FeedStore
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 300)

  const pageNumber = Number(router.query.page) || 1
  const [{ pages, hasMore, count }] = usePaginatedQuery(
    getAllPages,
    {
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      skip: ITEMS_PER_PAGE * (pageNumber - 1),
      take: ITEMS_PER_PAGE,
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      where: {
        // isPublished: true,
        OR: [
          {
            name: {
              mode: "insensitive",
              contains: debouncedSearchValue,
            },
          },
          {
            tags: {
              has: debouncedSearchValue,
            },
          },
          {
            user: {
              name: {
                mode: "insensitive",
                contains: debouncedSearchValue,
              },
            },
          },
        ],
      },
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  return <PagesFeed pages={pages as PageCardProps[]} />
}

Pages.getLayout = getBaseLayout({ withNotificationsProvider: false, headerWithTransparency: false })
Pages.suppressFirstRenderFlicker = true

const ObservedPage = observer(Pages)

ObservedPage.displayName = "Pages"

export default ObservedPage

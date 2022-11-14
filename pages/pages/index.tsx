import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Box, Container, Text, Loader, Group } from "@mantine/core"
import { Suspense, useEffect, useMemo } from "react"
import PagesHeader from "app/pages-grid/PagesHeader"
import PagesGrid from "app/pages-grid/PagesGrid"
import { useInfiniteQuery } from "@blitzjs/rpc"
import getAllPages from "app/build-pages/queries/getAllPages"
import { PageCardProps } from "app/pages-grid/PageCard"
import { FeedStore } from "store/feed"
import { observer } from "mobx-react-lite"
import { useDebouncedValue, useIntersection } from "@mantine/hooks"

const PagesFeed = observer(() => {
  const { searchValue, feedType, sortType } = FeedStore
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 300)

  const [pagesPages, { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage }] =
    useInfiniteQuery(
      getAllPages,
      (
        page = {
          take: 16,
          skip: 0,
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            updatedAt: sortType === "Latest" ? "desc" : undefined,
          },
          where: {
            isPublished: true,
            feedType: feedType === "All" || feedType === "Template" ? undefined : feedType,
            template:
              feedType === "Template"
                ? {
                    not: null,
                  }
                : undefined,
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
        }
      ) => page,
      {
        getNextPageParam: (lastPage) => ({
          ...lastPage.nextPage,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            updatedAt: sortType === "Latest" ? "desc" : undefined,
          },
          where: {
            isPublished: true,
            feedType: feedType === "All" || feedType === "Template" ? undefined : feedType,
            template:
              feedType === "Template"
                ? {
                    not: null,
                  }
                : undefined,
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
        }),
      }
    )

  const { ref: loadMoreRef, entry } = useIntersection({
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && pagesPages[pagesPages.length - 1].hasMore) {
      void fetchNextPage()
    }
  }, [entry, pagesPages])

  const pages = useMemo(() => {
    const returnPages: PageCardProps[] = []
    pagesPages.forEach((p) => p.pages.forEach((pp: PageCardProps) => returnPages.push(pp)))
    return returnPages
  }, [pagesPages])

  return (
    <>
      <PagesGrid pages={pages as PageCardProps[]} />
      <Group
        my="md"
        align="center"
        position="center"
        ref={loadMoreRef}
        sx={{ display: pagesPages[pagesPages.length - 1].hasMore ? "flex" : "none" }}
      >
        <Text weight="bold">Loading more...</Text>
        <Loader />
      </Group>
    </>
  )
})

const Pages = () => {
  return (
    <>
      <Box
        sx={(theme) => ({
          position: "sticky",
          top: "var(--layout-header-height)",
          background: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
          zIndex: 10,
        })}
      >
        <Container size="xl" pb="md" pt="xl">
          <PagesHeader />
        </Container>
      </Box>
      <Container size="xl" pb="xl">
        <Suspense>
          <PagesFeed />
        </Suspense>
      </Container>
    </>
  )
}

Pages.getLayout = getBaseLayout({ withNotificationsProvider: false, headerWithTransparency: false })
Pages.suppressFirstRenderFlicker = true

const ObservedPage = observer(Pages)

ObservedPage.displayName = "Pages"

export default ObservedPage

import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Box, Container, Group, Select, Grid, Button } from "@mantine/core"
import { useSession } from "@blitzjs/auth"
import { AuthorizationError } from "blitz"
import { useEffect } from "react"
import PagesHeader from "app/pages/PagesHeader"
import PagesGrid from "app/pages/PagesGrid"
import { useInfiniteQuery, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import getAllPages from "app/build-pages/queries/getAllPages"
import { useRouter } from "next/router"
import { Page } from "@prisma/client"

const ITEMS_PER_PAGE = 50

const Pages = () => {
  const session = useSession()
  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])

  const router = useRouter()

  const pageNumber = Number(router.query.page) || 1
  const [{ pages, hasMore, count }] = usePaginatedQuery(getAllPages, {
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
      isPublished: true,
    },
  })
  return (
    <Container size="lg" pb="xl">
      <PagesHeader />
      <PagesGrid pages={pages as (Page & { user: { name: string; avatar: string } })[]} />
    </Container>
  )
}

Pages.getLayout = getBaseLayout({ withNotificationsProvider: false, headerWithTransparency: true })
Pages.suppressFirstRenderFlicker = true

export default Pages

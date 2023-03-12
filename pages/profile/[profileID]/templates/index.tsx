import { useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Center, Text } from "@mantine/core"
import PageCardsList from "app/build-pages/PageCardsList"
import getUserPages from "app/build-pages/queries/getUserPages"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import NewProfileLayout from "app/core/layouts/NewProfileLayout"
import getUserByID from "app/profile/queries/getUserByID"
import { AppStore } from "store"

const ProfileTemplates = () => {
  const profileID = useParam("profileID", "string")
  const [profileFromDB] = useQuery(
    getUserByID,
    { id: profileID },
    { refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false }
  )

  const [fetchedPages, { isLoading, isFetching, isRefetching }] = useQuery(
    getUserPages,
    {
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      where: {
        template: {
          not: null,
        },
      },
    },
    {
      enabled: !AppStore.havePagesLoaded,
    }
  )

  return (
    <>
      {profileFromDB ? (
        <NewProfileLayout user={profileFromDB}>
          {fetchedPages && fetchedPages?.length > 0 ? (
            <PageCardsList user={profileFromDB} pages={fetchedPages} />
          ) : (
            <Text>Нет шаблонов</Text>
          )}
        </NewProfileLayout>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>Page not found</Text>
        </Center>
      )}
    </>
  )
}

ProfileTemplates.getLayout = getBaseLayout({})
ProfileTemplates.suppressFirstRenderFlicker = true

export default ProfileTemplates

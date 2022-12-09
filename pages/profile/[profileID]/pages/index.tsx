import { useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { LoadingOverlay, Center, Text, Container, Loader } from "@mantine/core"
import PageCards from "app/build-pages/PageCards"
import PageCardsList from "app/build-pages/PageCardsList"
import getUserPages from "app/build-pages/queries/getUserPages"
import BaseLayout, { getBaseLayout } from "app/core/layouts/BaseLayout"
import NewProfileLayout from "app/core/layouts/NewProfileLayout"
import getUserByID from "app/profile/queries/getUserByID"
import { Suspense } from "react"

const ProfilePages = () => {
  const profileID = useParam("profileID", "string")
  const [profileFromDB] = useQuery(
    getUserByID,
    { id: profileID },
    { refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false }
  )

  const [fetchedPages, { isLoading }] = useQuery(getUserPages, {
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  })

  return (
    <>
      {profileFromDB ? (
        <NewProfileLayout user={profileFromDB}>
          {isLoading ? (
            <Loader />
          ) : (
            <PageCardsList pages={fetchedPages || []} user={profileFromDB} />
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
ProfilePages.getLayout = getBaseLayout({})
ProfilePages.suppressFirstRenderFlicker = true

export default ProfilePages

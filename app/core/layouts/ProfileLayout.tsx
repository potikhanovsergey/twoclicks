import { ReactNode } from "react"
import { AppShell } from "@mantine/core"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
import ProfileNavbar from "app/profile/ProfileNavbar"
import Head from "next/head"
import { NotificationsProvider } from "@mantine/notifications"

interface IProfileLayout {
  children: ReactNode
  title?: string
}

const ProfileLayout = ({ title, children }: IProfileLayout) => {
  return (
    <NotificationsProvider>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/oneclick.svg" />
      </Head>

      <AppShell
        styles={{
          main: {
            minHeight: "calc(100vh - var(--layout-header-height))",
            paddingTop: "calc(var(--layout-header-height, 0px) + 16px)",
            paddingLeft: "calc(var(--mantine-navbar-width, 0px) + 16px)",
            paddingRight: "calc(var(--mantine-aside-width, 0px) + 16px)",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={<ProfileNavbar />}
        header={
          <LayoutHeader hasLogo={false} style={{ left: "var(--mantine-navbar-width)" }} fixed />
        }
      >
        {children}
      </AppShell>
    </NotificationsProvider>
  )
}

ProfileLayout.authenticate = { redirectTo: "/auth" }

export function getProfileLayout() {
  return (page: JSX.Element) => <ProfileLayout>{page}</ProfileLayout>
}

export default ProfileLayout

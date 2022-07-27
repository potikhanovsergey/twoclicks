import { ReactNode, useState, FC } from "react"
import { AppShell } from "@mantine/core"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
import ProfileNavbar from "app/profile/ProfileNavbar"
import Head from "next/head"

interface IProfileLayout {
  children: ReactNode
  title?: string
}

const ProfileLayout = ({ title, children }: IProfileLayout) => {
  const [menuOpened, setMenuOpened] = useState(false)
  return (
    <>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <AppShell
        styles={{
          main: {
            // background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            paddingTop: "calc(var(--home-header-height, 0px) + 20px)",
            paddingLeft: "calc(var(--mantine-navbar-width, 0px) + 32px)",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={<ProfileNavbar menuOpened={menuOpened} />}
        header={
          <LayoutHeader
            hasLogo={false}
            style={{ left: "var(--mantine-navbar-width)" }}
            fixed
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        }
      >
        {children}
      </AppShell>
    </>
  )
}

ProfileLayout.authenticate = { redirectTo: "/auth" }

export function getProfileLayout() {
  return (page: JSX.Element) => <ProfileLayout>{page}</ProfileLayout>
}

export default ProfileLayout

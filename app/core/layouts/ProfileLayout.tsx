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
  return (
    <>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/favicon.svg" />
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
        header={
          <LayoutHeader hasLogo={false} style={{ left: "var(--mantine-navbar-width)" }} fixed />
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

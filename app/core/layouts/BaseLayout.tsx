import Head from "next/head"
import { AppShell } from "@mantine/core"
import React, { FC } from "react"
import LayoutHeader from "../components/layout/LayoutHeader"
import ConditionalWrapper from "../components/ConditionalWrapper"
import dynamic from "next/dynamic"
import { NotificationProviderProps } from "@mantine/notifications"

const NotificationsProvider = dynamic<NotificationProviderProps>(() =>
  import("@mantine/notifications").then((module) => module.NotificationsProvider)
)

interface BaseLayoutProps {
  title?: string
  children?: React.ReactNode
  headerWithTransparency?: boolean
  headerWithProfile?: boolean
  headerWithAuthButton?: boolean
  withNotificationsProvider?: boolean
}

const BaseLayout: FC<BaseLayoutProps> = ({
  title,
  children,
  headerWithTransparency = true,
  headerWithProfile = true,
  headerWithAuthButton = true,
  withNotificationsProvider = true,
}) => {
  return (
    <ConditionalWrapper
      condition={withNotificationsProvider}
      wrap={(children) => {
        return <NotificationsProvider>{children}</NotificationsProvider>
      }}
    >
      <Head>
        <title>{title || "Twoclicks"}</title>
      </Head>
      <AppShell
        styles={{
          body: {
            minHeight: "100vh",
          },
          root: {
            minHeight: "100vh",
          },
          main: {
            minHeight: "calc(100vh - var(--layout-header-height))",
            paddingTop: "calc(var(--layout-header-height, 0px))",
            paddingBottom: "calc(var(--layout-footer-height, 0px))",
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        header={
          <LayoutHeader
            fixed
            withTransparency={headerWithTransparency}
            withProfile={headerWithProfile}
            withAuthButton={headerWithAuthButton}
          />
        }
      >
        {children}
      </AppShell>
    </ConditionalWrapper>
  )
}

export function getBaseLayout(props: BaseLayoutProps) {
  return (page: JSX.Element) => <BaseLayout {...props}>{page}</BaseLayout>
}

export default BaseLayout

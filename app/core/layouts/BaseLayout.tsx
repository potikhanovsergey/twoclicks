import Head from "next/head"
import { AppShell, Footer } from "@mantine/core"
import React, { FC, useState } from "react"
import LayoutHeader from "../components/layout/LayoutHeader"

interface BaseLayoutProps {
  title?: string
  children?: React.ReactNode
  headerWithTransparency?: boolean
  headerWithProfile?: boolean
}

const BaseLayout: FC<BaseLayoutProps> = ({
  title,
  children,
  headerWithTransparency = true,
  headerWithProfile = true,
}) => {
  return (
    <>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/oneclick.svg" />
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
          />
        }
      >
        {children}
      </AppShell>
    </>
  )
}

export function getBaseLayout(props: BaseLayoutProps) {
  return (page: JSX.Element) => <BaseLayout {...props}>{page}</BaseLayout>
}

export default BaseLayout

import Head from "next/head"
import { AppShell, Footer } from "@mantine/core"
import React, { FC, useState } from "react"
import LayoutHeader from "../components/layout/LayoutHeader"

const BaseLayout: FC<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <AppShell
        styles={{
          main: {
            minHeight: "calc(100vh - var(--home-header-height))",
            paddingTop: "calc(var(--home-header-height, 0px) + 16px)",
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={<LayoutHeader fixed menuOpened={opened} setMenuOpened={setOpened} />}
        footer={<Footer height={0}>Footer</Footer>}
      >
        {children}
      </AppShell>
    </>
  )
}

export default BaseLayout

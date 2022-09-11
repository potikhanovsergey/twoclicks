import Head from "next/head"
import React, { FC } from "react"

const Layout: FC<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/oneclick.svg" />
      </Head>

      {children}
    </>
  )
}

export default Layout

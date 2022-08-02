import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Container, Group, Space, Title, useMantineTheme } from "@mantine/core"
import { GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { useCallback, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { serialize } from "helpers"
import { jsonLanguage } from "@codemirror/lang-json"

const DashboardIndex = () => {
  const [value, setValue] = useState("")
  const [json, setJson] = useState(
    JSON.stringify(
      JSON.parse(
        serialize(
          <Container size="xl">
            <Title mb="xl">Dashboard</Title>
            <Group position="apart" grow style={{ minHeight: "480px" }} align="stretch"></Group>
          </Container>
        )
      ),
      null,
      2
    )
  )

  const onChange = useCallback((value, viewUpdate) => {
    try {
      const parsedJSON = JSON.stringify(JSON.parse(value), null, 2)
      setJson(parsedJSON)
    } catch (e) {}
  }, [])

  const theme = useMantineTheme()

  return (
    <>
      <Space h="xl" />
      <Container size="xl">
        <Title mb="xl">Dashboard</Title>
        <Group position="apart" grow style={{ minHeight: "480px" }} align="stretch">
          <CodeMirror
            theme={theme.colorScheme}
            value={json}
            height="100%"
            onChange={onChange}
            extensions={[jsonLanguage]}
            indentWithTab
          />
        </Group>
      </Container>
    </>
  )
}

DashboardIndex.getLayout = getBaseLayout()
DashboardIndex.suppressFirstRenderFlicker = true

export default DashboardIndex

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || "ru", ["pagesDashboardIndex", "common"])),
    },
  }
}

import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Button, Container, Group, Space, Title, useMantineTheme } from "@mantine/core"
import { GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { useCallback, useEffect, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { serialize } from "helpers"
import { jsonLanguage } from "@codemirror/lang-json"
import FirstHero from "app/build/sections/FirstHero"

const sections = [FirstHero]

const DashboardIndex = () => {
  const getJsonValue = (component) => {
    return JSON.stringify(JSON.parse(serialize(component)), null, 2)
  }

  // const [json, setJson] = useState(
  //   getJsonValue(
  //     <Container size="xl">
  //       <Title mb="xl">Dashboard</Title>
  //       <Group position="apart" grow style={{ minHeight: "480px" }} align="stretch"></Group>
  //     </Container>
  //   )
  // )
  const [json, setJson] = useState("")

  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  // const onChange = (value) => {
  //   try {
  //     const parsedJSON = JSON.stringify(JSON.parse(value), null, 2)
  //     setJson(parsedJSON)
  //   } catch (e) {}
  // }

  const theme = useMantineTheme()

  const handleButtonClick = (selected) => {
    if (selected !== null) {
      setSelectedSection(selected)
      const invokedComponent = sections[selected]?.()
      if (invokedComponent) {
        setJson(getJsonValue(invokedComponent))
      }
    }
  }
  return (
    <>
      <Space h="xl" />
      <Container size="xl">
        <Title mb="xl">Dashboard</Title>
        <Group mb="xl">
          {sections.map((S, i) => (
            <Button key={i} color="red" onClick={() => handleButtonClick(i)}>
              {S.name}
            </Button>
          ))}
        </Group>
        <Group position="apart" grow style={{ minHeight: "480px" }} align="stretch" mb="xl">
          <CodeMirror
            theme={theme.colorScheme}
            value={json}
            height="100%"
            // onChange={onChange}
            editable={false}
            extensions={[jsonLanguage]}
            indentWithTab
          />
        </Group>
        <>{selectedSection !== null && sections?.[selectedSection]?.()}</>
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

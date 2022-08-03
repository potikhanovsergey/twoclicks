import { getBaseLayout } from "app/core/layouts/BaseLayout"
import {
  Button,
  Container,
  Group,
  JsonInput,
  Space,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { cloneElement, useCallback, useEffect, useMemo, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { recursiveTagName, serialize } from "helpers"
import { jsonLanguage } from "@codemirror/lang-json"
import FirstHero from "app/build/sections/FirstHero"

const sections = [FirstHero]

const DashboardIndex = () => {
  const getJsonValue = (component) => {
    const serialized = JSON.parse(serialize(component))
    console.log("serialized", serialized)
    return JSON.stringify(serialized, null, 2)
  }

  const [error, setError] = useState<string | null>(null)

  const [json, setJson] = useState("")

  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  const onChange = (value) => {
    try {
      const parsedJSON = JSON.stringify(JSON.parse(value), null, 2)
      setJson(parsedJSON)
      setError(null)
    } catch (e) {
      setError(e.toString())
    }
  }

  const theme = useMantineTheme()

  const handleButtonClick = (selected) => {
    if (selected !== null) {
      setSelectedSection(selected)
      const invokedComponent = sections[selected]?.()
      if (invokedComponent) {
        setJson(getJsonValue(invokedComponent))
        setError(null)
      }
    }
  }

  const parsedJSON = useMemo(() => {
    try {
      const parsedJSON = JSON.parse(json)
      return parsedJSON
    } catch (e) {}
  }, [json])

  const TagName = useMemo(() => {
    try {
      return recursiveTagName({
        element: parsedJSON,
        shouldFlat: false,
        withContentEditable: false,
      })
    } catch (e) {
      console.log(e)
      return <></>
    }
  }, [parsedJSON])

  useEffect(() => {
    console.log("TagName >", TagName)
  }, [TagName])

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
        <Stack style={{ minHeight: "480px" }} mb="xl">
          {error && error}
          <CodeMirror
            theme={theme.colorScheme}
            value={json}
            height="100%"
            onChange={onChange}
            extensions={[jsonLanguage]}
            indentWithTab
            style={{
              fontFamily: "Nunito",
              fontSize: 12,
              border: error ? "1px solid red" : "none",
              maxHeight: "480px",
              overflow: "auto",
            }}
          />
          {error && error}
        </Stack>
        {<>{TagName}</>}
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

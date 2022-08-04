import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Button, Container, Group, Space, Stack, Title, useMantineTheme } from "@mantine/core"
import { GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { useEffect, useMemo, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { recursiveTagName, serialize } from "helpers"
import { jsonLanguage } from "@codemirror/lang-json"
import FirstHero from "app/build/sections/FirstHero"
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc"
import CreateBuildingBlock from "app/dashboard/building-blocks/mutations/createBuildingBlock"
import { showNotification } from "@mantine/notifications"
import getBuildingBlocks from "app/dashboard/building-blocks/queries/getBuildingBlocks"

const sections = [FirstHero]

function getParsedJSON(jsonSTRING: string) {
  return JSON.parse(serialize(JSON.parse(jsonSTRING)))
}

const ITEMS_PER_PAGE = 100

const DashboardIndex = () => {
  const getJsonValue = (component) => {
    const serialized = JSON.parse(serialize(component))
    return JSON.stringify(serialized, null, 2)
  }

  const page = 0

  const [{ buildingBlocks, hasMore }] = usePaginatedQuery(getBuildingBlocks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    if (buildingBlocks) {
      console.log(buildingBlocks[buildingBlocks.length - 1])
    }
  }, [buildingBlocks])

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

  const TagName = useMemo(() => {
    try {
      return recursiveTagName({
        element: getParsedJSON(json),
        shouldFlat: false,
        withContentEditable: false,
      })
    } catch (e) {
      console.log(e)
      return <></>
    }
  }, [json])

  const [createBuildingBlockMutation, { isLoading, isSuccess }] = useMutation(CreateBuildingBlock)

  const handleCreateBuildingBlock = async () => {
    try {
      const buildingBlock = getParsedJSON(json)
      await createBuildingBlockMutation(buildingBlock)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Success",
        color: "green",
        message: "Building block was successfully created!",
        autoClose: 5000,
      })
    }
  }, [isSuccess])

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
      </Container>
      <div>{TagName}</div>
      <Container size="xl">
        <Group>
          <Button color="yellow" onClick={handleCreateBuildingBlock} loading={isLoading}>
            Добавить в БД
          </Button>
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

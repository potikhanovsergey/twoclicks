import { getBaseLayout } from "app/core/layouts/BaseLayout"
import {
  Button,
  Center,
  Container,
  Group,
  Space,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { useEffect, useMemo, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { renderJSXFromBlock, serialize } from "helpers"
import { jsonLanguage } from "@codemirror/lang-json"
import FirstHero from "app/build/sections/FirstHero"
import { useMutation } from "@blitzjs/rpc"
import CreateBuildingBlock from "app/dashboard/building-blocks/mutations/createBuildingBlock"
import { showNotification } from "@mantine/notifications"
import { useQuery } from "@blitzjs/rpc"
import getAllBuildingBlocks from "app/dashboard/building-blocks/queries/getAllBuildingBlocks"
import SafeWrapper from "app/core/components/SafeWrapper"

const sections = [FirstHero]

const DashboardIndex = () => {
  const [sectionsDB] = useQuery(getAllBuildingBlocks, null)
  const getJsonString = (component: JSX.Element | Object) => {
    const serialized = JSON.parse(serialize(component))
    return JSON.stringify(serialized, null, 2)
  }
  const [error, setError] = useState<string | null>(null)

  const [json, setJson] = useState("")
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

  const handlePickBuildingBlock = (selected, isCodeSection = true) => {
    if (isCodeSection) {
      if (selected !== null) {
        const invokedComponent = sections[selected]?.()
        if (invokedComponent) {
          setJson(getJsonString(invokedComponent))
          setError(null)
        }
      }
    } else {
      const element = {
        type: selected.type,
        editType: selected.editType,
        props: selected.props,
      }
      const serialized = getJsonString(element)
      setJson(serialized)
      setError(null)
    }
  }

  const JSX = useMemo(() => {
    if (json.length) {
      try {
        return renderJSXFromBlock({
          element: JSON.parse(json),
          shouldFlat: false,
          withContentEditable: false,
        })
      } catch (e) {
        console.log(e)
      }
    }
    return null
  }, [json])

  const [createBuildingBlockMutation, { isLoading, isSuccess }] = useMutation(CreateBuildingBlock)

  const handleCreateBuildingBlock = async () => {
    try {
      const buildingBlock = JSON.parse(json)
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
        <Title mb="xl">Building Blocks</Title>
        <Group mb="xl">
          {sections.map((S, i) => (
            <Button key={i} color="red" onClick={() => handlePickBuildingBlock(i)}>
              {S.name}
            </Button>
          ))}
        </Group>
        {sectionsDB && (
          <>
            <Title mb="xl">DB Building Blocks</Title>
            <Group mb="xl">
              {sectionsDB.map((S, i) => (
                <Button key={i} color="violet" onClick={() => handlePickBuildingBlock(S, false)}>
                  {i}
                </Button>
              ))}
            </Group>
          </>
        )}
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
      {JSX && (
        <Center mb="xl">
          <SafeWrapper>{JSX}</SafeWrapper>
        </Center>
      )}
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
      ...(await serverSideTranslations(context.locale || "ru", ["common"])),
    },
  }
}

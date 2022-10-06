import { getBaseLayout } from "app/core/layouts/BaseLayout"
import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Space,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core"
import React, { useEffect, useMemo, useState } from "react"
import { serialize } from "helpers"
import { jsonLanguage, jsonParseLinter } from "@codemirror/lang-json"
import FirstHero from "app/build/sections/FirstHero"
import { useMutation } from "@blitzjs/rpc"
import createBuildingBlock from "app/dashboard/building-blocks/mutations/createBuildingBlock"
import { showNotification } from "@mantine/notifications"
import { useQuery } from "@blitzjs/rpc"
import getAllBuildingBlocks from "app/dashboard/building-blocks/queries/getAllBuildingBlocks"
import SafeWrapper from "app/core/components/SafeWrapper"
import deleteBuildingBlock from "app/dashboard/building-blocks/mutations/deleteBuildingBlock"
import { BuildingBlock } from "@prisma/client"
import updateBuildingBlock from "app/dashboard/building-blocks/mutations/updateBuildingBlock"
import MantineHOCTest from "app/build/sections/MantineHOCTest"
import MantineTest from "app/build/sections/MantineTest"
import MantineFeatures from "app/build/sections/MantineFeatures"
import MantineHero from "app/build/sections/MantineHero"
import { useSession } from "@blitzjs/auth"
import { AuthorizationError } from "blitz"
import dynamic from "next/dynamic"
import MantineHeroWithContentOnLeft from "app/build/sections/MantineHeroWithContentOnLeft"
import MantineFeaturesWithCards from "app/build/sections/features/MantineFeaturesWithCards"
import MantineArticlesCardsGrid from "app/build/sections/galleries/MantineArticlesCardsGrid"
import MantineFooterWithSocialIcons from "app/build/sections/footers/MantineFooterWithSocialIcons"
import MantineFeaturesWithMonotoneIcons from "app/build/sections/features/MantineFeaturesWithMonotoneIcons"
import Partners from "app/build/sections/partners/Partners"
import GalleryWithButton from "app/build/sections/galleries/GalleryWithButton"
import FeaturesWithPicture from "app/build/sections/features/FeaturesWithPicture"
import FeaturesWithPeople from "app/build/sections/features/FeaturesWithPeople"
import FloatingTitleFeatures from "app/build/sections/features/FloatingTitleFeatures"
import { linter } from "@codemirror/lint"
import FeaturesSimple from "app/build/sections/features/FeaturesSimple"
import MantineCarouselWithCards from "app/build/sections/carousels/MantineCarouselWithCards"
import RenderJSXFromBlock from "app/core/components/RenderJSXFromBlock"
import HeroWithTwoButtonsAndPicture from "app/build/sections/hero/HeroWithTwoButtonsAndPicture"
import HeroWithCircles from "app/build/sections/hero/HeroWithCircles"

import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash"
import { FaEye } from "@react-icons/all-files/fa/FaEye"

const linterExtension = linter(jsonParseLinter())

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"))

const sections = [
  FirstHero,
  MantineHOCTest,
  MantineTest,
  MantineFeatures,
  MantineHero,
  MantineHeroWithContentOnLeft,
  MantineFeaturesWithCards,
  MantineArticlesCardsGrid,
  MantineFooterWithSocialIcons,
  MantineFeaturesWithMonotoneIcons,
  Partners,
  GalleryWithButton,
  FeaturesWithPicture,
  FeaturesWithPeople,
  FloatingTitleFeatures,
  FeaturesSimple,
  MantineCarouselWithCards,
  HeroWithTwoButtonsAndPicture,
  HeroWithCircles,
]

const DashboardIndex = () => {
  const session = useSession()

  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])

  const [sectionsDB, { refetch: refetchBuildingBlocks }] = useQuery(getAllBuildingBlocks, null)
  const getJsonString = (component: JSX.Element | Object) => {
    const serialized = JSON.parse(serialize(component))
    return JSON.stringify(serialized, null, 2)
  }
  const [error, setError] = useState<string | null>(null)

  const [json, setJson] = useState("")
  const onChange = (value) => {
    try {
      const parsedJSON = JSON.stringify(JSON.parse(value), null, 2)
      setJson(value)
      setError(null)
    } catch (e) {
      setError(e.toString())
    }
  }

  const theme = useMantineTheme()

  const [selectedSectionType, setSelectedSectionType] = useState<string | null>(null)
  const [selectedDBElement, setSelectedDBElement] = useState<BuildingBlock | null>(null)

  const handlePickBuildingBlock = (selected, sectionType = "code") => {
    if (sectionType === "code") {
      if (selected !== null) {
        const invokedComponent = sections[selected]?.()
        if (invokedComponent) {
          setSelectedSectionType("code")
          setSelectedDBElement(null)
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
      setSelectedDBElement(selected)
      setSelectedSectionType("db")
      const serialized = getJsonString(element)
      setJson(serialized)
      setError(null)
    }
  }

  const JSX = useMemo(() => {
    if (json.length) {
      try {
        return (
          <RenderJSXFromBlock
            element={JSON.parse(json)}
            shouldFlat={false}
            withContentEditable={false}
          />
        )
      } catch (e) {}
    }
    return null
  }, [json])

  const [createBuildingBlockMutation, { isLoading: isCreating, isSuccess: isSuccessfullyCreated }] =
    useMutation(createBuildingBlock)
  const [deleteBuildingBlockMutation, { isLoading: isDeleting, isSuccess: isSuccessfullyDeleted }] =
    useMutation(deleteBuildingBlock)
  const [updateBuildingBlockMutation, { isLoading: isUpdating, isSuccess: isSuccessfullyUpdated }] =
    useMutation(updateBuildingBlock)

  const handleCreateBuildingBlock = async () => {
    try {
      const buildingBlock = JSON.parse(json)
      await createBuildingBlockMutation(buildingBlock)
    } catch (e) {}
  }

  useEffect(() => {
    if (isSuccessfullyCreated) {
      showNotification({
        title: "Created!",
        color: "green",
        message: "Building block was successfully created.",
        autoClose: 5000,
      })
      void refetchBuildingBlocks()
    }
  }, [isSuccessfullyCreated])

  useEffect(() => {
    if (isSuccessfullyDeleted) {
      showNotification({
        title: "Deleted!",
        color: "green",
        message: "Building block was successfully deleted from DB.",
        autoClose: 5000,
      })
      void refetchBuildingBlocks()
    }
  }, [isSuccessfullyDeleted])

  useEffect(() => {
    if (isSuccessfullyUpdated) {
      showNotification({
        title: "Updated!",
        color: "green",
        message: "Building block was successfully updated.",
        autoClose: 5000,
      })
      void refetchBuildingBlocks()
    }
  }, [isSuccessfullyUpdated])

  return (
    <>
      <Space h="xl" />
      <Container size="xl">
        <Title mb="xl">Building Blocks</Title>
        <Group mb="xl">
          {sections.map((S, i) => (
            <Button key={S.name} color="red" onClick={() => handlePickBuildingBlock(i)}>
              {S.name}
            </Button>
          ))}
        </Group>
        {sectionsDB && (
          <>
            <Title mb="xl">DB Building Blocks</Title>
            <Group mb="xl" spacing={8}>
              {sectionsDB.map((S, i) => (
                <Button
                  compact
                  key={S.id}
                  color={S.hidden ? "gray" : "violet"}
                  leftIcon={S.hidden ? <FaEyeSlash /> : <FaEye />}
                  onClick={() => handlePickBuildingBlock(S, "db")}
                >
                  {S.name || i}
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
            extensions={[jsonLanguage, linterExtension]}
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
        <Box mb="xl">
          <SafeWrapper resetKeys={[JSX]}>{JSX}</SafeWrapper>
        </Box>
      )}
      <Container size="xl" pb="xl">
        <Group>
          {selectedSectionType && (
            <Button color="green" onClick={handleCreateBuildingBlock} loading={isCreating}>
              Добавить в БД
            </Button>
          )}
          {selectedSectionType === "db" && (
            <>
              <Button
                color="yellow"
                onClick={async () => {
                  if (selectedDBElement) {
                    const data = JSON.parse(json) as BuildingBlock
                    await updateBuildingBlockMutation({ id: selectedDBElement.id, data })
                  }
                }}
              >
                Обновить блок в БД
              </Button>
              <Button
                color="red"
                onClick={async () => {
                  if (selectedDBElement) {
                    await deleteBuildingBlockMutation({ id: selectedDBElement.id })
                    setSelectedDBElement(null)
                    setSelectedSectionType(null)
                    setJson("")
                  }
                }}
              >
                Удалить из БД
              </Button>
              <Button
                color="violet"
                loading={isUpdating}
                onClick={async () => {
                  if (selectedDBElement) {
                    const response = await updateBuildingBlockMutation({
                      id: selectedDBElement.id,
                      data: { hidden: !selectedDBElement.hidden },
                    })
                    if (response) {
                      selectedDBElement.hidden = !selectedDBElement.hidden
                    }
                  }
                }}
              >
                {selectedDBElement?.hidden ? "Show to users" : "Hide from users"}
              </Button>
            </>
          )}
        </Group>
      </Container>
    </>
  )
}

DashboardIndex.getLayout = getBaseLayout({})
DashboardIndex.suppressFirstRenderFlicker = true

export default DashboardIndex

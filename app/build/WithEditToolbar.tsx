import { ActionIcon, Box, Group, Popover, Text, useMantineTheme } from "@mantine/core"
import React, { cloneElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { FiSettings } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BuildStore } from "store/build"
import { CgChevronLeftR, CgChevronRightR, CgChevronUpR, CgChevronDownR } from "react-icons/cg"
import { useDebouncedValue, useDisclosure } from "@mantine/hooks"
import {
  getHexFromThemeColor,
  getThemeColorValueArray,
  hasElementPalette,
  PaletteTypePropColor,
} from "helpers"
import { i } from "@blitzjs/auth/dist/index-57d74361"
import PaletteItem from "./PaletteItem"
import { ICanvasBlockProps } from "types"
import { observer } from "mobx-react-lite"
import { useDidMount } from "hooks/useDidMount"

interface IWithEditToolbar {
  children: JSX.Element
  id: string
  parentID: string | null
  editType: string | null
  type?: string
  name?: string
  props?: ICanvasBlockProps
}

const WithEditToolbar = ({
  children,
  id,
  parentID,
  editType,
  name,
  type,
  props,
}: IWithEditToolbar) => {
  const {
    moveLeft,
    moveRight,
    deleteElement,
    data: { blocks },
    changeProp,
    activeEditToolbars,
  } = BuildStore

  const hasMoves = useMemo(() => {
    if (editType === "section") return blocks.length > 1
    return false
  }, [parentID])

  const movesIcons = useMemo(() => {
    if (hasMoves) {
      return {
        left: <CgChevronUpR />,
        right: <CgChevronDownR />,
      }
    }
    return null
  }, [hasMoves])

  const editableRef = useRef<HTMLDivElement>(null)

  const theme = useMantineTheme()

  const [popupHovered, { close: leavePopup, open: enterPopup }] = useDisclosure(false)
  const [editableHovered, { close: leaveEditable, open: enterEditable }] = useDisclosure(false)

  const [debouncedPopupHovered] = useDebouncedValue(popupHovered, 450)
  const [debouncedEditableHovered] = useDebouncedValue(editableHovered, 450)

  const didMount = useDidMount()

  useEffect(() => {
    if (!didMount) {
      const activeValue = debouncedEditableHovered || debouncedPopupHovered
      activeEditToolbars[id] = activeValue
      console.log(debouncedEditableHovered, debouncedPopupHovered, activeEditToolbars[id])
      if (!activeValue) {
        BuildStore.openedPalette = ""
      }
    }
  }, [debouncedEditableHovered, debouncedPopupHovered])

  return (
    <Popover
      trapFocus={false}
      withArrow
      opened={activeEditToolbars[id] || popupHovered || editableHovered}
      position="top-end"
    >
      <Popover.Target>
        <Box
          style={{ width: editType === "element" ? "fit-content" : "auto" }}
          onMouseEnter={enterEditable}
          onMouseLeave={leaveEditable}
          ref={editableRef}
        >
          {children}
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ padding: 0 }}>
        <Group noWrap spacing={0} onMouseEnter={enterPopup} onMouseLeave={leavePopup}>
          <Group spacing={4} pl="xs" align="center">
            {name && (
              <Text
                size="sm"
                weight="bold"
                sx={(theme) => ({
                  color: theme.colorScheme === "dark" ? theme.white : theme.black,
                  textTransform: "capitalize",
                })}
              >
                {name}
              </Text>
            )}
            {type &&
              hasElementPalette(type.toLowerCase()) &&
              props?.[PaletteTypePropColor[type.toLowerCase()].prop] && (
                <PaletteItem
                  defaultOpened={id === BuildStore.openedPalette}
                  onOpen={() => (BuildStore.openedPalette = id)}
                  onClose={() => (BuildStore.openedPalette = "")}
                  popoverPosition="top"
                  color={getHexFromThemeColor({
                    theme,
                    color: props?.[PaletteTypePropColor[type.toLowerCase()].prop],
                  })}
                  onColorChange={(value) => {
                    changeProp({
                      id,
                      newProps: { [PaletteTypePropColor[type.toLowerCase()].prop]: value },
                    })
                  }}
                />
              )}
          </Group>
          {hasMoves && movesIcons && (
            <>
              {id !== blocks[0].id && (
                <ActionIcon size="lg" onClick={() => moveLeft({ id, parentID, editType })}>
                  {movesIcons.left}
                </ActionIcon>
              )}
              {id !== blocks[blocks.length - 1].id && (
                <ActionIcon size="lg" onClick={() => moveRight({ id, parentID, editType })}>
                  {movesIcons.right}
                </ActionIcon>
              )}
            </>
          )}
          <ActionIcon size="lg">
            <FiSettings />
          </ActionIcon>
          <ActionIcon
            color="red"
            size="lg"
            onClick={() => {
              deleteElement({ id, parentID })
            }}
          >
            <RiDeleteBin6Line />
          </ActionIcon>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

import { ActionIcon, Box, Group, Popover, Text, useMantineTheme } from "@mantine/core"
import React, { cloneElement, useEffect, useMemo, useRef, useState } from "react"
import { FiSettings } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BuildStore } from "store/build"
import { CgChevronLeftR, CgChevronRightR, CgChevronUpR, CgChevronDownR } from "react-icons/cg"
import { useDisclosure } from "@mantine/hooks"
import {
  getHexFromThemeColor,
  getThemeColorValueArray,
  hasElementPalette,
  PaletteTypePropColor,
} from "helpers"
import { i } from "@blitzjs/auth/dist/index-57d74361"
import PaletteItem from "./PaletteItem"
import { ICanvasBlockProps } from "types"

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
  const [editOpened, { close: closeEdit, open: openEdit }] = useDisclosure(false)
  const [popupHovered, setPopupHovered] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const {
    moveLeft,
    moveRight,
    deleteElement,
    data: { blocks },
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

  const { changeProp } = BuildStore

  return (
    <Popover trapFocus={false} withArrow opened={editOpened} onClose={closeEdit} position="top-end">
      <Popover.Target>
        <Box
          style={{ width: editType === "element" ? "fit-content" : "auto" }}
          onMouseEnter={() => {
            if (timer?.current) clearTimeout(timer?.current)
            openEdit()
          }}
          onMouseLeave={() => {
            timer.current = setTimeout(() => {
              if (!popupHovered) closeEdit()
            }, 450)
          }}
          ref={editableRef}
        >
          {children}
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ padding: 0 }}>
        <Group
          noWrap
          spacing={0}
          onMouseEnter={() => {
            if (timer.current) clearTimeout(timer.current)
            setPopupHovered(true)
          }}
          onMouseLeave={() => {
            closeEdit()
            setPopupHovered(false)
          }}
        >
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
                  popoverPosition="top"
                  color={getHexFromThemeColor({
                    theme,
                    color: props?.[PaletteTypePropColor[type.toLowerCase()].prop],
                  })}
                  onChange={(value) => {
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
              closeEdit()
            }}
          >
            <RiDeleteBin6Line />
          </ActionIcon>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default WithEditToolbar

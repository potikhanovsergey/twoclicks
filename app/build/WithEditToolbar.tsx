import { ActionIcon, Box, Group, Popover } from "@mantine/core"
import React, { cloneElement, useEffect, useMemo, useRef, useState } from "react"
import { FiSettings } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BuildStore } from "store/build"
import { CgChevronLeftR, CgChevronRightR, CgChevronUpR, CgChevronDownR } from "react-icons/cg"
import { useDisclosure } from "@mantine/hooks"

interface IWithEditToolbar {
  children: JSX.Element
  id: string
  parentID: string | null
  editType: string | null
}

const WithEditToolbar = ({ children, id, parentID, editType }: IWithEditToolbar) => {
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
    // if (parentID) {
    //   let parentComponent = BuildStore.data.flattenBlocks[parentID]?.type
    //   return (
    //     parentComponent &&
    //     (parentComponent === "@mantine/core/group" || parentComponent === "@mantine/core/stack")
    //   )
    // }
    if (editType === "section") return blocks.length > 1
    return false
  }, [parentID])

  const movesIcons = useMemo(() => {
    // if (hasMoves && parentID) {
    //   let parent = BuildStore.data.flattenBlocks?.[parentID]
    //   let parentProps = parent?.props as object | null
    //   if (parent?.type === "@mantine/core/group") {
    //     if (parentProps && parentProps["direction"] === "column") {
    //       return {
    //         left: <CgChevronUpR />,
    //         right: <CgChevronDownR />,
    //       }
    //     } else {
    //       return {
    //         left: <CgChevronLeftR />,
    //         right: <CgChevronRightR />,
    //       }
    //     }
    //   }
    // }
    if (hasMoves) {
      return {
        left: <CgChevronUpR />,
        right: <CgChevronDownR />,
      }
    }
    return null
  }, [hasMoves])

  // useEffect(() => {
  //   if (hasMoves && parentID) {
  //     let parent = BuildStore.data.flattenBlocks?.[parentID]
  //   }
  // }, [hasMoves])

  const editableRef = useRef<HTMLDivElement>(null)
  return (
    <Popover trapFocus={false} withArrow opened={editOpened} onClose={closeEdit} position="top-end">
      <Popover.Target>
        <Box style={{ width: editType === "element" ? "fit-content" : "auto" }}>
          {cloneElement(children, {
            onMouseEnter: () => {
              if (timer?.current) clearTimeout(timer?.current)
              openEdit()
            },
            onMouseLeave: () => {
              timer.current = setTimeout(() => {
                if (!popupHovered) closeEdit()
              }, 600)
            },
            ref: editableRef,
          })}
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

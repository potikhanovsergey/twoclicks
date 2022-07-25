import { ActionIcon, Group, Popover } from "@mantine/core"
import React, { cloneElement, useEffect, useMemo, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FiSettings } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BuildStore } from "store/build"
import { CgChevronLeftR, CgChevronRightR, CgChevronUpR, CgChevronDownR } from "react-icons/cg"

interface IWithElementEdit {
  children: JSX.Element
  id: string
  parentID: string | null
}

const WithElementEdit = ({ children, id, parentID }: IWithElementEdit) => {
  const [editOpened, setEditOpened] = useState(false)
  const [popupHovered, setPopupHovered] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const hasMoves = useMemo(() => {
    if (parentID) {
      let parentComponent = BuildStore.data.flattenBlocks[parentID]?.component
      return parentComponent && (parentComponent === "group" || parentComponent === "stack")
    }
    return false
  }, [parentID])

  const movesIcons = useMemo(() => {
    if (hasMoves && parentID) {
      let parent = BuildStore.data.flattenBlocks?.[parentID]
      let parentProps = parent?.props as object | null
      if (parent?.component === "group") {
        if (parentProps && parentProps["direction"] === "column") {
          return {
            left: <CgChevronUpR />,
            right: <CgChevronDownR />,
          }
        } else {
          return {
            left: <CgChevronLeftR />,
            right: <CgChevronRightR />,
          }
        }
      }
    }
    return null
  }, [hasMoves])

  // useEffect(() => {
  //   if (hasMoves && parentID) {
  //     let parent = BuildStore.data.flattenBlocks?.[parentID]
  //   }
  // }, [hasMoves])
  return (
    <Popover
      trapFocus={false}
      withArrow={false}
      opened={editOpened}
      onClose={() => setEditOpened(false)}
      target={cloneElement(children, {
        onMouseEnter: () => {
          if (timer.current) clearTimeout(timer.current)
          setEditOpened(true)
        },
        onMouseLeave: () => {
          timer.current = setTimeout(() => {
            if (!popupHovered) setEditOpened(false)
          }, 300)
        },
      })}
      position="top"
      placement="end"
      shadow="xs"
      width="auto"
      spacing="xs"
      styles={{
        inner: {
          padding: 0,
        },
        target: {
          display: "inline-block",
        },
      }}
    >
      <Group
        noWrap
        spacing={0}
        onMouseEnter={() => {
          if (timer.current) clearTimeout(timer.current)
          setPopupHovered(true)
        }}
        onMouseLeave={() => {
          setEditOpened(false)
          setPopupHovered(false)
        }}
      >
        {/* <ActionIcon color="green" size="lg"><AiOutlinePlusSquare /></ActionIcon> */}
        {hasMoves && movesIcons && (
          <>
            <ActionIcon size="lg" onClick={() => BuildStore.moveLeft({ id, parentID })}>
              {movesIcons.left}
            </ActionIcon>
            <ActionIcon size="lg" onClick={() => BuildStore.moveRight({ id, parentID })}>
              {movesIcons.right}
            </ActionIcon>
          </>
        )}
        <ActionIcon size="lg">
          <FiSettings />
        </ActionIcon>
        <ActionIcon
          color="red"
          size="lg"
          onClick={() => {
            BuildStore.deleteElement({ id, parentID })
            setEditOpened(false)
          }}
        >
          <RiDeleteBin6Line />
        </ActionIcon>
      </Group>
    </Popover>
  )
}

export default WithElementEdit

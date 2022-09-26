import { ActionIcon, Box, Button, ButtonProps, Group, Popover } from "@mantine/core"
import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { BuildStore } from "store/build"
import { useDisclosure } from "@mantine/hooks"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import { observer } from "mobx-react-lite"
import { useDidMount } from "hooks/useDidMount"
import { useDelayedHover } from "hooks/useDelayedHover"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import BuilderImagePicker from "./BuilderImagePicker"
import ElementPaletteEdit from "./ElementPaletteEdit"
import ElementGradientsEdit from "./ElementGradientsEdit"
import ElementRadiusesEdit from "./ElementRadiusesEdit"
import ElementSizesEdit from "./ElementSizesEdit"
import ElementVariantsEdit from "./ElementVariantsEdit"
import ElementDeleteButton from "./ElementDeleteButton"
import ElementMoves from "./ElementMoves"
import ElementName from "./ElementName"
import ElementIconEdit from "./ElementIconEdit"
import { TypeIcons } from "helpers"
import ElementLinkEdit from "./ElementLinkEdit"
import useTranslation from "next-translate/useTranslation"
import ElementUploadLink from "./ElementUploadLink"
import SectionBGEdit from "./SectionBGEdit"

import { FiPlusSquare } from "@react-icons/all-files/fi/FiPlusSquare"
import ElementTypeEdit from "./ElementTypeEdit"

import { BiCopy } from "@react-icons/all-files/bi/BiCopy"
import shortid from "shortid"
interface HoverCardContext {
  openDropdown(): void
  closeDropdown(): void
}

interface IWithEditToolbar {
  children: JSX.Element
  id: string
  parentID: string | null
  editType: string | null
  type?: string
  name?: string | null
  props?: ICanvasBlockProps
  sectionIndex?: number
  element?: ICanvasBlock
}

interface InnerAddSectionButtonProps extends Omit<ButtonProps, "style" | "children"> {
  insertIndex: number
}

const InnerAddSectionButton = (props: InnerAddSectionButtonProps) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { t } = useTranslation("build")

  const { insertIndex, ...otherProps } = props
  return (
    <Button
      style={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}
      size="sm"
      variant="gradient"
      rightIcon={<FiPlusSquare />}
      compact
      gradient={{ from: "violet", to: "red" }}
      onClick={() => {
        BuildStore.insertIndex = insertIndex
        setModalContext((prevValue: IModalContextValue) => ({
          ...prevValue,
          canvasSectionsModal: true,
        }))
      }}
      {...otherProps}
    >
      {t("add new section")}
    </Button>
  )
}

const WithEditToolbar = ({
  children,
  id,
  parentID,
  editType,
  name,
  type,
  props,
  sectionIndex,
  element,
}: IWithEditToolbar) => {
  const { activeEditToolbars, isImageUploading, openedAction } = BuildStore

  const editableRef = useRef<HTMLDivElement>(null)

  const didMount = useDidMount()

  const [opened, { open, close }] = useDisclosure(Boolean(openedAction[id]))
  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 100,
    closeDelay: 400,
  })

  const elementProps = element?.props as ICanvasBlockProps | undefined

  const popoverOpened = useMemo(() => {
    return opened || Boolean(openedAction[id])
  }, [opened, openedAction])

  useEffect(() => {
    if (!didMount) {
      activeEditToolbars[id] = opened

      if (!opened && !isImageUploading) {
        BuildStore.openedAction = {}
      }
    }
  }, [opened, isImageUploading])

  const handleElementCopy = () => {
    let insertIndex
    if (parentID) {
      const parent = BuildStore.data.flattenBlocks[parentID]
      const parentProps = parent?.props as ICanvasBlockProps
      const parentChildren = parentProps?.children as ICanvasBlock[] | ICanvasBlock

      if (parentChildren) {
        if (Array.isArray(parentChildren)) {
          const elIndex = parentChildren.findIndex && parentChildren.findIndex((el) => el.id === id)
          if (typeof elIndex === "number" && elIndex !== -1) {
            insertIndex = elIndex
          }
        } else {
          parentProps.children = [element]
        }
      }
    } else if (editType === "section") {
      insertIndex = BuildStore.data.blocks.findIndex((el) => el.id === id)
    }
    BuildStore.push({
      block: {
        ...(JSON.parse(JSON.stringify(element)) as ICanvasBlock),
        id: shortid.generate(),
      },
      parentID,
      insertIndex,
    })
  }
  return (
    <Popover
      trapFocus={false}
      withArrow={editType !== "section"}
      opened={popoverOpened || isImageUploading === id}
      position={editType === "section" ? "right-end" : "top-end"}
      offset={editType === "section" ? 0 : undefined}
      withinPortal
      zIndex={501}
    >
      <Popover.Target>
        <Box
          sx={(theme) => ({
            width: editType === "element" ? "fit-content" : "auto",
            margin: elementProps?.align === "center" ? "0 auto" : undefined,
            boxSizing: "content-box",
            border:
              editType === "section"
                ? "none"
                : opened ||
                  (typeof elementProps?.children === "string" && !elementProps?.children.length)
                ? `1px dotted ${theme.colors.gray[5]}`
                : "1px solid transparent",
            position: "relative",
          })}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          ref={editableRef}
        >
          {editType === "section" && sectionIndex === 0 && (
            <InnerAddSectionButton insertIndex={0} />
          )}
          {editType === "image" ? (
            <BuilderImagePicker elementID={id} slug={props?.uuid}>
              {children}
            </BuilderImagePicker>
          ) : (
            <>{children}</>
          )}
          {editType === "section" && sectionIndex !== undefined && (
            <InnerAddSectionButton insertIndex={sectionIndex + 1} />
          )}
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ padding: 0 }}>
        <Group
          noWrap
          spacing={0}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          style={{ flexDirection: editType === "section" ? "column" : "row" }}
        >
          {editType !== "section" && name && <ElementName name={name} />}
          <ElementVariantsEdit id={id} type={type} props={props} />
          <ElementSizesEdit id={id} type={type} props={props} />
          <ElementRadiusesEdit id={id} type={type} props={props} />
          <ElementGradientsEdit id={id} type={type} props={props} />
          {["image", "youtubeframe"].some((item) => type?.toLowerCase().includes(item)) && (
            <ElementTypeEdit
              id={id}
              type={type}
              types={[
                { label: "Image", value: "@mantine/core/image", editType: "image" },
                { label: "Youtube Video", value: "youtubeframe", editType: "video" },
              ]}
            />
          )}{" "}
          <ElementPaletteEdit id={id} element={element} type={type?.toLowerCase()} props={props} />
          <ElementMoves id={id} parentID={parentID} editType={editType} />
          {type && props && <ElementUploadLink id={id} props={props} type={type.toLowerCase()} />}
          {type &&
            TypeIcons[type?.toLowerCase()]?.map((propName) => (
              <ElementIconEdit
                id={id}
                type={type}
                propName={propName}
                props={props}
                key={propName}
              />
            ))}
          {type && props && <ElementLinkEdit id={id} props={props} type={type.toLowerCase()} />}
          <ActionIcon variant="subtle" color="violet" onClick={handleElementCopy}>
            <BiCopy />
          </ActionIcon>
          <ElementDeleteButton id={id} parentID={parentID} editType={editType} />
          {editType === "section" && <SectionBGEdit id={id} props={props} editType={editType} />}
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

import { Box, Button, ButtonProps, Group, Popover } from "@mantine/core"
import React, { useContext, useEffect, useRef, useState } from "react"
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
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube"

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
  sectionToBeAddedIndex: number
}

const InnerAddSectionButton = (props: InnerAddSectionButtonProps) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { t } = useTranslation("pagesBuild")

  const { sectionToBeAddedIndex, ...otherProps } = props
  return (
    <Button
      style={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}
      size="sm"
      variant="gradient"
      rightIcon={<FiPlusSquare />}
      compact
      gradient={{ from: "violet", to: "red" }}
      onClick={() => {
        BuildStore.sectionToBeAddedIndex = sectionToBeAddedIndex
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

  const [popoverOpened, { close: closePopover, open: openPopover }] = useDisclosure(false)
  const [editableOpened, { close: closeEditable, open: openEditable }] = useDisclosure(false)
  const didMount = useDidMount()

  const [isElementActive, setIsElementActive] = useState(
    activeEditToolbars[id] || popoverOpened || editableOpened
  )

  useEffect(() => {
    if (!didMount) {
      const activeValue = editableOpened || popoverOpened
      setIsElementActive(activeValue)
      activeEditToolbars[id] = activeValue

      if (!activeValue) {
        BuildStore.openedAction = {}
      }
    }
  }, [editableOpened, popoverOpened])

  const { openDropdown: openDelayedEditable, closeDropdown: closeDelayedEditable } =
    useDelayedHover({
      open: openEditable,
      close: closeEditable,
      closeDelay: 400,
      openDelay: 100,
    })

  const elementProps = element?.props as ICanvasBlockProps | undefined
  return (
    <Popover
      trapFocus={false}
      withArrow={editType !== "section"}
      opened={isElementActive || activeEditToolbars[id] || isImageUploading === id}
      position={editType === "section" ? "right-end" : "top-end"}
      offset={editType === "section" ? 0 : undefined}
      withinPortal
      zIndex={501}
    >
      <Popover.Target>
        <Box
          sx={(theme) => ({
            width: editType === "element" ? "fit-content" : "auto",
            boxSizing: "content-box",
            border:
              editType === "section"
                ? "none"
                : isElementActive ||
                  (typeof elementProps?.children === "string" && !elementProps?.children.length)
                ? `1px dotted ${theme.colors.gray[5]}`
                : "1px solid transparent",
            position: "relative",
          })}
          onMouseEnter={openDelayedEditable}
          onMouseLeave={closeDelayedEditable}
          ref={editableRef}
        >
          {editType === "section" && sectionIndex === 0 && (
            <InnerAddSectionButton sectionToBeAddedIndex={0} />
          )}
          {editType === "image" ? (
            <BuilderImagePicker elementID={id} slug={props?.uuid}>
              {children}
            </BuilderImagePicker>
          ) : (
            <Box>{children}</Box>
          )}
          {editType === "section" && sectionIndex !== undefined && (
            <InnerAddSectionButton sectionToBeAddedIndex={sectionIndex + 1} />
          )}
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ padding: 0 }}>
        <Group
          noWrap
          spacing={0}
          onMouseEnter={openPopover}
          onMouseLeave={closePopover}
          style={{ flexDirection: editType === "section" ? "column" : "row" }}
        >
          {editType !== "section" && name && <ElementName name={name} />}
          <ElementVariantsEdit id={id} type={type} props={props} />
          <ElementSizesEdit id={id} type={type} props={props} />
          <ElementRadiusesEdit id={id} type={type} props={props} />
          <ElementGradientsEdit id={id} type={type} props={props} />
          <ElementPaletteEdit id={id} element={element} type={type?.toLowerCase()} props={props} />
          <ElementMoves id={id} parentID={parentID} editType={editType} />
          {type && props && (
            <ElementUploadLink
              id={id}
              props={props}
              type={type.toLowerCase()}
              targetIcon={type === "youtubeframe" ? <FaYoutube /> : undefined}
            />
          )}
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
          <ElementDeleteButton id={id} parentID={parentID} editType={editType} />
          {editType === "section" && <SectionBGEdit id={id} props={props} />}
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

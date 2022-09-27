import { Box, Button, ButtonProps, Group, Popover } from "@mantine/core"
import React, { useContext, useEffect, useMemo, useRef } from "react"
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

import ElementCopyButton from "./ElementCopyButton"

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

interface InnerAddSectionButtonProps extends Omit<ButtonProps, "children"> {
  insertIndex: number
}

const InnerAddSectionButton = (props: InnerAddSectionButtonProps) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { t } = useTranslation("build")

  const { insertIndex, ...otherProps } = props
  return (
    <Button
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

const FIT_CONTENT_ELEMENTS = [
  "@mantine/core/actionicon",
  "@mantine/core/themeicon",
  "@mantine/core/text",
  "@mantine/core/title",
  "@mantine/core/button",
]

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

  const sectionLike = useMemo(() => {
    return editType === "section" || type?.includes("card") || element?.sectionLike
  }, [editType, type])

  return (
    <Popover
      trapFocus={false}
      opened={popoverOpened || isImageUploading === id}
      position={sectionLike ? "right-end" : "top-end"}
      offset={sectionLike ? 0 : undefined}
      withinPortal
      zIndex={501}
    >
      <Popover.Target>
        <Box
          sx={(theme) => ({
            width: type && FIT_CONTENT_ELEMENTS.includes(type) ? "fit-content" : "auto",
            margin: elementProps?.align === "center" ? "0 auto" : undefined,
            border:
              editType === "section"
                ? "none"
                : opened ||
                  (typeof elementProps?.children === "string" && !elementProps?.children.length)
                ? `1px dotted ${theme.colors.gray[5]}`
                : "1px solid transparent",
            position: "relative",
            display: type && FIT_CONTENT_ELEMENTS.includes(type) ? "block" : "grid",
          })}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          ref={editableRef}
        >
          {editType === "section" && sectionIndex === 0 && (
            <InnerAddSectionButton
              insertIndex={0}
              style={{
                position: "absolute",
                left: "50%",
                zIndex: 1,
                top: 0,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          {editType === "image" ? (
            <BuilderImagePicker elementID={id}>{children}</BuilderImagePicker>
          ) : (
            <>{children}</>
          )}
          {editType === "section" && sectionIndex !== undefined && (
            <InnerAddSectionButton
              insertIndex={sectionIndex + 1}
              style={{
                position: "absolute",
                left: "50%",
                zIndex: 1,
                bottom: 0,
                transform: "translate(-50%, 50%)",
              }}
            />
          )}
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ padding: 0 }}>
        <Group
          noWrap
          spacing={0}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          style={{
            flexDirection: sectionLike ? "column" : "row",
          }}
        >
          {editType !== "section" && name && <ElementName name={name} />}
          <ElementVariantsEdit id={id} type={type} props={props} />
          <ElementSizesEdit id={id} type={type} props={props} />
          <ElementRadiusesEdit id={id} type={type} props={props} />
          <ElementGradientsEdit id={id} type={type} props={props} />
          {type && ["image", "youtubeframe"].some((item) => type.includes(item)) && (
            <ElementTypeEdit
              id={id}
              type={type}
              types={[
                { label: "Image", value: "@mantine/core/image", editType: "image" },
                { label: "Youtube Video", value: "youtubeframe", editType: "video" },
              ]}
            />
          )}{" "}
          <ElementPaletteEdit id={id} element={element} type={type} props={props} />
          <ElementMoves id={id} parentID={parentID} editType={editType} />
          {type && props && <ElementUploadLink id={id} props={props} type={type} />}
          {type &&
            TypeIcons[type]?.map((propName) => (
              <ElementIconEdit
                id={id}
                type={type}
                propName={propName}
                props={props}
                key={propName}
              />
            ))}
          {type && props && <ElementLinkEdit id={id} props={props} type={type} />}
          {element && !element?.disableCopy && (
            <ElementCopyButton parentID={parentID} element={element} />
          )}
          <ElementDeleteButton id={id} parentID={parentID} editType={editType} />
          {editType === "section" && <SectionBGEdit id={id} props={props} editType={editType} />}
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

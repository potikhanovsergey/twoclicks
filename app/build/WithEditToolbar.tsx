import { Box, Button, ButtonProps, Group, Popover } from "@mantine/core"
import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef } from "react"
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
  parentID: string | null
  props?: ICanvasBlockProps
  sectionIndex?: number
  element: ICanvasBlock
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
  parentID,
  props,
  sectionIndex,
  element,
}: IWithEditToolbar) => {
  const { activeEditToolbars, isImageUploading, openedAction } = BuildStore

  const editableRef = useRef<HTMLDivElement>(null)

  const didMount = useDidMount()

  const [opened, { open, close }] = useDisclosure(Boolean(openedAction[element.id]))
  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 100,
    closeDelay: 400,
  })

  const elementProps = element?.props as ICanvasBlockProps | undefined

  const popoverOpened = useMemo(() => {
    return opened || Boolean(openedAction[element.id])
  }, [opened, openedAction])

  useEffect(() => {
    if (!didMount) {
      activeEditToolbars[element.id] = opened

      if (!opened && !isImageUploading) {
        BuildStore.openedAction = {}
      }
    }
  }, [opened, isImageUploading])

  const sectionLike = useMemo(() => {
    return element.editType === "section" || element.type?.includes("card") || element?.sectionLike
  }, [element])

  return (
    <Popover
      trapFocus={false}
      opened={popoverOpened || isImageUploading === element.id}
      position={sectionLike ? "right-end" : "top-end"}
      offset={sectionLike ? 0 : undefined}
      withinPortal
      zIndex={501}
    >
      <Popover.Target>
        <Box
          sx={(theme) => ({
            width:
              element.type && FIT_CONTENT_ELEMENTS.includes(element.type) ? "fit-content" : "auto",
            margin: elementProps?.align === "center" ? "0 auto" : undefined,
            border:
              element.editType === "section"
                ? "none"
                : opened ||
                  (typeof elementProps?.children === "string" && !elementProps?.children.length)
                ? `1px dotted ${theme.colors.gray[5]}`
                : "1px solid transparent",
            position: "relative",
            display: element.type && FIT_CONTENT_ELEMENTS.includes(element.type) ? "block" : "grid",
          })}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          ref={editableRef}
        >
          {element.editType === "section" && sectionIndex === 0 && (
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
          {element.editType === "image" ? (
            <BuilderImagePicker elementID={element.id}>{children}</BuilderImagePicker>
          ) : (
            <>{children}</>
          )}
          {element.editType === "section" && sectionIndex !== undefined && (
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
          {element.editType !== "section" && element.name && <ElementName name={element.name} />}
          <ElementVariantsEdit id={element.id} type={element.type} props={props} />
          <ElementSizesEdit id={element.id} type={element.type} props={props} />
          <ElementRadiusesEdit id={element.id} type={element.type} props={props} />
          <ElementGradientsEdit id={element.id} type={element.type} props={props} />
          {element.type &&
            ["image", "youtubeframe"].some((item) => element.type.includes(item)) && (
              <ElementTypeEdit
                id={element.id}
                type={element.type}
                types={[
                  { label: "Image", value: "@mantine/core/image", editType: "image" },
                  { label: "Youtube Video", value: "youtubeframe", editType: "video" },
                ]}
              />
            )}{" "}
          <ElementPaletteEdit id={element.id} element={element} type={element.type} props={props} />
          <ElementMoves id={element.id} parentID={parentID} editType={element.editType} />
          {element.type && props && (
            <ElementUploadLink id={element.id} props={props} type={element.type} />
          )}
          {element.type &&
            TypeIcons[element.type]?.map((propName) => (
              <ElementIconEdit
                id={element.id}
                type={element.type}
                propName={propName}
                props={props}
                key={propName}
              />
            ))}
          {element.type && props && (
            <ElementLinkEdit id={element.id} props={props} type={element.type} />
          )}
          {element && !element?.disableCopy && (
            <ElementCopyButton parentID={parentID} element={element} />
          )}
          <ElementDeleteButton id={element.id} parentID={parentID} editType={element.editType} />
          {element.editType === "section" && (
            <SectionBGEdit id={element.id} props={props} editType={element.editType} />
          )}
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

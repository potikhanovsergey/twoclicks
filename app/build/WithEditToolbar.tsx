import { Box, createStyles, Group, Popover, Text } from "@mantine/core"
import React, { useEffect, useMemo, useRef } from "react"
import { BuildStore } from "store/build"
import { useDisclosure } from "@mantine/hooks"
import { ICanvasBlock, ICanvasBlockProps, IThemeSettings } from "types"
import { observer } from "mobx-react-lite"
import { useDelayedHover } from "hooks/useDelayedHover"

const ElementPaletteEdit = dynamic(() => import("./ElementPaletteEdit"))
const ElementGradientsEdit = dynamic(() => import("./ElementGradientsEdit"))
const ElementRadiusesEdit = dynamic(() => import("./ElementRadiusesEdit"))
const ElementSizesEdit = dynamic(() => import("./ElementSizesEdit"))
const ElementVariantsEdit = dynamic(() => import("./ElementVariantsEdit"))
const ElementDeleteButton = dynamic(() => import("./ElementDeleteButton"))
const ElementMoves = dynamic(() => import("./ElementMoves"))
const ElementIconEdit = dynamic(() => import("./ElementIconEdit"))
const ElementLinkEdit = dynamic(() => import("./ElementLinkEdit"))
const ElementTypeEdit = dynamic(() => import("./ElementTypeEdit"))
const ElementCopyButton = dynamic(() => import("./ElementCopyButton"))
const SectionBGEdit = dynamic(() => import("./SectionBGEdit"))
const ElementUploadLink = dynamic(() => import("./ElementUploadLink"))
const ElementPaddingEdit = dynamic(() => import("./ElementPaddingEdit"))
const InnerAddSectionButton = dynamic(() => import("./InnerAddSectionButton"))

import {
  defaultGradients,
  defaultVariants,
  TypeGradients,
  TypeIcons,
  TypeLinks,
  TypeRadius,
  TypeSizes,
  TypeVariants,
} from "helpers"

import dynamic from "next/dynamic"
import { FaImage } from "@react-icons/all-files/fa/FaImage"
import HeaderFixedEdit from "./HeaderFixedEdit"

interface IWithEditToolbar {
  children: JSX.Element
  parentID: string | null
  props?: ICanvasBlockProps
  sectionIndex?: number
  element: ICanvasBlock
  childrenProp: string
}

const useStyles = createStyles(
  (
    theme,
    {
      element,
      opened,
      themeSettings,
      type,
    }: { element: ICanvasBlock; opened: boolean; themeSettings: IThemeSettings; type }
  ) => ({
    editable: {
      borderBottom:
        element.editType === "section"
          ? `2px dashed ${theme.fn.rgba(theme.colors.gray[5], 0.3)}`
          : undefined,
      border:
        element.editType === "section" ||
        type.includes("divider") ||
        element.props.variant === "outline" ||
        (defaultVariants.includes(type) && themeSettings.variant === "outline")
          ? undefined
          : opened ||
            (typeof element.props?.children === "string" && !element.props?.children.length)
          ? `1px solid ${theme.colors.gray[5]}`
          : "1px solid transparent",
    },
  })
)

const WithEditToolbar = ({
  children,
  parentID,
  sectionIndex,
  element,
  childrenProp,
}: IWithEditToolbar) => {
  const {
    isImageUploading,
    openedAction,
    data: { themeSettings },
  } = BuildStore

  const editableRef = useRef<HTMLDivElement>(null)

  const [opened, { open, close }] = useDisclosure(false)
  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 100,
    closeDelay: 400,
  })

  const popoverOpened = useMemo(() => {
    return opened || Boolean(openedAction[element.id])
  }, [opened, openedAction, element.id])

  const sectionLike = useMemo(() => {
    return element.editType === "section" || type?.includes("card") || element?.sectionLike
  }, [element])

  const type = useMemo(() => {
    return element.type.toLowerCase()
  }, [element.type])

  const { classes } = useStyles({ opened, element, themeSettings, type })
  return (
    <Popover
      trapFocus={false}
      opened={popoverOpened || isImageUploading === element.id}
      position={
        element.editType === "section" ? "right-end" : element.sectionLike ? "bottom" : "top-end"
      }
      offset={sectionLike ? 0 : undefined}
      withinPortal
      zIndex={501}
      middlewares={element.sectionLike ? { shift: true, flip: false } : undefined}
    >
      <Popover.Target>
        {element.editType === "section" ? (
          <Box
            ref={editableRef}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            sx={{ position: "relative" }}
            className={classes.editable}
          >
            {sectionIndex === 0 && (
              <InnerAddSectionButton
                insertIndex={0}
                style={{
                  position: "absolute",
                  left: "50%",
                  zIndex: 2,
                  top: -element.props.mt || 0,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
            {children}
            {sectionIndex !== undefined && (
              <InnerAddSectionButton
                insertIndex={sectionIndex + 1}
                style={{
                  position: "absolute",
                  left: "50%",
                  zIndex: 2,
                  bottom: 0,
                  transform: "translate(-50%, 50%)",
                }}
              />
            )}
          </Box>
        ) : (
          React.cloneElement(children, {
            onMouseEnter: openDropdown,
            onMouseLeave: closeDropdown,
            ref: editableRef,
            className: classes.editable,
          })
        )}
      </Popover.Target>
      <Popover.Dropdown style={{ padding: 0 }}>
        <Group
          noWrap
          spacing={0}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          style={{
            flexDirection: element.editType === "section" ? "column" : "row",
          }}
        >
          {element.editType === "section" && sectionIndex !== undefined && (
            <Text weight="bold" size="xs">
              №{sectionIndex + 1}
            </Text>
          )}
          {
            <ElementPaddingEdit
              element={element}
              type={element.editType === "section" ? "p" : "m"}
              y
              x={element.editType !== "section"}
            />
          }
          {TypeVariants[type] && <ElementVariantsEdit element={element} />}
          {TypeSizes[type] && <ElementSizesEdit element={element} />}
          {TypeRadius[type] && <ElementRadiusesEdit element={element} />}
          {TypeGradients[type] &&
            (element.props.variant === "gradient" ||
              (!element.props.variant &&
                themeSettings.variant === "gradient" &&
                defaultGradients.includes(type))) && <ElementGradientsEdit element={element} />}
          {/* {type &&
            ["image", "youtubeframe"].some((item) => type.includes(item)) && (
              <ElementTypeEdit
                element={element}
                types={[
                  { label: "Image", value: "@mantine/core/image", editType: "image" },
                  { label: "Youtube Video", value: "youtubeframe", editType: "video" },
                ]}
              />
            )}{" "} */}
          {(element.props.variant !== "gradient" &&
            themeSettings.variant !== "gradient" &&
            defaultGradients.includes(type)) ||
          (!defaultGradients.includes(type) && element.props.variant !== "gradient") ? (
            <ElementPaletteEdit element={element} />
          ) : (
            <></>
          )}
          <ElementMoves parentID={parentID} element={element} />
          {type && element.props && (
            <ElementUploadLink
              element={element}
              targetIcon={type.includes("image") ? <FaImage /> : undefined}
            />
          )}
          {type &&
            TypeIcons[type]?.map((propName) => (
              <ElementIconEdit propName={propName} key={propName} element={element} />
            ))}
          {type && element.props && TypeLinks[type] && (
            <ElementLinkEdit element={element} sectionIndex={sectionIndex} />
          )}
          {!element?.disableCopy && (
            <ElementCopyButton parentID={parentID} element={element} childrenProp={childrenProp} />
          )}
          {element.editType === "section" && <SectionBGEdit element={element} />}
          {type.includes("header") && <HeaderFixedEdit element={element} />}
          {!element?.disableDelete && (
            <ElementDeleteButton
              parentID={parentID}
              element={element}
              childrenProp={childrenProp}
            />
          )}
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

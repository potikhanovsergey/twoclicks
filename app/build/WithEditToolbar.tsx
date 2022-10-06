import { Box, Group, Popover, Text } from "@mantine/core"
import React, { useLayoutEffect, useMemo, useRef } from "react"
import { BuildStore } from "store/build"
import { useDisclosure } from "@mantine/hooks"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import { observer } from "mobx-react-lite"
import { useDidMount } from "hooks/useDidMount"
import { useDelayedHover } from "hooks/useDelayedHover"

const BuilderImagePicker = dynamic(() => import("./BuilderImagePicker"))
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
  TypeGradients,
  TypeIcons,
  TypeRadius,
  TypeSizes,
  TypeVariants,
} from "helpers"

import dynamic from "next/dynamic"

interface IWithEditToolbar {
  children: JSX.Element
  parentID: string | null
  props?: ICanvasBlockProps
  sectionIndex?: number
  element: ICanvasBlock
}

const FIT_CONTENT_ELEMENTS = [
  "@mantine/core/actionicon",
  "@mantine/core/themeicon",
  // "@mantine/core/button",
  // "@mantine/core/badge",
  // "@mantine/core/avatar",
]

const WIDTH_AUTO_ELEMENTS = ["@mantine/core/image"]

const WithEditToolbar = ({ children, parentID, sectionIndex, element }: IWithEditToolbar) => {
  const {
    activeEditToolbars,
    isImageUploading,
    openedAction,
    data: { themeSettings },
  } = BuildStore

  const editableRef = useRef<HTMLDivElement>(null)

  const didMount = useDidMount()

  const [opened, { open, close }] = useDisclosure(Boolean(openedAction[element.id]))
  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    openDelay: 100,
    closeDelay: 400,
  })

  const popoverOpened = useMemo(() => {
    return opened || Boolean(openedAction[element.id])
  }, [opened, openedAction, element.id])

  useLayoutEffect(() => {
    if (!didMount) {
      activeEditToolbars[element.id] = opened

      if (!opened && !isImageUploading) {
        BuildStore.openedAction = {}
      }
    }
  }, [opened, isImageUploading, element.id, activeEditToolbars, didMount])

  const sectionLike = useMemo(() => {
    return element.editType === "section" || element.type?.includes("card") || element?.sectionLike
  }, [element])

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
    >
      <Popover.Target>
        <Box
          sx={(theme) => ({
            // width:
            //   element.type && FIT_CONTENT_ELEMENTS.includes(element.type)
            //     ? "fit-content"
            //     : WIDTH_AUTO_ELEMENTS.includes(element.type)
            //     ? "auto"
            //     : "100%",
            display:
              element.type && FIT_CONTENT_ELEMENTS.includes(element.type)
                ? "inline-block"
                : undefined,
            // margin: element.props?.align === "center" ? "0 auto" : undefined,
            border:
              element.editType === "section"
                ? undefined
                : opened ||
                  (typeof element.props?.children === "string" && !element.props?.children.length)
                ? `1px dotted ${theme.colors.gray[5]}`
                : "1px solid transparent",
            position: element.props?.sx?.position === "sticky" ? "sticky" : "relative",
            top: element.props?.sx?.position === "sticky" ? element.props?.sx?.top : undefined,
            justifySelf: "stretch",
            "> :not(button, [data-button=true]), > :not([data-button=true])":
              element.editType === "section"
                ? undefined
                : {
                    height: "100%",
                  },
            borderBottom:
              element.editType === "section"
                ? `1px dashed ${theme.fn.rgba(theme.colors.gray[5], 0.4)}`
                : undefined,
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
                zIndex: 2,
                top: -element.props.mt || 0,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          {element.editType === "image" ? (
            <BuilderImagePicker elementID={element.id}>{children}</BuilderImagePicker>
          ) : (
            React.cloneElement(children, {
              onMouseEnter: openDropdown,
              onMouseLeave: closeDropdown,
              ref: editableRef,
            })
          )}
          {element.editType === "section" && sectionIndex !== undefined && (
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
          {TypeVariants[element.type] && <ElementVariantsEdit element={element} />}
          {TypeSizes[element.type] && <ElementSizesEdit element={element} />}
          {TypeRadius[element.type] && <ElementRadiusesEdit element={element} />}
          {TypeGradients[element.type] &&
            (element.props.variant === "gradient" ||
              (!element.props.variant &&
                themeSettings.variant === "gradient" &&
                defaultGradients.includes(element.type))) && (
              <ElementGradientsEdit element={element} />
            )}
          {element.type &&
            ["image", "youtubeframe"].some((item) => element.type.includes(item)) && (
              <ElementTypeEdit
                element={element}
                types={[
                  { label: "Image", value: "@mantine/core/image", editType: "image" },
                  { label: "Youtube Video", value: "youtubeframe", editType: "video" },
                ]}
              />
            )}{" "}
          {(element.props.variant !== "gradient" &&
            themeSettings.variant !== "gradient" &&
            defaultGradients.includes(element.type)) ||
          (!defaultGradients.includes(element.type) && element.props.variant !== "gradient") ? (
            <ElementPaletteEdit element={element} />
          ) : (
            <></>
          )}
          <ElementMoves parentID={parentID} element={element} />
          {element.type && element.props && <ElementUploadLink element={element} />}
          {element.type &&
            TypeIcons[element.type]?.map((propName) => (
              <ElementIconEdit propName={propName} key={propName} element={element} />
            ))}
          {element.type && element.props && (
            <ElementLinkEdit element={element} sectionIndex={sectionIndex} />
          )}
          {element && !element?.disableCopy && (
            <ElementCopyButton parentID={parentID} element={element} />
          )}
          <ElementDeleteButton parentID={parentID} element={element} />
          {element.editType === "section" && <SectionBGEdit element={element} />}
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

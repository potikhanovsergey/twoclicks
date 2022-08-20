import {
  ActionIcon,
  Box,
  Button,
  ButtonProps,
  Center,
  ColorSwatch,
  Group,
  Menu,
  Popover,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineTheme,
  DEFAULT_THEME,
} from "@mantine/core"
import React, {
  cloneElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { FiPlusSquare, FiSettings } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BuildStore } from "store/build"
import { CgChevronLeftR, CgChevronRightR, CgChevronUpR, CgChevronDownR } from "react-icons/cg"
import { useDebouncedValue, useDisclosure } from "@mantine/hooks"
import {
  getBase64,
  getHexFromThemeColor,
  getThemeColorValueArray,
  hasElementPalette,
  PaletteTypePropColor,
  TypeVariants,
  TypeSizes,
  TypeRadius,
  TypeGradients,
} from "helpers"
import { i } from "@blitzjs/auth/dist/index-57d74361"
import PaletteItem from "./PaletteItem"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import { observer } from "mobx-react-lite"
import { useDidMount } from "hooks/useDidMount"
import { useDelayedHover } from "hooks/useDelayedHover"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { FaLongArrowAltRight, FaMagic } from "react-icons/fa"
import IconPicker from "app/core/components/base/IconPicker"
import ImagePicker from "app/core/components/base/ImagePicker"
import { GiResize } from "react-icons/gi"
import { AiOutlineRadiusBottomleft } from "react-icons/ai"
import { HiArrowNarrowRight } from "react-icons/hi"

interface IWithEditToolbar {
  children: JSX.Element
  id: string
  parentID: string | null
  editType: string | null
  type?: string
  name?: string
  props?: ICanvasBlockProps
  sectionIndex?: number
  element?: ICanvasBlock
}

interface InnerAddSectionButtonProps extends Omit<ButtonProps, "style" | "children"> {
  sectionToBeAddedIndex: number
}

const InnerAddSectionButton = (props: InnerAddSectionButtonProps) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)

  const { sectionToBeAddedIndex, ...otherProps } = props
  return (
    <Button
      style={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}
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
      Add new section
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
  const {
    moveLeft,
    moveRight,
    deleteElement,
    data: { blocks, palette },
    changeProp,
    activeEditToolbars,
    openedAction,
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

  return (
    <Popover
      trapFocus={false}
      withArrow={editType !== "section"}
      opened={isElementActive || activeEditToolbars[id]}
      position={editType === "section" ? "right-end" : "top-end"}
      offset={editType === "section" ? 0 : undefined}
    >
      <Popover.Target>
        <Box
          sx={(theme) => ({
            width: editType === "element" ? "fit-content" : "auto",
            border: isElementActive
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
            <ImagePicker
              onDrop={async (files) => {
                const data = new FormData()
                data.append("file", files[0])
                data.append("UPLOADCARE_PUB_KEY", "719fb1a8f2d034c0731c")
                data.append("UPLOADCARE_STORE", "auto")

                const response = await fetch("https://upload.uploadcare.com/base/", {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  body: data,
                })

                if (response.ok) {
                  const responseData = await response.json()
                  const src = `https://ucarecdn.com/${responseData.file}/`
                  const old_uuid = props?.uuid
                  changeProp({
                    id,
                    newProps: {
                      src,
                      uuid: responseData.file,
                    },
                  })
                  if (old_uuid) {
                    await fetch(`https://api.uploadcare.com/files/${old_uuid}/storage/`, {
                      method: "DELETE",
                      mode: "cors",
                      cache: "no-cache",
                      headers: {
                        Authorization:
                          "Uploadcare.Simple 719fb1a8f2d034c0731c:8447df3ce909bc5b904b",
                      },
                    })
                  }
                }
              }}
            >
              {children}
            </ImagePicker>
          ) : (
            children
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
          {editType !== "section" && name && (
            <Text
              ml="xs"
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
          {type && TypeVariants[type.toLowerCase()] && (
            <Menu
              position="top"
              offset={0}
              defaultOpened={openedAction?.[id] === "variant"}
              onOpen={() => {
                BuildStore.openedAction[id] = "variant"
              }}
              onClose={() => (BuildStore.openedAction = {})}
              closeOnItemClick={false}
            >
              <Menu.Target>
                <div>
                  <Tooltip label="Variants" color="violet" withArrow>
                    <ActionIcon color="violet">
                      <FaMagic style={{ fill: "url(#violet-red-gradient)" }} />
                    </ActionIcon>
                  </Tooltip>
                </div>
              </Menu.Target>
              <Menu.Dropdown p={0}>
                <Stack spacing={0} align="stretch">
                  {TypeVariants[type.toLowerCase()].map((variant) => (
                    <Button
                      sx={({}) => ({ textTransform: "capitalize" })}
                      variant="subtle"
                      size="sm"
                      compact
                      key={variant}
                      disabled={
                        props?.variant === undefined
                          ? variant === "filled"
                          : variant === props?.variant
                      }
                      onClick={() => [
                        changeProp({
                          id,
                          newProps: { variant },
                        }),
                      ]}
                    >
                      {variant}
                    </Button>
                  ))}
                </Stack>
              </Menu.Dropdown>
            </Menu>
          )}
          {type && TypeSizes[type.toLowerCase()] && (
            <Menu
              position="top"
              offset={0}
              defaultOpened={openedAction?.[id] === "size"}
              onOpen={() => {
                BuildStore.openedAction[id] = "size"
              }}
              onClose={() => (BuildStore.openedAction = {})}
              closeOnItemClick={false}
            >
              <Menu.Target>
                <div>
                  <Tooltip label="Sizes" color="violet" withArrow>
                    <ActionIcon color="violet">
                      <GiResize style={{ fill: "url(#violet-red-gradient)" }} />
                    </ActionIcon>
                  </Tooltip>
                </div>
              </Menu.Target>
              <Menu.Dropdown p={0}>
                <Stack spacing={0} align="stretch">
                  {TypeSizes[type.toLowerCase()].map((size) => (
                    <Button
                      variant="subtle"
                      size="sm"
                      compact
                      key={size}
                      disabled={
                        props?.size === undefined ? size === "filled" : size === props?.size
                      }
                      onClick={() => [
                        changeProp({
                          id,
                          newProps: { size },
                        }),
                      ]}
                    >
                      {size}
                    </Button>
                  ))}
                </Stack>
              </Menu.Dropdown>
            </Menu>
          )}
          {type && TypeRadius[type.toLowerCase()] && (
            <Menu
              position="top"
              offset={0}
              defaultOpened={openedAction?.[id] === "radius"}
              onOpen={() => {
                BuildStore.openedAction[id] = "radius"
              }}
              onClose={() => (BuildStore.openedAction = {})}
              closeOnItemClick={false}
            >
              <Menu.Target>
                <div>
                  <Tooltip label="Radius" color="violet" withArrow>
                    <ActionIcon color="violet">
                      <AiOutlineRadiusBottomleft style={{ fill: "url(#violet-red-gradient)" }} />
                    </ActionIcon>
                  </Tooltip>
                </div>
              </Menu.Target>
              <Menu.Dropdown p={0}>
                <Stack spacing={0} align="stretch">
                  {TypeRadius[type.toLowerCase()].map((radius) => (
                    <Button
                      variant="subtle"
                      size="sm"
                      compact
                      key={radius}
                      disabled={
                        props?.radius === undefined ? radius === "filled" : radius === props?.radius
                      }
                      onClick={() => [
                        changeProp({
                          id,
                          newProps: { radius },
                        }),
                      ]}
                    >
                      {radius}
                    </Button>
                  ))}
                </Stack>
              </Menu.Dropdown>
            </Menu>
          )}
          {type && TypeGradients[type.toLowerCase()] && props?.variant === "gradient" && (
            <Menu
              position="top"
              offset={0}
              defaultOpened={openedAction?.[id]?.includes("gradient")}
              onOpen={() => {
                BuildStore.openedAction[id] = "gradient"
              }}
              onClose={() => (BuildStore.openedAction = {})}
              closeOnItemClick={false}
            >
              <Menu.Target>
                <div>
                  <Tooltip label="Gradient" color="violet" withArrow>
                    <Center sx={{ height: "100%", cursor: "pointer" }}>
                      <ActionIcon>
                        <Box
                          sx={(theme) => ({
                            background: theme.fn.linearGradient(
                              theme.defaultGradient.deg || 45,
                              theme.colors?.[props?.gradient?.from]?.[5] ||
                                theme.colors[theme.defaultGradient.from][5],
                              theme.colors?.[props?.gradient?.to]?.[5] ||
                                theme.colors[theme.defaultGradient.to][5]
                            ),
                            width: "65%",
                            height: "65%",
                            borderRadius: theme.radius.xs,
                          })}
                        />
                      </ActionIcon>
                    </Center>
                  </Tooltip>
                </div>
              </Menu.Target>
              <Menu.Dropdown p={4}>
                <Group noWrap spacing={4}>
                  <Tooltip label='Change "From" color' color="violet" withArrow>
                    <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
                      <PaletteItem
                        defaultOpened={openedAction?.[id] === "gradient-from"}
                        onOpen={() => {
                          BuildStore.openedAction[id] = "gradient-from"
                        }}
                        popoverPosition="top"
                        offset={6}
                        color={getHexFromThemeColor({
                          theme,
                          color: props?.gradient?.from || theme.defaultGradient.from,
                        })}
                        onColorChange={(value) => {
                          changeProp({
                            id,
                            newProps: {
                              gradient: {
                                ...props.gradient,
                                from: value,
                              },
                            },
                          })
                        }}
                      />
                    </Box>
                  </Tooltip>
                  <HiArrowNarrowRight />
                  <Tooltip label='Change "To" color' color="violet" withArrow>
                    <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
                      <PaletteItem
                        defaultOpened={openedAction?.[id] === "gradient-to"}
                        onOpen={() => {
                          BuildStore.openedAction[id] = "gradient-to"
                        }}
                        popoverPosition="top"
                        offset={6}
                        color={getHexFromThemeColor({
                          theme,
                          color: props?.gradient?.to || theme.defaultGradient.to,
                        })}
                        onColorChange={(value) => {
                          changeProp({
                            id,
                            newProps: {
                              gradient: {
                                ...props.gradient,
                                to: value,
                              },
                            },
                          })
                        }}
                      />
                    </Box>
                  </Tooltip>
                </Group>
              </Menu.Dropdown>
            </Menu>
          )}
          {type &&
            hasElementPalette(type.toLowerCase()) &&
            props?.variant !== "gradient" &&
            props?.[PaletteTypePropColor[type.toLowerCase()].prop] && (
              <Tooltip label="Change color" color="violet" withArrow>
                <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
                  <PaletteItem
                    currentPaletteColor={
                      palette?.[PaletteTypePropColor[type.toLowerCase()].color]
                        ? getHexFromThemeColor({
                            theme,
                            color: palette?.[PaletteTypePropColor[type.toLowerCase()].color],
                          })
                        : undefined
                    }
                    defaultOpened={openedAction?.[id] === "palette"}
                    onOpen={() => {
                      BuildStore.openedAction[id] = "palette"
                    }}
                    onClose={() => (BuildStore.openedAction = {})}
                    popoverPosition="top"
                    offset={6}
                    color={getHexFromThemeColor({
                      theme,
                      color: props?.[PaletteTypePropColor[type.toLowerCase()].prop],
                    })}
                    withReset={
                      element?.props?.[PaletteTypePropColor[type.toLowerCase()].prop] !== undefined
                    }
                    onColorChange={(value) => {
                      changeProp({
                        id,
                        newProps: { [PaletteTypePropColor[type.toLowerCase()].prop]: value },
                      })
                    }}
                    onResetClick={() => {
                      changeProp({
                        id,
                        newProps: { [PaletteTypePropColor[type.toLowerCase()].prop]: undefined },
                      })
                    }}
                  />
                </Box>
              </Tooltip>
            )}
          {hasMoves && movesIcons && (
            <>
              {id !== blocks[0].id && (
                <Tooltip
                  label="Move Up"
                  color="violet"
                  withArrow
                  position={editType === "section" ? "left" : "top"}
                >
                  <ActionIcon size="md" onClick={() => moveLeft({ id, parentID, editType })}>
                    {movesIcons.left}
                  </ActionIcon>
                </Tooltip>
              )}
              {id !== blocks[blocks.length - 1].id && (
                <Tooltip
                  label="Move Down"
                  color="violet"
                  withArrow
                  position={editType === "section" ? "left" : "top"}
                >
                  <ActionIcon size="md" onClick={() => moveRight({ id, parentID, editType })}>
                    {movesIcons.right}
                  </ActionIcon>
                </Tooltip>
              )}
            </>
          )}

          <Tooltip
            label={editType === "section" ? "Delete section" : "Delete"}
            color="violet"
            withArrow
            position={editType === "section" ? "left" : "top"}
          >
            <ActionIcon
              color="red"
              size="md"
              onClick={() => {
                deleteElement({ id, parentID })
              }}
            >
              <RiDeleteBin6Line />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(WithEditToolbar)

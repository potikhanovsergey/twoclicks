import {
  ActionIcon,
  Box,
  Button,
  ButtonProps,
  Group,
  Menu,
  Popover,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
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
  getHexFromThemeColor,
  getThemeColorValueArray,
  hasElementPalette,
  PaletteTypePropColor,
  TypeVariants,
} from "helpers"
import { i } from "@blitzjs/auth/dist/index-57d74361"
import PaletteItem from "./PaletteItem"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import { observer } from "mobx-react-lite"
import { useDidMount } from "hooks/useDidMount"
import { useDelayedHover } from "hooks/useDelayedHover"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { FaMagic } from "react-icons/fa"

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
            marginTop: "-1px",
            position: "relative",
          })}
          onMouseEnter={openDelayedEditable}
          onMouseLeave={closeDelayedEditable}
          ref={editableRef}
        >
          {editType === "section" && sectionIndex === 0 && (
            <InnerAddSectionButton sectionToBeAddedIndex={0} />
          )}
          {children}
          {editType === "section" && sectionIndex !== undefined && (
            <InnerAddSectionButton sectionToBeAddedIndex={sectionIndex + 1} />
          )}
        </Box>
      </Popover.Target>
      <Popover.Dropdown style={{ padding: 0 }}>
        <Group
          noWrap
          spacing={4}
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
                <Tooltip label="Variants" color="violet" withArrow>
                  <ActionIcon color="violet">
                    <FaMagic style={{ fill: "url(#violet-red-gradient)" }} />
                  </ActionIcon>
                </Tooltip>
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
          {type &&
            hasElementPalette(type.toLowerCase()) &&
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
            label="Delete"
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

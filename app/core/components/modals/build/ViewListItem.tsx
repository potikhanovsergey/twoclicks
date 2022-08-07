import {
  Box,
  Group,
  ActionIcon,
  createStyles,
  Image,
  LoadingOverlay,
  useMantineTheme,
} from "@mantine/core"
import {
  cloneElement,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { renderJSXFromBlock } from "helpers"
import { BuildingBlock } from "@prisma/client"
import { BuildStore } from "store/build"
import { useMutation } from "@blitzjs/rpc"
import createLikedBlock from "app/liked-blocks/mutations/createLikedBlock"
import deleteLikedBlock from "app/liked-blocks/mutations/deleteLikedBlock"
import { useElementSize } from "@mantine/hooks"
import { ICanvasBlockProps } from "types"

interface IViewListItem {
  block: BuildingBlock
  onClick?: () => void
  hasActions?: boolean
  liked?: boolean
}

const useStyles = createStyles((theme, _params, getRef) => ({
  box: {
    borderRadius: "12px",
    background: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
    cursor: "pointer",
    display: "flex",
    // justifyContent: "center",
    height: "100%",
    // maxHeight: "200px",
    aspectRatio: "5/3",
    position: "relative",
    overflowX: "hidden",
    overflowY: "scroll",
    transition: "0.3s ease all",
    "&:hover": {
      [`& .${getRef("icon")}`]: {
        opacity: 1,
      },
      [`& .${getRef("child")}`]: {
        transform: "scale(0.97)",
      },
      background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
    },
  },
  child: {
    transition: "0.4s ease transform",
    ref: getRef("child"),
  },
  actions: {
    position: "absolute",
    top: "8px",
    right: "8px",
    display: "flex",
  },

  actionIcon: {
    "&:hover": {
      background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3],
    },
    "&:focus": {
      [`& .${getRef("icon")}`]: {
        opacity: 1,
      },
    },
  },
  icon: {
    ref: getRef("icon"),
    pointerEvents: "none",
    opacity: 0,
  },
}))

const ViewListItem = ({ block, onClick, hasActions = false, liked }: IViewListItem) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { classes } = useStyles()

  const JSX = useMemo(() => {
    return renderJSXFromBlock({
      element: { ...block, editType: null },
      withContentEditable: false,
    })
  }, [block])

  const iconRef = useRef(null)
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (liked !== undefined) {
      setIsLiked(liked)
    }
  }, [liked])

  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const handleBoxClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === iconRef.current) {
      setIsLikeLoading(true)
      if (isLiked) {
        await dislikeBuildingBlock({ buildingBlockId: block.id })
        setIsLiked(false)
      } else {
        await likeBuildingBlock({ buildingBlockId: block.id })
        setIsLiked(true)
      }
      BuildStore.shouldRefetchLiked = true
      setIsLikeLoading(false)
    } else {
      BuildStore.push(block)
      setModalContext((prevValue: IModalContextValue) => ({
        ...prevValue,
        canvasComponentsModal: false,
        canvasSectionsModal: false,
      }))
    }
  }
  const [likeBuildingBlock] = useMutation(createLikedBlock)
  const [dislikeBuildingBlock] = useMutation(deleteLikedBlock)

  const { ref: boxRef, width: boxWidth } = useElementSize<HTMLDivElement>()

  const theme = useMantineTheme()

  const zoom = useMemo(() => {
    if (block.editType !== "section")
      return {
        isLoading: false,
        value: 1,
      }
    if (boxWidth !== 0) {
      return {
        isLoading: false,
        value: boxWidth / theme.breakpoints.xl,
      }
    }
    return {
      isLoading: true,
      value: 1,
    }
  }, [boxWidth])

  return (
    <Box
      ref={boxRef}
      className={classes.box}
      // style={{ alignItems: block.editType === "element" ? "center" : "flex-start" }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => (onClick ? onClick() : handleBoxClick(e))}
    >
      <div style={{ margin: "auto" }}>
        {cloneElement(JSX, {
          style: {
            zoom: zoom.value,
            display: zoom.isLoading ? "none" : "flex",
          },
          className: classes.child,
        })}
      </div>
      {hasActions && (
        <Group className={classes.actions}>
          <ActionIcon
            sx={(theme) => ({
              color: theme.colors.red[5],
            })}
            ref={iconRef}
            loading={isLikeLoading}
            className={classes.actionIcon}
          >
            <RiHeartAddFill
              className={classes.icon}
              style={{ display: isLiked ? "block" : "none", opacity: 1 }}
            />
            <RiHeartAddLine
              className={classes.icon}
              style={{ display: !isLiked ? "block" : "none" }}
            />
          </ActionIcon>
        </Group>
      )}
    </Box>
  )
}

export default ViewListItem

import { Box, Group, ActionIcon, createStyles } from "@mantine/core"
import { cloneElement, useContext, useEffect, useMemo, useRef, useState } from "react"
import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri"
import shortid from "shortid"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { renderJSXFromBlock, serialize } from "helpers"
import { BuildingBlock } from "@prisma/client"
import { BuildStore } from "store/build"
import { useMutation } from "@blitzjs/rpc"
import createLikedBlock from "app/liked-blocks/mutations/createLikedBlock"
import deleteLikedBlock from "app/liked-blocks/mutations/deleteLikedBlock"

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
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    maxHeight: "200px",
    aspectRatio: "5/3",
    position: "relative",
    "&:hover": {
      [`& .${getRef("icon")}`]: {
        opacity: 1,
      },
    },
  },
  child: {
    transition: "0.4s ease transform",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  actions: {
    position: "absolute",
    top: "8px",
    right: "8px",
    display: "flex",
  },
  actionIcon: {
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

  const TagName = useMemo(() => {
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
      BuildStore.push({
        ...block,
        id: shortid.generate(),
      })
      setModalContext((prevValue: IModalContextValue) => ({
        ...prevValue,
        canvasComponentsModal: false,
        canvasSectionsModal: false,
      }))
    }
  }
  const [likeBuildingBlock] = useMutation(createLikedBlock)
  const [dislikeBuildingBlock] = useMutation(deleteLikedBlock)
  return (
    <div>
      <Box
        className={classes.box}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => (onClick ? onClick() : handleBoxClick(e))}
      >
        {cloneElement(TagName, { className: classes.child })}
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
    </div>
  )
}

export default ViewListItem

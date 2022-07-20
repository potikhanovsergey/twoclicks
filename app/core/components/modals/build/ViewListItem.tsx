import { Box, Group, ActionIcon, createStyles } from "@mantine/core"
import { cloneElement, useContext, useEffect, useMemo, useRef, useState } from "react"
import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri"
import shortid from "shortid"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { recursiveTagName } from "helpers"
import { BuildingBlock } from "@prisma/client"
import { BuildStore } from "store/build"
import { useMutation } from "@blitzjs/rpc"
import createLikedBlock from "app/liked-blocks/mutations/createLikedBlock"
import deleteLikedBlock from "app/liked-blocks/mutations/deleteLikedBlock"

interface IViewListItemBlock extends BuildingBlock {
  liked?: boolean
}

interface IViewListItem {
  block: IViewListItemBlock
  onClick?: () => void
  hasActions?: boolean
  onLikeOrDislike?: () => void
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
    aspectRatio: "5/3",
    position: "relative",
    // '&:hover': {
    //   [`& .${getRef('child')}`]: {
    //     transform: 'scale(1.2)',
    //   },
    // },
  },
  child: {
    ref: getRef("child"),
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
  icon: {
    pointerEvents: "none",
  },
}))

const ViewListItem = ({ block, onClick, hasActions = false, onLikeOrDislike }: IViewListItem) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { classes } = useStyles()
  const [boxHovered, setBoxHovered] = useState(false)

  const TagName = useMemo(
    () => recursiveTagName({ ...block, id: shortid.generate(), editType: null }),
    [block]
  )
  const iconRef = useRef(null)

  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const handleBoxClick = async (e: any) => {
    // todo: remove any
    if (e.target === iconRef.current) {
      setIsLikeLoading(true)
      if (block.liked) {
        await dislikeBuildingBlock({ buildingBlockId: block.id })
        onLikeOrDislike && onLikeOrDislike()
      } else {
        await likeBuildingBlock({ buildingBlockId: block.id })
        onLikeOrDislike && onLikeOrDislike()
      }
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
        onMouseEnter={() => setBoxHovered(true)}
        onMouseLeave={() => setBoxHovered(false)}
        className={classes.box}
        onClick={(e) => (onClick ? onClick() : handleBoxClick(e))}
      >
        {cloneElement(TagName, { className: classes.child })}
        {hasActions && (
          <Group className={classes.actions}>
            {block.liked !== undefined && (
              <ActionIcon color="red" ref={iconRef} loading={isLikeLoading}>
                <RiHeartAddLine
                  className={classes.icon}
                  style={{
                    position: "absolute",
                    opacity: boxHovered ? 1 : 0,
                    visibility: !block.liked ? "visible" : "hidden",
                  }}
                />
                <RiHeartAddFill
                  className={classes.icon}
                  style={{
                    opacity: block.liked ? 1 : 0,
                    transition: "0.4s ease all",
                    position: "absolute",
                  }}
                />
              </ActionIcon>
            )}
          </Group>
        )}
      </Box>
    </div>
  )
}

export default ViewListItem

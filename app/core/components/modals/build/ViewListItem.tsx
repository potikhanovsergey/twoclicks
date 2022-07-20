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

const ViewListItem = ({ block, onClick, hasActions = false }: IViewListItem) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { classes } = useStyles()
  const [boxHovered, setBoxHovered] = useState(false)

  const TagName = useMemo(() => {
    return recursiveTagName({ ...block, id: shortid.generate(), editType: null })
  }, [block])

  const iconRef = useRef(null)
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (block.liked !== undefined) {
      setIsLiked(block.liked)
    }
  }, [block])

  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const handleBoxClick = async (e: any) => {
    // todo: remove any
    if (e.target === iconRef.current) {
      setIsLikeLoading(true)
      if (isLiked) {
        await dislikeBuildingBlock({ buildingBlockId: block.id })
        setIsLiked(false)
      } else {
        await likeBuildingBlock({ buildingBlockId: block.id })
        setIsLiked(true)
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
            <ActionIcon color="red" ref={iconRef} loading={isLikeLoading}>
              <RiHeartAddFill
                className={classes.icon}
                style={{ display: isLiked ? "block" : "none" }}
              />
              <RiHeartAddLine
                className={classes.icon}
                style={{ opacity: boxHovered ? 1 : 0, display: !isLiked ? "block" : "none" }}
              />
            </ActionIcon>
          </Group>
        )}
      </Box>
    </div>
  )
}

export default ViewListItem

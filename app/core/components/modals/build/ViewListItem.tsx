import { Box, Group, ActionIcon, createStyles } from "@mantine/core"
import { cloneElement, forwardRef, useContext, useMemo, useRef, useState } from "react"
import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri"
import shortid from "shortid"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
// import { CanvasStore } from "../../../store/build"
// import { BuildingBlocksStore } from "../../../store/build/buildingBlocks"
import { ICanvasBlock } from "types"
import { recursiveTagName } from "helpers"
import { BuildingBlock } from "@prisma/client"

interface IViewListItem {
  block: BuildingBlock
  onClick?: () => void
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

const ViewListItem = ({ block, onClick }: IViewListItem, ref) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { classes } = useStyles()

  // const { push } = CanvasStore
  const [boxHovered, setBoxHovered] = useState(false)

  const TagName = useMemo(
    () => recursiveTagName({ ...block, id: shortid.generate(), editType: null }),
    [block]
  )
  const iconRef = useRef(null)

  // const { toggleLike } = BuildingBlocksStore

  const handleBoxClick = (e: any) => {
    // todo: remove any
    // if (e.target === iconRef.current) {
    //   console.log(block)
    //   toggleLike(block.component) // todo: change block.component to id
    // } else {
    //   push({
    //     ...block,
    //     id: shortid.generate(),
    //   })
    //   setModalContext((prevValue: IModalContextValue) => ({
    //     ...prevValue,
    //     canvasComponentsModal: false,
    //     canvasSectionsModal: false,
    //   }))
    // }
  }
  return (
    <div>
      <Box
        onMouseEnter={() => setBoxHovered(true)}
        onMouseLeave={() => setBoxHovered(false)}
        className={classes.box}
        onClick={(e) => (onClick ? onClick() : handleBoxClick(e))}
      >
        {cloneElement(TagName, { className: classes.child })}
        <Group className={classes.actions}>
          <ActionIcon color="red" ref={iconRef}>
            {/* {block.liked ? (
              <RiHeartAddFill className={classes.icon} />
            ) : (
              <RiHeartAddLine className={classes.icon} style={{ opacity: boxHovered ? 1 : 0 }} />
            )} */}
          </ActionIcon>
        </Group>
      </Box>
    </div>
  )
}

export default ViewListItem

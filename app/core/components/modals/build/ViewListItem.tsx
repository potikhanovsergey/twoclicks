import {
  Box,
  Group,
  ActionIcon,
  createStyles,
  useMantineTheme,
  ScrollArea,
  Tooltip,
} from "@mantine/core"
import { cloneElement, useContext, useEffect, useMemo, useRef, useState } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import RenderJSXFromBlock from "app/core/components/RenderJSXFromBlock"
import { BuildStore } from "store/build"
import { useMutation } from "@blitzjs/rpc"
import createLikedBlock from "app/building-blocks/mutations/createLikedBlock"
import deleteLikedBlock from "app/building-blocks/mutations/deleteLikedBlock"
import { useElementSize } from "@mantine/hooks"
import SafeWrapper from "../../SafeWrapper"
import { observer } from "mobx-react-lite"
import shortid from "shortid"

import { RiHeartsFill } from "@react-icons/all-files/ri/RiHeartsFill"
import { RiHeartAddLine } from "@react-icons/all-files/ri/RiHeartAddLine"
import upsertUsedBlock from "app/building-blocks/mutations/upsertUsedBlock"
import { ICanvasBlock } from "types"
interface IViewListItem {
  block: ICanvasBlock
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
    height: "100%",
    aspectRatio: "5/3",
    position: "relative",
    overflow: "hidden",
    transition: "0.4s ease all",
    "&:hover": {
      [`& .${getRef("icon")}`]: {
        opacity: 1,
      },
      [`& .${getRef("child")}`]: {},
      background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3],
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
      background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[8],
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
  const {
    data: { themeSettings },
    insertIndex,
  } = BuildStore

  const JSX = useMemo(() => {
    return (
      <RenderJSXFromBlock
        element={{ ...block, editType: null }}
        withContentEditable={false}
        withThemeSettings
        themeSettings={themeSettings}
      />
    )
  }, [block, themeSettings])

  const iconRef = useRef(null)
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (liked !== undefined) {
      setIsLiked(liked)
    }
  }, [liked])

  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const [likeBuildingBlock] = useMutation(createLikedBlock)
  const [dislikeBuildingBlock] = useMutation(deleteLikedBlock)
  const [upsertUsedBlockMutation] = useMutation(upsertUsedBlock)

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
      void upsertUsedBlockMutation({ buildingBlockId: block.id })
      BuildStore.push({ block: { ...block, id: shortid.generate() }, insertIndex })
      setModalContext((prevValue: IModalContextValue) => ({
        ...prevValue,
        canvasComponentsModal: false,
        canvasSectionsModal: false,
      }))
    }
  }

  const { ref: boxRef, width: boxWidth, height: boxHeight } = useElementSize<HTMLDivElement>()
  const {
    ref: contentRef,
    width: contentWidth,
    height: contentHeight,
  } = useElementSize<HTMLDivElement>()

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

  const hasRendered = useMemo(() => {
    return contentWidth && contentHeight
  }, [contentWidth, contentHeight])

  return (
    <Box
      ref={boxRef}
      className={classes.box}
      style={{ pointerEvents: hasRendered ? "all" : "none" }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => (onClick ? onClick() : handleBoxClick(e))}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <ScrollArea
          style={{ height: boxHeight }}
          styles={{
            viewport: {
              display: "flex",
              alignItems: "center",
              "> div": { marginTop: "auto", marginBottom: "auto" },
            },
          }}
          type="never"
        >
          <div
            ref={contentRef}
            style={{
              transform: `scale(${zoom.value})`,
              margin: `${-(contentHeight - contentHeight * zoom.value) / 2}px ${
                -(contentWidth - contentWidth * zoom.value) / 2
              }px`,
              opacity: hasRendered ? 1 : 0,
            }}
          >
            <SafeWrapper resetKeys={[JSX]}>
              {cloneElement(JSX, {
                className: classes.child,
              })}
            </SafeWrapper>
          </div>
        </ScrollArea>
      </div>
      {hasActions && (
        <Group className={classes.actions}>
          <Tooltip
            label={isLiked ? "Remove from favs" : "Add to favs"}
            position="bottom"
            withArrow
            withinPortal
            zIndex={1000}
          >
            <ActionIcon
              sx={(theme) => ({
                color: theme.colors.red[5],
              })}
              ref={iconRef}
              loading={isLikeLoading}
              className={classes.actionIcon}
            >
              {isLiked ? (
                <RiHeartsFill
                  className={classes.icon}
                  style={{ display: isLiked ? "block" : "none", opacity: 1 }}
                />
              ) : (
                <RiHeartAddLine
                  className={classes.icon}
                  style={{ display: !isLiked ? "block" : "none" }}
                />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
    </Box>
  )
}

export default observer(ViewListItem)

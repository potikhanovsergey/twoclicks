import { AspectRatioProps, Avatar, Box, Group, Paper, Stack, Text } from "@mantine/core"
import { Page as DBPage } from "@prisma/client"
import Image from "next/image"
// import placeholder from "public/pages/"

export interface PageCardProps extends DBPage {
  user: {
    name: string
    avatar: string | null
  }
}

import { createStyles } from "@mantine/core"
import ImagePicker from "app/core/components/base/ImagePicker"
import { forwardRef, MouseEventHandler, ReactNode, RefObject, useEffect } from "react"
import SkeletonImage from "app/core/components/base/SkeletonImage"
import { observer } from "mobx-react-lite"
import CardOptions from "./CardOptions"

const useStyles = createStyles((theme, { cardLike }: { cardLike: boolean }, getRef) => ({
  imageCard: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: theme.radius.sm,
    "&:after": {
      position: "absolute",
      content: "''",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      transition: "0.2s ease background",
      // background: params.imageCardHovered ? theme.fn.rgba(theme.black, 0.66) : undefined,
    },
    "&:hover": {
      "&:after": {
        background: theme.fn.rgba(theme.black, 0.5),
      },
      // Type safe child reference in nested selectors via ref
      [`& .${getRef("imageBottom")}`]: cardLike
        ? {
            transform: "translateY(-100%)",
          }
        : undefined,
    },
  },

  imageBottom: {
    // assign ref to element
    ref: getRef("imageBottom"),
    position: "absolute",
    zIndex: 1,
    transition: "0.2s ease transform",
    paddingLeft: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },
}))

const CROP_AREA_ASPECT = 16 / 9

const PageCard = forwardRef(
  (
    {
      previewImage,
      customizable,
      bottomNode,
      options,
      href,
      openInNewTab,
      bottomText,
      onClick,
      onDrop,
    }: {
      customizable?: boolean
      previewImage?: string | null
      href?: string
      openInNewTab?: boolean
      bottomNode?: ReactNode
      options?: ReactNode
      bottomText?: string
      onClick?: MouseEventHandler<HTMLElement>
      onDrop?: (files: File[]) => void
    },
    ref: RefObject<HTMLDivElement>
  ) => {
    const { classes } = useStyles({
      cardLike: Boolean(!customizable || (customizable && previewImage)),
    })

    useEffect(() => {
      return () => {
        previewImage && URL.revokeObjectURL(previewImage)
      }
    }, [])

    return (
      <Stack spacing={8} sx={{ position: "relative" }} ref={ref}>
        <Paper<"a">
          className={classes.imageCard}
          component={!customizable && href ? "a" : undefined}
          href={!customizable && href ? href : undefined}
          target={openInNewTab ? "_blank" : undefined}
          onClick={onClick}
        >
          <Box
            sx={{
              paddingBottom: `${100 / CROP_AREA_ASPECT}%`,
            }}
          >
            {customizable && onDrop ? (
              <ImagePicker onDrop={onDrop}>
                <SkeletonImage
                  src={previewImage || "/twoclicks-placeholder.png"}
                  alt=""
                  layout="fill"
                />
              </ImagePicker>
            ) : (
              <SkeletonImage
                src={previewImage || "/twoclicks-placeholder.png"}
                alt=""
                layout="fill"
              />
            )}
          </Box>
          {!customizable && bottomText && (
            <Text
              className={classes.imageBottom}
              color="white"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "24ch",
                whiteSpace: "nowrap",
              }}
            >
              {bottomText}
            </Text>
          )}
        </Paper>
        {bottomNode}
        {options && <CardOptions>{options}</CardOptions>}
      </Stack>
    )
  }
)

export default observer(PageCard)

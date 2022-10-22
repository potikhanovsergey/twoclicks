import { Box, Paper, Stack, Text, Image, AspectRatio, PaperProps } from "@mantine/core"
import { Page as DBPage } from "@prisma/client"

export interface PageCardProps extends DBPage {
  user: {
    name: string
    avatar: string | null
  }
}

import { createStyles } from "@mantine/core"
import ImagePicker from "app/core/components/base/ImagePicker"
import {
  forwardRef,
  MouseEventHandler,
  ReactEventHandler,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react"
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
      imageAspectRatio = 16 / 9,
      paperProps,
      onClick,
      onDrop,
      onImageLoad,
    }: {
      customizable?: boolean
      previewImage?: string | null
      href?: string
      openInNewTab?: boolean
      bottomNode?: ReactNode
      options?: ReactNode
      bottomText?: string
      imageAspectRatio?: number
      paperProps?: PaperProps
      onClick?: MouseEventHandler<HTMLElement>
      onDrop?: (files: File[]) => void
      onImageLoad?: ReactEventHandler<HTMLImageElement>
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
          {...paperProps}
        >
          <AspectRatio ratio={imageAspectRatio}>
            {customizable && onDrop ? (
              <ImagePicker onDrop={onDrop}>
                <SkeletonImage
                  src={previewImage || "/twoclicks-placeholder.png"}
                  alt=""
                  layout="fill"
                  onLoad={onImageLoad}
                />
              </ImagePicker>
            ) : (
              <SkeletonImage
                src={previewImage || "/twoclicks-placeholder.png"}
                alt=""
                layout="fill"
                onLoad={onImageLoad}
              />
            )}
          </AspectRatio>
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

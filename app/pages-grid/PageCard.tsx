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
import { ReactNode, useEffect } from "react"
import PageCardOptions from "./PageCardOptions"
import SkeletonImage from "app/core/components/base/SkeletonImage"
import { observer } from "mobx-react-lite"

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

const PageCard = ({
  page,
  previewImage,
  imageStyles,
  customizable,
  toBuild,
  bottomNode,
  withOptions,
  onDrop,
}: {
  page: PageCardProps
  customizable?: boolean
  previewImage?: string | null
  imageStyles?: Partial<AspectRatioProps>
  toBuild?: boolean
  bottomNode?: ReactNode
  withOptions?: boolean
  onDrop?: (files: File[]) => void
}) => {
  const { classes } = useStyles({
    cardLike: Boolean(!customizable || (customizable && previewImage)),
  })

  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage)
    }
  }, [])

  return (
    <Stack spacing={8} sx={{ position: "relative" }}>
      {withOptions && <PageCardOptions page={page} />}
      <Paper<"a">
        className={classes.imageCard}
        component={customizable ? undefined : "a"}
        href={customizable ? undefined : `/${toBuild ? "build" : "pages"}/${page.id}`}
        target={customizable || toBuild ? undefined : "_blank"}
      >
        <Box
          sx={{
            paddingBottom: `${100 / CROP_AREA_ASPECT}%`,
          }}
          {...imageStyles}
        >
          {customizable && onDrop ? (
            <ImagePicker onDrop={onDrop}>
              <SkeletonImage
                src={previewImage || page.previewImage || "/twoclicks-placeholder.png"}
                alt={page.name + " by " + page.user.name}
                layout="fill"
              />
            </ImagePicker>
          ) : (
            <SkeletonImage
              src={previewImage || page.previewImage || "/twoclicks-placeholder.png"}
              alt={page.name + " by " + page.user.name}
              layout="fill"
            />
          )}
        </Box>
        {!customizable && (
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
            {page.name}
          </Text>
        )}
      </Paper>
      {bottomNode}
    </Stack>
  )
}

export default observer(PageCard)

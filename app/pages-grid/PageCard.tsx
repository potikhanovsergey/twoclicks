import {
  AspectRatio,
  AspectRatioProps,
  Avatar,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Image as MantineImage,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { Page as DBPage, User } from "@prisma/client"
import Image from "next/image"
// import placeholder from "public/pages/"
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt"

export interface PageCardProps extends DBPage {
  user: {
    name: string
    avatar: string | null
  }
}

import { createStyles } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import ImagePicker from "app/core/components/base/ImagePicker"
import BuilderImagePicker from "app/build/BuilderImagePicker"

const useStyles = createStyles((theme, { cardLike }: { cardLike: boolean }, getRef) => ({
  imageCard: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
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
        background: theme.fn.rgba(theme.black, 0.66),
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
}: {
  page: PageCardProps
  customizable?: boolean
  previewImage?: string
  imageStyles?: Partial<AspectRatioProps>
}) => {
  const { classes } = useStyles({
    cardLike: Boolean(!customizable || (customizable && previewImage)),
  })

  return (
    <Stack spacing={4}>
      <Paper<"a">
        withBorder
        className={classes.imageCard}
        component={customizable ? undefined : "a"}
        href={customizable ? `/p/${page.id}` : undefined}
        target="_blank"
      >
        <Box
          sx={(theme) => ({
            paddingBottom: `${100 / CROP_AREA_ASPECT}%`,
            img: {
              borderRadius: theme.radius.sm,
            },
          })}
          {...imageStyles}
        >
          {customizable ? (
            previewImage ? (
              <Image alt="" layout="fill" src={previewImage} />
            ) : (
              <ImagePicker onDrop={() => 1}>
                <Image
                  src={previewImage || "/twoclicks-placeholder.png"}
                  alt={page.name + " by " + page.user.name}
                  layout="fill"
                />
              </ImagePicker>
            )
          ) : (
            <Image
              src={previewImage || "/twoclicks-placeholder.png"}
              alt={page.name + " by " + page.user.name}
              layout="fill"
            />
          )}
        </Box>
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
      </Paper>

      <Group position="apart" align="center" noWrap>
        <Group spacing={6} align="center" noWrap>
          <Avatar src={page.user.avatar} variant="light" size="sm" radius="xl" />
          <Text
            weight="bold"
            size="sm"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "24ch",
              whiteSpace: "nowrap",
            }}
          >
            {page.user.name}
          </Text>
        </Group>

        <Text color="dimmed" size="sm">
          View count
        </Text>
      </Group>
    </Stack>
  )
}

export default PageCard

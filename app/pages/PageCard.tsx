import { AspectRatio, Avatar, Group, Paper, Stack, Text } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { Page as DBPage, User } from "@prisma/client"
import Image from "next/image"
// import placeholder from "public/pages/"

export interface PageCardProps extends DBPage {
  user: {
    name: string
    avatar: string
  }
}

import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme, _params, getRef) => ({
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
      [`& .${getRef("imageBottom")}`]: {
        transform: "translateY(-100%)",
      },
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

const PageCard = ({ page }: { page: PageCardProps }) => {
  const { classes } = useStyles()
  return (
    <Stack spacing={4}>
      <Paper
        withBorder
        className={classes.imageCard}
        component="a"
        href={`/p/${page.id}`}
        target="_blank"
      >
        <AspectRatio
          ratio={16 / 9}
          sx={(theme) => ({
            img: {
              borderRadius: theme.radius.sm,
            },
          })}
        >
          <Image
            src="/pages/page-card-placeholder.png"
            alt={page.name + " by " + page.user.name}
            layout="fill"
          />
        </AspectRatio>
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

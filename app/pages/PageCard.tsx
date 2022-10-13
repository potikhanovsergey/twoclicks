import { AspectRatio, Group, Paper, Stack, Text } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { Page as DBPage, User } from "@prisma/client"
import Image from "next/image"
// import placeholder from "public/pages/"

export interface PageCardProps extends DBPage {
  user: {
    name: string
    email: string
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
      <Paper withBorder className={classes.imageCard}>
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
        <Text className={classes.imageBottom} color="white">
          {page.name}
        </Text>
      </Paper>

      <Group position="apart" align="center">
        <Text weight="bold">{page.user.name}</Text>
        <Text color="dimmed">View count</Text>
      </Group>
    </Stack>
  )
}

export default PageCard

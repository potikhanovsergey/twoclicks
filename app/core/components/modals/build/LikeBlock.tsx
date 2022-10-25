import { Tooltip, ActionIcon, createStyles } from "@mantine/core"
import { RiHeartAddLine } from "@react-icons/all-files/ri/RiHeartAddLine"
import { RiHeartsFill } from "@react-icons/all-files/ri/RiHeartsFill"
import { useState, useEffect } from "react"

const useStyles = createStyles((theme, { hovered }: { hovered?: boolean }, getRef) => ({
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
    opacity: hovered ? 1 : 0,
  },
}))

const LikeBlock = ({
  liked,
  loading = false,
  hovered,
  onClick,
}: {
  liked?: boolean
  loading?: boolean
  hovered?: boolean
  onClick?: () => void
}) => {
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (liked !== undefined) {
      setIsLiked(liked)
    }
  }, [liked])

  const { classes } = useStyles({ hovered })

  return (
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
        loading={loading}
        className={classes.actionIcon}
        onClick={onClick}
      >
        <RiHeartsFill
          className={classes.icon}
          style={{ display: isLiked ? "block" : "none", opacity: 1 }}
        />
        <RiHeartAddLine className={classes.icon} style={{ display: !isLiked ? "block" : "none" }} />
      </ActionIcon>
    </Tooltip>
  )
}

export default LikeBlock

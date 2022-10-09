import { ReactNode, useEffect } from "react"
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Image,
  Portal,
  HeaderProps,
} from "@mantine/core"
import { useDisclosure, useScrollLock } from "@mantine/hooks"

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme, { fixed }: { fixed: boolean }) => ({
  root: {
    position: fixed ? undefined : "relative",
    zIndex: fixed ? 1000 : 1,
    overflow: "hidden",
  },

  dropdown: {
    position: "fixed",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 3000,
    bottom: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",
    flexDirection: "column",
    display: "flex",
    gap: "12px",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}))

interface SimpleHeaderBaseProps extends Omit<HeaderProps, "children" | "height"> {
  links: ReactNode[]
  logo: ReactNode
}

const SimpleHeaderBase = ({ links, logo, ...props }: SimpleHeaderBaseProps) => {
  const [opened, { toggle, close }] = useDisclosure(false)
  const { classes, cx } = useStyles({ fixed: Boolean(props.fixed) })

  const [, setScrollLocked] = useScrollLock()
  useEffect(() => {
    setScrollLocked(opened)
  }, [opened])

  return (
    <Header className={classes.root} {...props} height={60}>
      <Container className={classes.header}>
        {logo}
        <Group spacing={12} className={classes.links}>
          {links}
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        <Portal>
          <Transition transition="slide-left" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {links}
              </Paper>
            )}
          </Transition>
        </Portal>
      </Container>
    </Header>
  )
}

SimpleHeaderBase.displayName = "@twoclicks/simpleheader"

export default SimpleHeaderBase

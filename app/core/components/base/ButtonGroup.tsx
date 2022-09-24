import { Box, BoxProps, Button, ButtonProps, createStyles } from "@mantine/core"
import { useDebouncedValue, useHover } from "@mantine/hooks"
import { useRef, useState } from "react"
import Link from "next/link"
import ConditionalWrapper from "../ConditionalWrapper"

export type GroupButtonProps = ButtonProps & {
  href?: string
  elType?: "link" | "button" | "menuItem"
  onClick?: () => void
  active?: boolean
}

interface ButtonGroupProps {
  direction?: "row" | "column"
  buttons?: GroupButtonProps[]
  highlightProps?: BoxProps
}

const WRAPPER_PADDING = 0

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    display: "flex",
    position: "relative",
  },
  highlight: {
    ref: getRef("highlight"),
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "4px",
    transition: "ease-in-out all",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1],
    pointerEvents: "none",
  },
}))

const ButtonGroup = ({ direction = "row", buttons, highlightProps }: ButtonGroupProps) => {
  const { classes } = useStyles()

  const [highlightPosition, setHighlightPosition] = useState({
    width: 0,
    height: 0,
    translate: [0, 0],
    active: false,
  })
  const refs = useRef<
    Record<string, HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | null>
  >({})

  const { hovered: containerHovered, ref: containerRef } = useHover()

  const [debouncedContainerHovered] = useDebouncedValue(containerHovered, 150)

  return (
    <Box className={classes.wrapper} ref={containerRef} sx={{ flexDirection: direction }}>
      <Box
        aria-hidden
        component="span"
        className={classes.highlight}
        style={{
          width: highlightPosition.width,
          height: highlightPosition.height,
          transitionDuration: debouncedContainerHovered ? "125ms" : "0ms",
          opacity: containerHovered || debouncedContainerHovered ? 1 : 0,
          transform: `translate(${highlightPosition.translate[0]}px, ${highlightPosition.translate[1]}px )`,
        }}
        {...highlightProps}
      />
      {buttons &&
        buttons.length > 0 &&
        buttons.map((button, i) => {
          const { href, elType, children, active, ...props } = button

          return (
            <ConditionalWrapper
              key={i}
              condition={elType !== "button"}
              wrap={(children) => {
                if (elType === "menuItem" && href) {
                  return (
                    <Link href={href} passHref>
                      {children}
                    </Link>
                  )
                }

                return children
              }}
            >
              <Button
                variant="default"
                component={
                  elType === "link" || (elType === "menuItem" && href)
                    ? ("a" as "button")
                    : undefined
                }
                role={elType === "menuItem" ? "menuitem" : undefined}
                key={i}
                ref={(node) => {
                  refs.current[i] = node
                }}
                styles={(theme) => ({
                  root: {
                    "&:hover": active
                      ? theme.colorScheme === "dark"
                        ? theme.colors.dark[4]
                        : theme.colors.gray[1]
                      : {
                          backgroundColor: "transparent",
                        },
                  },
                })}
                sx={(theme) => ({
                  position: "relative",
                  userSelect: "none",
                  padding: "6px 12px",
                  border: "none",
                  backgroundColor: active
                    ? theme.colorScheme === "dark"
                      ? theme.colors.dark[4]
                      : theme.colors.gray[1]
                    : "transparent",
                })}
                onMouseEnter={(e) => {
                  const element = refs.current[i]
                  if (element?.parentElement) {
                    const elementRect = element.getBoundingClientRect()
                    const scaledValue = element.offsetWidth / elementRect.width
                    const width = elementRect.width * scaledValue || 0
                    const height = elementRect.height * scaledValue || 0
                    setHighlightPosition({
                      width,
                      height,
                      translate: [element.offsetLeft, element.offsetTop],
                      active: true,
                    })
                  }
                }}
                {...props}
              >
                {children}
              </Button>
            </ConditionalWrapper>
          )
        })}
    </Box>
  )
}

export default ButtonGroup

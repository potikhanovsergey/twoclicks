import { Box, Text } from "@mantine/core"
import Link from "next/link"
import Clicks from "./Clicks"

const MadeWithTwoClicks = () => {
  return (
    <Link href="/" passHref>
      <Box
        id="madewithtwoclicks"
        p={4}
        component="a"
        sx={(theme) => ({
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.rgba(theme.colors.dark[7], 0.72)
              : theme.fn.rgba(theme.colors.gray[0], 0.72),
          zIndex: 302,
          borderRadius: theme.radius.md,
          backdropFilter: "saturate(270%) blur(5px)",
          overflow: "hidden",
          transition: "0.4s ease transform",
          textDecoration: "none",
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
          display: "flex",
          flexWrap: "nowrap",
          gap: "8px",
          transform: "translateX(-160px)",
          alignItems: "center",
          "&:hover": {
            transform: "none",
          },
        })}
      >
        <Text
          weight="bold"
          sx={() => ({
            whiteSpace: "nowrap",
            fontSize: "16px",
            transition: "0.4s ease all",
          })}
        >
          Made with twoclicks
        </Text>
        <Clicks width="auto" height="30px" />
      </Box>
    </Link>
  )
}

export default MadeWithTwoClicks

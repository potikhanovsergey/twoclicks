import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { useMantineTheme, Text, Box, Global, UnstyledButton, ThemeIcon } from "@mantine/core"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import getTemplates from "app/templates/queries/getTemplates"
import { AuthorizationError } from "blitz"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useRef, useState } from "react"
import { baseURL } from "./_app"

import { BsCaretLeftFill } from "@react-icons/all-files/bs/BsCaretLeftFill"
import { BsCaretRightFill } from "@react-icons/all-files/bs/BsCaretRightFill"

const Templates = () => {
  const theme = useMantineTheme()
  const session = useSession()
  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])

  const [templates] = useQuery(getTemplates, {})

  const [index, setIndex] = useState(0)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { t } = useTranslation("build")

  const handleIframeLoad = () => {
    console.log("IFRAME LOADED")
    const cssLink = document.createElement("link")
    cssLink.href = "/iframe.css"
    cssLink.rel = "stylesheet"
    cssLink.type = "text/css"
    iframeRef?.current?.contentWindow?.document.head.appendChild(cssLink)
  }

  const dark = theme.colorScheme === "dark"
  return (
    <Box style={{ height: "100%", position: "relative" }}>
      <Box
        component="iframe"
        sx={{
          width: "100%",
          height: "100%",
          border: "none",
          position: "relative",
        }}
        onLoad={handleIframeLoad}
        loading="lazy"
        ref={iframeRef}
        src={`${baseURL}/p/${templates[index].id}?hideScrollbar=true`}
      >
        <Text>{t("browser iframe")}</Text>
      </Box>
      <UnstyledButton
        onClick={() => {
          setIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1))
        }}
        sx={{
          position: "absolute",
          width: "156px",
          left: 0,
          bottom: 0,
          top: 0,
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          "&:hover": {
            backgroundColor: theme.fn.rgba(dark ? theme.colors.dark[5] : theme.colors.gray[3], 0.5),
          },
        }}
      >
        <ThemeIcon variant="light" size={48}>
          <BsCaretLeftFill size={32} color={theme.colors.violet[5]} />
        </ThemeIcon>{" "}
      </UnstyledButton>
      <UnstyledButton
        onClick={() => {
          setIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1))
        }}
        sx={{
          position: "absolute",
          width: "156px",
          right: 0,
          bottom: 0,
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "20px",
          "&:hover": {
            backgroundColor: theme.fn.rgba(dark ? theme.colors.dark[5] : theme.colors.gray[3], 0.5),
          },
        }}
      >
        <ThemeIcon variant="light" size={48}>
          <BsCaretRightFill size={32} color={theme.colors.violet[5]} />
        </ThemeIcon>
      </UnstyledButton>
      <Global styles={{ body: { overflow: "hidden" } }} />
    </Box>
  )
}

Templates.getLayout = getBaseLayout({ headerWithTransparency: true })
Templates.suppressFirstRenderFlicker = true

export default Templates

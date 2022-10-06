import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import {
  useMantineTheme,
  Text,
  Box,
  Global,
  UnstyledButton,
  ThemeIcon,
  MantineProvider,
} from "@mantine/core"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import getTemplates from "app/templates/queries/getTemplates"
import { AuthorizationError } from "blitz"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useMemo, useState } from "react"

import { BsCaretLeftFill } from "@react-icons/all-files/bs/BsCaretLeftFill"
import { BsCaretRightFill } from "@react-icons/all-files/bs/BsCaretRightFill"
import Page from "app/p/Page"
import { inflateBase64 } from "helpers/utils"
import { ICanvasPalette, IPage, IThemeSettings } from "types"
import { Page as DBPage } from "db"
import { defaultThemeSettings } from "store/build"

const Templates = () => {
  const theme = useMantineTheme()
  const session = useSession()
  useEffect(() => {
    if (session.role !== "ADMIN") {
      throw new AuthorizationError()
    }
  }, [session])

  const [templates] = useQuery(
    getTemplates,
    {},
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

  const [index, setIndex] = useState(0)
  const currentPage = useMemo(() => {
    return templates[index]
  }, [templates, index])

  const { t } = useTranslation("build")

  const dark = theme.colorScheme === "dark"
  return currentPage ? (
    <MantineProvider
      inherit
      theme={{
        colorScheme:
          currentPage.theme === "inherit"
            ? theme.colorScheme
            : (currentPage.theme as typeof theme.colorScheme),
      }}
    >
      <Box style={{ height: "100%", position: "relative" }}>
        <UnstyledButton
          onClick={() => {
            setIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1))
          }}
          sx={{
            position: "fixed",
            width: "156px",
            left: 0,
            bottom: 0,
            zIndex: 100,
            top: "var(--layout-header-height)",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            "&:hover": {
              backgroundColor: theme.fn.rgba(
                dark ? theme.colors.dark[5] : theme.colors.gray[3],
                0.3
              ),
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
            position: "fixed",
            width: "156px",
            right: 0,
            bottom: 0,
            zIndex: 100,
            top: "var(--layout-header-height)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "20px",
            "&:hover": {
              backgroundColor: theme.fn.rgba(
                dark ? theme.colors.dark[5] : theme.colors.gray[3],
                0.3
              ),
            },
          }}
        >
          <ThemeIcon variant="light" size={48}>
            <BsCaretRightFill size={32} color={theme.colors.violet[5]} />
          </ThemeIcon>
        </UnstyledButton>
        <Page
          page={{
            ...templates[index],
            data: inflateBase64(templates[index].data),
            customID: undefined,
            theme: templates[index].theme as IPage["theme"],
            themeSettings:
              (templates[index].themeSettings as unknown as IThemeSettings) || defaultThemeSettings,
          }}
        />
      </Box>
    </MantineProvider>
  ) : (
    <></>
  )
}

Templates.getLayout = getBaseLayout({ headerWithTransparency: true })
Templates.suppressFirstRenderFlicker = true

export default Templates

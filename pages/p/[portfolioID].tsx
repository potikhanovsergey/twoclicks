import { Text, Loader, Center, LoadingOverlay, MantineProvider, Box, Group } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"
import { getPortfolioWithInflatedData } from "helpers"
import { Ctx, useParam } from "@blitzjs/next"
import { IPortfolio } from "types"
import { useQuery } from "@blitzjs/rpc"
import getPortfolioByID from "app/portfolios/queries/getPortfolioByID"
import Portfolio from "app/p/Portfolio"
import MainLoader from "app/core/components/MainLoader"
import { useDocumentTitle } from "@mantine/hooks"
import useTranslation from "next-translate/useTranslation"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import Logo from "app/core/components/Logo"
import Link from "next/link"
import Clicks from "app/core/components/Clicks"

const PortfolioPage = () => {
  const { t } = useTranslation("pagesBuild")

  const portfolioID = useParam("portfolioID", "string")

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null)

  const [portfolioFromDB, { refetch: refetchPortfolioFromDB }] = useQuery(
    getPortfolioByID,
    { id: portfolioID, isPublic: true },
    { refetchOnWindowFocus: false }
  )
  useEffect(() => {
    const getPortfolio = async () => {
      let p: IPortfolio | null = null
      if (portfolioFromDB) {
        p = getPortfolioWithInflatedData(portfolioFromDB)
      }
      setPortfolio(p)
    }
    void getPortfolio()
    setIsLoading(false)
  }, [portfolioFromDB])

  const [isLoading, setIsLoading] = useState(true)

  useDocumentTitle(portfolio?.name || "skillcase")
  if (isLoading) return <LoadingOverlay visible={true} loader={<MainLoader size={128} />} />

  return (
    <>
      {portfolio ? (
        <Suspense fallback={<Loader />}>
          {/* <MantineProvider inherit theme={{ colorScheme: "light" }}> */}
          <Portfolio portfolio={portfolio} />
          <Link href="/" passHref>
            <Box
              component="a"
              sx={(theme) => ({
                position: "fixed",
                bottom: "4px",
                left: "4px",
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
              {/* <Logo width={128} height="auto" withRedirect={false} /> */}
              <Text
                weight="bold"
                sx={(theme) => ({
                  // position: "absolute",
                  whiteSpace: "nowrap",
                  fontSize: "16px",
                  // transform: "translateX(-100%)",
                  transition: "0.4s ease all",
                })}
              >
                Made with twoclicks
              </Text>
              <Clicks width="auto" height="30px" />
            </Box>
          </Link>
          {/* </MantineProvider> */}
        </Suspense>
      ) : (
        <Center style={{ height: "100%" }}>
          <Text>{t("portfolio not found")}</Text>
        </Center>
      )}
    </>
  )
}

PortfolioPage.suppressFirstRenderFlicker = true

export default PortfolioPage

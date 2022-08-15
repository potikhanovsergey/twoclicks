import Head from "next/head"
import useTranslation from "next-translate/useTranslation"
import {
  Button,
  Center,
  Group,
  Skeleton,
  Stack,
  ThemeIcon,
  Title,
  useMantineColorScheme,
} from "@mantine/core"
import { AiFillBuild } from "react-icons/ai"
import { BsPersonFill } from "react-icons/bs"
import { FaBook } from "react-icons/fa"
import { NextLink } from "@mantine/next"
import { Suspense } from "react"
import { Player } from "@lottiefiles/react-lottie-player"
import error_404 from "lotties/404-cat.json"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { getBaseLayout } from "app/core/layouts/BaseLayout"

const Links = () => {
  const user = useCurrentUser()
  const { t } = useTranslation("pages404")
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  return (
    <>
      <Button
        size="md"
        variant={dark ? "light" : "filled"}
        color={dark ? "gray" : "dark"}
        title={t("goToTheAboutUs")}
        href="/"
        component={NextLink}
        leftIcon={
          <ThemeIcon color="violet" size="md">
            <FaBook />
          </ThemeIcon>
        }
      >
        About Us
      </Button>
      {user && (
        <Button
          size="md"
          variant={dark ? "light" : "filled"}
          color={dark ? "gray" : "dark"}
          title={t("goToTheProfile")}
          href="/profile"
          component={NextLink}
          leftIcon={
            <ThemeIcon color="teal" size="md">
              <BsPersonFill />
            </ThemeIcon>
          }
        >
          Profile
        </Button>
      )}
      <Button
        size="md"
        variant="filled"
        color="violet"
        title={t("openThePageBuilder")}
        href="/build"
        component={NextLink}
        leftIcon={
          <ThemeIcon color={dark ? "accent" : "dark"} size="md">
            <AiFillBuild />
          </ThemeIcon>
        }
      >
        Portfolio Builder
      </Button>
    </>
  )
}

const Page404 = () => {
  const { t } = useTranslation("pages404")
  return (
    <>
      <Head>
        <title>404 Page not found</title>
      </Head>
      <Center style={{ height: "100%" }}>
        <Stack>
          <Title align="center">Oops, page not found!</Title>
          <Center>
            <Player autoplay loop src={error_404} style={{ height: "300px", width: "300px" }} />
          </Center>
          <Group position="center">
            <Suspense fallback={<Skeleton height={45} animate />}>
              <Links />
            </Suspense>
          </Group>
        </Stack>
      </Center>
    </>
  )
}

Page404.getLayout = getBaseLayout()
Page404.suppressFirstRenderFlicker = true

export default Page404

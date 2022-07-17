import Head from "next/head"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import {
  Button,
  ButtonVariant,
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
import { ReactNode, Suspense, useMemo } from "react"
import { Player } from "@lottiefiles/react-lottie-player"
import error_404 from "../lotties/404-cat.json"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

interface ILink {
  icon: ReactNode
  title: string
  text: string
  route: string
  shouldRender: boolean
  variant: ButtonVariant
  color: string
}

const Links = () => {
  const user = useCurrentUser()
  const { t } = useTranslation("pages404")
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  return (
    <>
      <Button
        size="lg"
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
          size="lg"
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
        size="lg"
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

export default function Page404() {
  const { t } = useTranslation("pages404")
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"

  return (
    <>
      <Head>
        <title>404 Page not found</title>
      </Head>
      <main>
        <Center style={{ width: "100vw", minHeight: "100vh" }}>
          <Stack>
            <Title align="center">Oops, page not found!</Title>
            <Center>
              <Player autoplay loop src={error_404} style={{ height: "400px", width: "400px" }} />
            </Center>
            <Group position="center">
              <Suspense fallback={<Skeleton height={45} animate />}>
                <Links />
              </Suspense>
            </Group>
          </Stack>
        </Center>
      </main>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["pages404"])),
    },
  }
}

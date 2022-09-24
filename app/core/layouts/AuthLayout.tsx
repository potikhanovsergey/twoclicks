import { Center, Group, Stack, useMantineTheme, Title, Loader, Button, Space } from "@mantine/core"
import { ReactNode, Suspense } from "react"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { FC } from "react"
import Logo from "app/core/components/Logo"
import AuthSocials from "app/auth/components/Socials"
import Link from "next/link"

import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle"
import { FaYandex } from "@react-icons/all-files/fa/FaYandex"
import { FaVk } from "@react-icons/all-files/fa/FaVk"
import { NotificationsProvider } from "@mantine/notifications"

interface IAuthLayout {
  title?: string
  formTitle?: string
  children: ReactNode
}

const AuthLayout: FC<IAuthLayout> = ({ title, children, formTitle }) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("common")
  return (
    <NotificationsProvider>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/oneclick.svg" />
      </Head>

      <main style={{ background: dark ? theme.colors.dark[7] : theme.white }}>
        <div style={{ minHeight: "100vh", position: "relative" }}>
          <Group
            grow
            style={{ minHeight: "100vh", position: "relative" }}
            align="stretch"
            spacing={0}
          >
            <Group position="center">
              <Stack
                style={{
                  background: dark ? theme.colors.dark[7] : theme.white,
                  color: dark ? theme.white : theme.colors.dark[7],
                  padding: "16px",
                  maxWidth: "512px",
                  width: "100%",
                }}
                align="center"
              >
                <Logo width={196} />
                {formTitle && (
                  <Title order={1} style={{ fontSize: "2em" }} mb="md">
                    {formTitle}
                  </Title>
                )}
                <Suspense fallback={<Loader />}>
                  <AuthSocials
                    socials={[
                      {
                        provider: "google",
                        icon: <FcGoogle size={28} />,
                      },
                      {
                        provider: "yandex",
                        icon: <FaYandex size={24} color="#FF0000" />,
                      },
                      {
                        provider: "vkontakte",
                        icon: <FaVk size={28} color="#0177ff" />,
                      },
                    ]}
                  />
                </Suspense>
                {children}
              </Stack>
            </Group>
            <Center
              style={{
                background: dark ? theme.colors.dark[6] : "#f1f4ff",
                maxHeight: "100vh",
                overflow: "hidden",
                position: "fixed",
                right: 0,
                top: 0,
                left: "50vw",
                height: "100vh",
                pointerEvents: "none",
              }}
            >
              Тут был лотти
            </Center>
          </Group>
          <Stack style={{ position: "fixed", top: "24px", right: "24px" }} spacing={8}>
            <Link href="/" passHref>
              <Button component="a" variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
                На главную
              </Button>
            </Link>
            <Link href="/build" color="orange" passHref>
              <Button component="a" variant="gradient" gradient={{ from: "accent", to: "red" }}>
                В конструктор
              </Button>
            </Link>
          </Stack>
        </div>
      </main>
    </NotificationsProvider>
  )
}

export default AuthLayout

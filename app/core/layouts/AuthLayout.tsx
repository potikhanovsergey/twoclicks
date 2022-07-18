import { Center, Group, Stack, useMantineTheme, Title, Loader } from "@mantine/core"
import { ReactNode, Suspense } from "react"
import { useTranslation } from "next-i18next"
import { Player } from "@lottiefiles/react-lottie-player"
import Head from "next/head"
import { FC } from "react"
import Logo from "app/core/components/Logo"
import workingMan from "lotties/workingMan.json"
import { FcGoogle } from "react-icons/fc"
import { FaYandex, FaVk } from "react-icons/fa"
import AuthSocials from "app/auth/components/Socials"

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

  // // SESSION CONTROL STARTS
  // const router = useRouter();
  // const { status } = useSession();
  // useEffect(() => {
  //   console.log(router);
  //   if (status === 'authenticated') {
  //     console.log(router.query.callbackUrl, router.query);
  //     router.push(router.query.callbackUrl?.toString() || '/');
  //   }
  // }, [status]);
  // // SESSION CONTROL ENDS
  return (
    <>
      <Head>
        <title>{title || "skillcase"}</title>
        <link rel="icon" href="/favicon.png" />
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
                <Logo />
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
              <Player
                autoplay
                loop
                src={workingMan}
                speed={0.5}
                style={{ height: "auto", width: "100%" }}
              />
            </Center>
          </Group>
          {/* <ActionIcon
          onClick={handleModalClose}
          size="xl"
          color={dark ? 'gray' : 'dark'}
          style={{ position: 'fixed', top: '24px', right: '24px' }}
        >
          <VscChromeClose size={32} />
        </ActionIcon> */}
        </div>
      </main>
    </>
  )
}

export default AuthLayout

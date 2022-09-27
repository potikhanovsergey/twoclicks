import { useRouter } from "next/router"
import { Suspense, useEffect } from "react"
import { useSession } from "@blitzjs/auth"
import { showNotification } from "@mantine/notifications"
import { useLocalStorage } from "@mantine/hooks"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Loader, Stack, Title } from "@mantine/core"
import { FaVk } from "@react-icons/all-files/fa/FaVk"
import { FaYandex } from "@react-icons/all-files/fa/FaYandex"
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle"
import AuthSocials from "app/auth/components/Socials"

const AuthPage = () => {
  const router = useRouter()

  const [routerNext, setRouterNext] = useLocalStorage<string | null>({
    key: "router-next",
    defaultValue: null,
  })

  const session = useSession()
  useEffect(() => {
    if (session.userId && routerNext) {
      const nextURL = routerNext || (router.query.next as string) || "/"
      setRouterNext(null)
      void router.replace(nextURL)
    }
  }, [session, routerNext])

  useEffect(() => {
    if (router.query.authError) {
      showNotification({
        id: "auth-error",
        autoClose: false,
        title: "Authentication Error",
        message: router.query.authError,
        color: "red",
        loading: false,
      })
      const { pathname } = router
      void router.replace({ pathname }, undefined, { shallow: true })
    }
  }, [router.query])

  return (
    <Stack
      style={{ height: "100%", maxWidth: "50%", margin: "0 auto" }}
      align="center"
      justify="center"
    >
      <Title
        order={1}
        sx={{
          fontSize: "2em",
          textAlign: "center",
          "@media (max-width: 768px)": {
            fontSize: "1.4em",
          },
        }}
        mb="md"
      >
        Pick a provider to authorize
      </Title>
      <Suspense fallback={<Loader />}>
        <AuthSocials
          socials={[
            {
              provider: "google",
              icon: <FcGoogle size={48} />,
            },
            {
              provider: "yandex",
              icon: <FaYandex size={26} color="#FF0000" />,
            },
            {
              provider: "vkontakte",
              icon: <FaVk size={48} color="#0177ff" />,
            },
          ]}
        />
      </Suspense>
    </Stack>
  )
}

AuthPage.getLayout = getBaseLayout({ headerWithAuthButton: false })
AuthPage.suppressFirstRenderFlicker = true

export default AuthPage

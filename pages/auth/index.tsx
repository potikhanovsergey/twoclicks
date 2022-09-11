import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import AuthLayout from "app/core/layouts/AuthLayout"
import { useEffect, useState } from "react"
import SignupForm from "app/auth/components/SignupForm"
import { useSession } from "@blitzjs/auth"
import { showNotification } from "@mantine/notifications"
import { useLocalStorage } from "@mantine/hooks"

type step = "registration" | "authorization"

const AuthPage = () => {
  const router = useRouter()
  const [step, setStep] = useState<step>("authorization")

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
      const { pathname, query } = router
      void router.replace({ pathname }, undefined, { shallow: true })
    }
  }, [router.query])

  return (
    <AuthLayout
      title={step === "authorization" ? "Log In" : "Sign Up"}
      formTitle={step === "authorization" ? "Welcome Back!" : undefined}
    >
      {step === "authorization" ? (
        <LoginForm onSignup={() => setStep("registration")} />
      ) : (
        <SignupForm onLogin={() => setStep("authorization")} />
      )}
    </AuthLayout>
  )
}

AuthPage.suppressFirstRenderFlicker = true

export default AuthPage

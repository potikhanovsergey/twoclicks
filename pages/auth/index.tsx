import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import AuthLayout from "app/core/layouts/AuthLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useState } from "react"
import SignupForm from "app/auth/components/SignupForm"
import { useRedirectAuthenticated } from "@blitzjs/auth"

type step = "registration" | "authorization"

const AuthPage = () => {
  const router = useRouter()
  const [step, setStep] = useState<step>("authorization")
  useRedirectAuthenticated("/")

  return (
    <AuthLayout
      title={step === "authorization" ? "Log In" : "Sign Up"}
      formTitle={step === "authorization" ? "Welcome Back!" : undefined}
    >
      {step === "authorization" ? (
        <LoginForm
          onSignup={() => setStep("registration")}
          onSuccess={() => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            return router.push(next)
          }}
        />
      ) : (
        <SignupForm
          onLogin={() => setStep("authorization")}
          onSuccess={() => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            return router.push(next)
          }}
        />
      )}
    </AuthLayout>
  )
}

AuthPage.suppressFirstRenderFlicker = true

export default AuthPage

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

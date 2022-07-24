import Layout from "app/core/layouts/Layout"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"

const ForgotPasswordPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Layout title="Forgot Your Password?">
      <h1>Forgot your password?</h1>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        // todo: forget password form
        <></>
        // <Form
        //   submitText="Send Reset Password Instructions"
        //   schema={ForgotPassword}
        //   initialValues={{ email: "" }}
        //   onSubmit={async (values) => {
        //     try {
        //       await forgotPasswordMutation(values)
        //     } catch (error: any) {
        //       return {
        //         [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        //       }
        //     }
        //   }}
        // >
        //   <LabeledTextField name="email" label="Email" placeholder="Email" />
        // </Form>
      )}
    </Layout>
  )
}

ForgotPasswordPage.suppressFirstRenderFlicker = true

export default ForgotPasswordPage

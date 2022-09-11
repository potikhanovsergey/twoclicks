import { AuthenticationError } from "blitz"
import login from "app/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import {
  Divider,
  Text,
  useMantineTheme,
  Grid,
  Button,
  TextInput,
  PasswordInput,
  Group,
  Anchor,
} from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { hideNotification, showNotification } from "@mantine/notifications"
import { useEffect } from "react"

type LoginFormProps = {
  onSignup: () => void
}
interface IAuthorizeValues {
  email: string
  password: string
}

export const LoginForm = ({ onSignup }: LoginFormProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("common")
  const [loginMutation] = useMutation(login)

  // AUTHORIZATION STARTS
  const authorizationForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must contain at least 8 characters" : null,
    },
  })
  const handleAuthorize = async (values: IAuthorizeValues) => {
    const validation = authorizationForm.validate()
    if (!validation.hasErrors) {
      try {
        await loginMutation(values)
      } catch (error: any) {
        let message
        let title
        if (error instanceof AuthenticationError) {
          message = "Sorry, those credentials are invalid"
          title = "Authentication Error"
        } else {
          message = "Sorry, we had an unexpected error. Please try again. - " + error.toString()
          title = "Unexpected Error"
        }
        showNotification({
          id: "auth-error",
          autoClose: false,
          title,
          message,
          color: "red",
          loading: false,
        })
        return
      }
    }
  }
  // AUTHORIZATION ENDS

  useEffect(() => {
    return () => {
      hideNotification("auth-error")
    }
  }, [])

  return (
    <>
      <Divider
        style={{
          width: "100%",
        }}
        labelProps={{ size: "md" }}
        size="sm"
        mb="md"
        label={
          <Text color={dark ? "white" : "dark"} weight="bold">
            Or Login with Email
          </Text>
        }
        labelPosition="center"
        color={dark ? "gray" : "dark"}
      />
      <form
        onSubmit={authorizationForm.onSubmit((values) => {
          void handleAuthorize(values)
        })}
        style={{ width: "100%" }}
      >
        <Grid style={{ width: "100%" }} mb="md" mx={0} grow>
          <Grid.Col span={12} p={0} mb="lg">
            <TextInput
              {...authorizationForm.getInputProps("email")}
              label={t("email")}
              placeholder="oliviasmith@gmail.com"
              required
              value={authorizationForm.values.email}
              onChange={(event) =>
                authorizationForm.setFieldValue("email", event.currentTarget.value)
              }
            />
          </Grid.Col>
          <Grid.Col span={12} p={0}>
            <Group position="apart" mb={5}>
              <Text component="label" htmlFor="your-password" size="sm" weight={500}>
                {t("password")}{" "}
                <Text color="red" component="span">
                  *
                </Text>
              </Text>
              <Button variant="subtle" size="sm" compact color="violet">
                Forgot your password?
              </Button>
            </Group>
            <PasswordInput
              required
              label=""
              placeholder={t("password")}
              {...authorizationForm.getInputProps("password")}
            />
          </Grid.Col>
        </Grid>
        <Button size="md" color="violet" fullWidth type="submit" my="sm">
          Login
        </Button>
        <Group position="center">
          <Text>{t("notAMemberYet")}</Text>
          <Button variant="subtle" color="violet" compact onClick={onSignup}>
            Sign up
          </Button>
        </Group>
      </form>
    </>
  )
}

export default LoginForm

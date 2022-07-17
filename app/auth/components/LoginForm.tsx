import { PromiseReturnType } from "blitz"
import login from "app/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
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
} from "@mantine/core"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
  onSignup: () => void
}
interface IAuthorizeValues {
  email: string
  password: string
}

export const LoginForm = ({ onSignup, onSuccess }: LoginFormProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("common")
  const [loginMutation] = useMutation(login)
  const router = useRouter()

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
      const { email, password } = values
      // const res = await signIn('credentials', { todo: auth
      //   redirect: false,
      //   email,
      //   password,
      // });
      // if (res?.ok) {
      //   // todo
      // } else {
      //   // todo
      // }
    }
  }
  // AUTHORIZATION ENDS
  return (
    <>
      <Divider
        style={{
          width: "100%",
        }}
        labelProps={{ size: "md" }}
        size="sm"
        mb="md"
        label={<Text color={dark ? "white" : "dark"}>Or Login with Email</Text>}
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
            <PasswordInput
              required
              label={t("password")}
              placeholder={t("password")}
              {...authorizationForm.getInputProps("password")}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" mb="md">
          <Button variant="subtle" size="sm" compact color="blue">
            Forgot your password?
          </Button>
        </Group>
        <Button size="md" color="blue" fullWidth type="submit" my="sm">
          Login
        </Button>
        <Group position="center">
          <Text>{t("notAMemberYet")}</Text>
          <Button variant="subtle" color="blue" compact onClick={onSignup}>
            Sign up
          </Button>
        </Group>
      </form>
    </>
  )
}

export default LoginForm

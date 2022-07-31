import { PromiseReturnType } from "blitz"
import signup from "app/auth/mutations/signup"
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
  Anchor,
  Checkbox,
} from "@mantine/core"
import { useTranslation, Trans } from "next-i18next"
import { useRouter } from "next/router"

type SignupFormProps = {
  onSuccess?: () => void
  onLogin: () => void
}
interface IRegisterValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  termsOfService: boolean
}

export const SignupForm = ({ onSuccess, onLogin }: SignupFormProps) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("common")
  const [signupMutation] = useMutation(signup)
  const router = useRouter()

  // REGISTRATION STARTS
  const registrationForm = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must contain at least 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  })

  const handleSignup = async (values: IRegisterValues) => {
    const validation = registrationForm.validate()
    if (!validation.hasErrors) {
      try {
        await signupMutation(values)
      } catch (error: any) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          // This error comes from Prisma
          registrationForm.setErrors({
            email: "This email is already being used",
          })
          return
        } else {
          return error.toString()
        }
      }
      onSuccess && onSuccess()
    }
  }
  // REGISTRATION ENDS
  return (
    <>
      <Divider
        style={{
          width: "100%",
        }}
        labelProps={{ size: "md" }}
        size="sm"
        mb="md"
        label={<Text color={dark ? "white" : "dark"}>Or Signup with Email</Text>}
        labelPosition="center"
        color={dark ? "gray" : "dark"}
      />
      <form
        style={{ width: "100%" }}
        onSubmit={registrationForm.onSubmit((values) => {
          void handleSignup(values)
        })}
      >
        <Grid style={{ width: "100%" }} mb="xs" mx={0} grow gutter="xs">
          <Grid.Col span={12}>
            <TextInput
              {...registrationForm.getInputProps("name")}
              label={t("name")}
              placeholder="Olivia Smith"
              required
              value={registrationForm.values.name}
              onChange={(event) =>
                registrationForm.setFieldValue("name", event.currentTarget.value)
              }
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              {...registrationForm.getInputProps("email")}
              label={t("email")}
              placeholder="oliviasmith@gmail.com"
              required
              value={registrationForm.values.email}
              onChange={(event) =>
                registrationForm.setFieldValue("email", event.currentTarget.value)
              }
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <PasswordInput
              required
              label={t("password")}
              placeholder={t("password")}
              {...registrationForm.getInputProps("password")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <PasswordInput
              {...registrationForm.getInputProps("confirmPassword")}
              required
              label={t("confirmPassword")}
              placeholder={t("confirmPassword")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Checkbox
              {...registrationForm.getInputProps("termsOfService", { type: "checkbox" })}
              required
              color="blue"
              my="sm"
              size="sm"
              label={
                <Trans
                  i18nKey="components:termsOfServiceText"
                  components={{
                    termsOfService: (
                      <Anchor size="sm" color="blue" target="_blank" href="terms-of-service" />
                    ),
                    privacyPolicy: (
                      <Anchor size="sm" color="blue" target="_blank" href="privacy-policy" />
                    ),
                  }}
                >
                  {t("termsOfServiceText")}
                </Trans>
              }
            />
          </Grid.Col>
        </Grid>
        <Button size="md" color="blue" fullWidth type="submit" my="sm">
          Sign Up
        </Button>
        <Group position="center">
          <Text>{t("alreadyAMember")}</Text>
          <Button variant="subtle" color="blue" compact onClick={onLogin}>
            Sign in
          </Button>
        </Group>
      </form>
    </>
  )
}

export default SignupForm

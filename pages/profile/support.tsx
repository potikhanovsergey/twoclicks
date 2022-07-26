import {
  Title,
  Text,
  Space,
  Autocomplete,
  Grid,
  Stack,
  Textarea,
  Button,
  TextInput,
  Loader,
  Input,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { Suspense, useEffect } from "react"
import { MdAlternateEmail } from "react-icons/md"
import FileDropzone, { filesType } from "app/core/components/base/FileDropzone"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

interface IFormValues {
  email: string
  subject: string
  message: string
  images: filesType
}

const SupportForm = () => {
  const { t } = useTranslation("pagesProfileSupport")
  const supportForm = useForm<IFormValues>({
    initialValues: {
      email: "",
      subject: "",
      message: "",
      images: [],
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const user = useCurrentUser()

  useEffect(() => {
    if (user?.email && supportForm.values.email === "") {
      supportForm.setFieldValue("email", user.email)
    }
  }, [user])

  return (
    <form
      onSubmit={supportForm.onSubmit((values) => {
        supportForm.validate()
        console.log("Submitted", values)
      })}
    >
      <Stack spacing="lg" mb={36}>
        <Input.Wrapper label="E-mail" size="lg" required>
          <TextInput
            {...supportForm.getInputProps("email")}
            icon={<MdAlternateEmail />}
            placeholder={t("yourEmail")}
            size="lg"
            value={supportForm.values.email}
            onChange={(event) => supportForm.setFieldValue("email", event.currentTarget.value)}
          />
        </Input.Wrapper>
        <Autocomplete
          value={supportForm.values.subject}
          onChange={(value) => supportForm.setFieldValue("subject", value)}
          size="lg"
          required
          label={t("subject")}
          placeholder={t("subject")}
          data={[t("autocomplete1"), t("autocomplete2"), t("autocomplete3"), t("autocomplete4")]}
        />
        <Textarea
          value={supportForm.values.message}
          onChange={(event) => supportForm.setFieldValue("message", event.currentTarget.value)}
          placeholder={t("yourMessage")}
          label={t("yourMessage")}
          size="lg"
          minRows={4}
          required
        />
        <FileDropzone
          files={supportForm.values.images}
          onChange={(files: filesType) => supportForm.setFieldValue("images", files)}
          text={t("dropzoneText")}
          warning={t("dropzoneWarning")}
        />
      </Stack>
      <Button type="submit" variant="gradient" gradient={{ from: "indigo", to: "cyan" }} size="lg">
        {t("submitTheMessage")}
      </Button>
    </form>
  )
}

const ProfileSupport = () => {
  const { t } = useTranslation("pagesProfileSupport")
  return (
    <>
      <Grid>
        <Grid.Col span={7}>
          <Title order={1} mb="lg">
            {t("title")}
          </Title>
          <Text size="xl">{t("paragraph1")}</Text>
          <Space h={12} />
          <Text size="xl" component="span">
            {t("paragraph2")}
          </Text>
          <Space h={48} />
          <Suspense fallback={<Loader />}>
            <SupportForm />
          </Suspense>
        </Grid.Col>
      </Grid>
    </>
  )
}

ProfileSupport.getLayout = getProfileLayout()

export default ProfileSupport

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["pagesProfileSupport", "common"])),
    },
  }
}

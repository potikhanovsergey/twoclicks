import {
  Divider,
  Grid,
  Space,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  Button,
  Highlight,
  Container,
  useMantineTheme,
} from "@mantine/core"
import { useTranslation } from "next-i18next"
import { FaArrowRight } from "react-icons/fa"
import { BsBack } from "react-icons/bs"
import { MdSlowMotionVideo } from "react-icons/md"

const HomeHero = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const { t } = useTranslation("pagesHome")

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={6}>
          <Title
            sx={() => ({
              maxWidth: "746px",
            })}
            order={1}
            mb="md"
          >
            <Highlight
              highlight={["show", "your", "best", "jobs", "покажите", "ваши работы"]}
              sx={() => ({
                fontSize: 60,
                textTransform: "uppercase",
                lineHeight: 1.2,
              })}
              highlightStyles={(theme) => ({
                backgroundImage: theme.fn.linearGradient(
                  45,
                  theme.colors.violet[8],
                  theme.colors.red[4]
                ),
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              })}
            >
              {t("title")}
            </Highlight>
          </Title>
          <Space h="md" />
          <Divider
            size="lg"
            color={dark ? "gray" : "dark"}
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              maxWidth: "700px",
            })}
          />
          <Grid pt={48} gutter={96} style={{ maxWidth: "640px" }}>
            <Grid.Col span={6}>
              <Stack spacing={0}>
                <BsBack size={64} />
                <Text weight="bold" mt="lg" style={{ fontSize: 24 }}>
                  {t("amazingBuilder")}
                </Text>
                <Text size="xl">{t("easyWithOurConstructor")}</Text>
                <Space h={32} />
                <Button
                  radius="md"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "violet", to: "red" }}
                  rightIcon={<FaArrowRight />}
                >
                  {t("getStarted")}
                </Button>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing={0}>
                <BsBack size={64} />
                <Text weight="bold" mt="lg" style={{ fontSize: 24 }}>
                  {t("manyTemplates")}
                </Text>
                <Text size="xl">{t("chooseOrCreateANewOne")}</Text>
                <Space h={32} />
                <Button
                  rightIcon={<MdSlowMotionVideo />}
                  radius="md"
                  size="lg"
                  variant="outline"
                  color="violet"
                >
                  {t("watchDemo")}
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={5}>2</Grid.Col>
      </Grid>
    </Container>
  )
}

export default HomeHero

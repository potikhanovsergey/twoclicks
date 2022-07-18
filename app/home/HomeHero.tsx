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
} from "@mantine/core"
import { useTranslation } from "next-i18next"
import { FaArrowRight } from "react-icons/fa"
import { BsBack } from "react-icons/bs"
import { MdSlowMotionVideo } from "react-icons/md"
import HomeContainer from "./HomeContainter"

const HomeHero = () => {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  const { t } = useTranslation("pagesHome")

  return (
    <HomeContainer px={16}>
      <Grid>
        <Grid.Col span={6}>
          <Title
            sx={() => ({
              maxWidth: "746px",
            })}
            order={1}
            mb="md"
          >
            {/* {t('title')} */}
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
                  theme.colors.primary[5],
                  theme.colors.indigo[5]
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
                <BsBack size={72} />
                <Text weight="bold" mt="lg" style={{ fontSize: 24 }}>
                  {t("amazingBuilder")}
                </Text>
                <Text size="xl">{t("easyWithOurConstructor")}</Text>
                <Space h={32} />
                <Button
                  radius="md"
                  size="xl"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  rightIcon={<FaArrowRight />}
                >
                  {t("getStarted")}
                </Button>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing={0}>
                <BsBack size={72} />
                <Text weight="bold" mt="lg" style={{ fontSize: 24 }}>
                  {t("manyTemplates")}
                </Text>
                <Text size="xl">{t("chooseOrCreateANewOne")}</Text>
                <Space h={32} />
                <Button
                  rightIcon={<MdSlowMotionVideo />}
                  radius="md"
                  size="xl"
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
    </HomeContainer>
  )
}

export default HomeHero

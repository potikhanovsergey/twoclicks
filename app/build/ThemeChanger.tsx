import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import {
  useMantineTheme,
  Popover,
  Tooltip,
  ActionIcon,
  Text,
  LoadingOverlay,
  Stack,
  Button,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { ImSun } from "@react-icons/all-files/im/ImSun"
import { RiMoonClearFill } from "@react-icons/all-files/ri/RiMoonClearFill"
import updatePage from "app/build-pages/mutations/updatePage"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { BuildStore } from "store/build"
import { IPage } from "types"

const themeChangerVariants = [
  {
    label: "Website theme",
    value: "inherit",
  },
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
]

const ThemeChanger = observer(() => {
  const {
    data: { theme: pageTheme, id },
  } = BuildStore

  const [updatePageMutation, { isLoading }] = useMutation(updatePage)
  const session = useSession()
  const theme = useMantineTheme()

  const handleChangeTheme = async (newTheme) => {
    if (id) {
      let page
      if (session.userId) {
        page = await updatePageMutation({
          id,
          theme: newTheme,
        })
      }
      if (page) {
        BuildStore.data.theme = page.theme as IPage["theme"]
      } else if (!session.userId) {
        BuildStore.data.theme = newTheme
      }
    }
  }

  const { hovered, ref } = useHover<HTMLButtonElement>()
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation("build")
  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Tooltip
          label={t("pageTheme")}
          position="bottom"
          withArrow
          opened={hovered && !opened}
          onClick={() => setOpened((o) => !o)}
        >
          <ActionIcon color="dark" ref={ref}>
            {pageTheme === "light" || (pageTheme === "inherit" && theme.colorScheme === "light") ? (
              <ImSun width={20} height={20} />
            ) : (
              <RiMoonClearFill width={20} height={20} />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown p={8}>
        <LoadingOverlay visible={isLoading} loaderProps={{ size: 16 }} />
        <Text weight="bold" mb={4}>
          {t("pageTheme")}
        </Text>
        <Stack spacing={4}>
          {themeChangerVariants.map((item) => (
            <Button
              compact
              fullWidth
              key={item.value}
              disabled={item.value === pageTheme}
              onClick={() => handleChangeTheme(item.value)}
            >
              {t(item.label)}
            </Button>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
})

export default ThemeChanger

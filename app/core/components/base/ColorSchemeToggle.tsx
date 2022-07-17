import { ActionIcon, Tooltip, ColorScheme } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import { useTranslation } from "next-i18next"

function ColorSchemeToggle() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
  }

  const { t } = useTranslation("common")
  return (
    <Tooltip label={t("switchTheme")} withArrow tooltipId="Switch theme tooltip">
      <ActionIcon
        aria-describedby="Switch theme tooltip"
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
          color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
          ":hover": {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
          },
        })}
      >
        {colorScheme === "dark" ? (
          <BsFillSunFill width={20} height={20} />
        ) : (
          <BsFillMoonStarsFill width={20} height={20} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}

export default ColorSchemeToggle

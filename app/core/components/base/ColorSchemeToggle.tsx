import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import { useTranslation } from "next-i18next"

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { t } = useTranslation("common")
  return (
    <Tooltip label={t("switchTheme")} withArrow id="Switch theme tooltip">
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

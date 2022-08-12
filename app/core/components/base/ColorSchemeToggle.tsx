import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import { useTranslation } from "next-i18next"

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { t } = useTranslation("common")
  return (
    <Tooltip label={t("switchTheme")} withArrow id="Switch theme tooltip" color="violet">
      <ActionIcon
        aria-describedby="Switch theme tooltip"
        onClick={() => toggleColorScheme()}
        size="lg"
        color="violet"
        variant="filled"
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

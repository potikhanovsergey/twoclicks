import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core"
import { BsFillMoonStarsFill } from "react-icons/bs"
import useTranslation from "next-translate/useTranslation"
import { ImSun } from "react-icons/im"
import { memo } from "react"

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { t } = useTranslation("common")
  return (
    <Tooltip label={t("switchTheme")} withArrow position="bottom">
      <ActionIcon
        aria-describedby="Switch theme tooltip"
        onClick={() => toggleColorScheme()}
        size="lg"
        color={colorScheme === "dark" ? "dark.4" : "gray"}
        variant={colorScheme === "dark" ? "filled" : "light"}
      >
        {colorScheme === "dark" ? (
          <ImSun width={20} height={20} />
        ) : (
          <BsFillMoonStarsFill width={20} height={20} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}

export default memo(ColorSchemeToggle)

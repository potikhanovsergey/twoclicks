import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { memo } from "react"

import { RiMoonClearFill } from "@react-icons/all-files/ri/RiMoonClearFill"
import { ImSun } from "@react-icons/all-files/im/ImSun"

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { t } = useTranslation("common")
  return (
    <Tooltip label={t("switchTheme")} withArrow position="bottom">
      <ActionIcon
        aria-describedby="Switch theme tooltip"
        onClick={() => toggleColorScheme()}
        size="lg"
        color="dark.4"
        variant="filled"
      >
        {colorScheme === "dark" ? (
          <ImSun width={20} height={20} />
        ) : (
          <RiMoonClearFill width={20} height={20} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}

export default memo(ColorSchemeToggle)

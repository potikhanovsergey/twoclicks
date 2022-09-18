import { ActionIcon, Divider, Menu, Tooltip, useMantineColorScheme } from "@mantine/core"
import { useClickOutside, useDisclosure, useHover, useLocalStorage } from "@mantine/hooks"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { languages } from "../../../../public/languages"
import setLanguage from "next-translate/setLanguage"

import { IoLanguageSharp } from "@react-icons/all-files/io5/IoLanguageSharp"

const LanguageSwitcher = () => {
  const { t } = useTranslation("common")
  const [locale, setLocale] = useLocalStorage({
    key: "locale",
    defaultValue: "ru",
  })
  const changeLocale = async (l: string) => {
    setLocale(l)
    await setLanguage(l)
  }
  const { hovered: tooltipHovered, ref: tooltipRef } = useHover<HTMLButtonElement>()
  const [tooltipOpened, setTooltipOpened] = useState(false)
  const [menuOpened, menuOpenedHandlers] = useDisclosure(false)
  const clickOutsideMenuRef = useClickOutside(() => menuOpenedHandlers.close())

  const { colorScheme } = useMantineColorScheme()

  useEffect(() => {
    if (!menuOpened) {
      setTooltipOpened(tooltipHovered)
    } else {
      setTooltipOpened(false)
    }
  }, [tooltipHovered, menuOpened])

  return (
    <Tooltip
      opened={tooltipOpened}
      transitionDuration={100}
      label={t("changeLocale")}
      withArrow
      id="Change language tooltip"
      position="bottom"
    >
      <div ref={clickOutsideMenuRef}>
        <Menu
          aria-describedby="Change language tooltip"
          withArrow
          closeOnItemClick={false}
          withinPortal={false}
          opened={menuOpened}
          onOpen={() => {
            menuOpenedHandlers.open()
            setTooltipOpened(false)
          }}
          onClose={menuOpenedHandlers.close}
          position="bottom"
          width={128}
        >
          <Menu.Target>
            <ActionIcon
              ref={tooltipRef}
              onClick={() => 1}
              size="lg"
              color={colorScheme === "dark" ? "dark.4" : "gray"}
              variant={colorScheme === "dark" ? "filled" : "light"}
            >
              <IoLanguageSharp />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{t("language")}</Menu.Label>
            {Object.keys(languages)
              .filter((l: string) => l !== locale)
              .map(
                (
                  l: string,
                  i: number // TODO: i18n
                ) => (
                  <Menu.Item
                    key={l}
                    onClick={() => changeLocale(l)}
                    title={`Сменить язык на ${languages[l]}`}
                  >
                    {languages[l]}
                  </Menu.Item>
                )
              )}
            <Divider />
            <Menu.Label>{languages[locale || "ru"]}</Menu.Label>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Tooltip>
  )
}

export default LanguageSwitcher

import { ActionIcon, Divider, Menu, Tooltip } from "@mantine/core"
import { useClickOutside, useDisclosure, useHover, useLocalStorage } from "@mantine/hooks"
import { i18n, useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IoLanguageSharp } from "react-icons/io5"
import { languages } from "../../../../public/languages"

const LanguageSwitcher = () => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const { pathname, asPath, query } = router
  const [, setLocale] = useLocalStorage({ key: "locale", defaultValue: i18n?.language || "ru" })
  const changeLocale = (l: string) => {
    setLocale(l)
    void router.push({ pathname, query }, asPath, { locale: l })
  }
  const { hovered: tooltipHovered, ref: tooltipRef } = useHover<HTMLButtonElement>()
  const [tooltipOpened, setTooltipOpened] = useState(false)
  const [menuOpened, menuOpenedHandlers] = useDisclosure(false)
  const clickOutsideMenuRef = useClickOutside(() => menuOpenedHandlers.close())

  useEffect(() => {
    if (!menuOpened) {
      setTooltipOpened(tooltipHovered)
    } else {
      setTooltipOpened(false)
    }
  }, [tooltipHovered])

  return (
    <Tooltip
      opened={tooltipOpened}
      transitionDuration={100}
      label={t("changeLocale")}
      withArrow
      id="Change language tooltip"
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
        >
          <Menu.Target>
            <ActionIcon
              ref={tooltipRef}
              onClick={() => 1}
              size="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
                ":hover": {
                  backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
                },
              })}
            >
              <IoLanguageSharp />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{t("language")}</Menu.Label>
            {Object.keys(languages)
              .filter((l: string) => l !== i18n?.language)
              .map(
                (
                  l: string,
                  i: number // TODO: i18n
                ) => (
                  <Menu.Item
                    key={i}
                    onClick={() => changeLocale(l)}
                    title={`Сменить язык на ${languages[l]}`}
                  >
                    {languages[l]}
                  </Menu.Item>
                )
              )}
            <Divider />
            <Menu.Label>{languages[i18n?.language || "ru"]}</Menu.Label>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Tooltip>
  )
}

export default LanguageSwitcher

import {
  ActionIcon,
  Menu,
  ScrollArea,
  SimpleGrid,
  TextInput,
  Tooltip,
  Text,
  MenuProps,
  useMantineColorScheme,
  Box,
  ActionIconProps,
  Button,
} from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { serialize } from "helpers"
import useTranslation from "next-translate/useTranslation"
import { ReactNode, useMemo, useState } from "react"
import { MdClear } from "@react-icons/all-files/md/MdClear"

const IoClose = dynamic(() =>
  import("@react-icons/all-files/io5/IoClose").then((module) => module.IoClose)
)

const FaStar = dynamic(() =>
  import("@react-icons/all-files/fa/FaStar").then((module) => module.FaStar)
)
const FaPlay = dynamic(() =>
  import("@react-icons/all-files/fa/FaPlay").then((module) => module.FaPlay)
)
const FaVenus = dynamic(() =>
  import("@react-icons/all-files/fa/faVenus").then((module) => module.FaVenus)
)

import dynamic from "next/dynamic"

const icons = { IoClose, FaPlay, FaStar, FaVenus }
const FirstIcon = Object.values(icons)[0]

const formatOutput = (icon: JSX.Element) => {
  return JSON.parse(serialize(icon))?.type
}

export interface IconPickerProps {
  icon: ReactNode
  onChange: (ReactNode) => void
  menuProps?: MenuProps
  isThemeIcon?: boolean
  themeIconProps?: Partial<ActionIconProps>
  withReset?: boolean
  onReset?: () => void
}

const IconPicker = ({
  icon = <FirstIcon />,
  onChange,
  menuProps,
  isThemeIcon,
  themeIconProps,
  withReset,
  onReset,
}: IconPickerProps) => {
  const [searchValue, setSearchValue] = useState("")

  const [debouncedSearchValue] = useDebouncedValue(searchValue, 200)

  const filteredIcons = useMemo(() => {
    const output = Object.entries(icons)
      .filter(([name]) => name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
      .map(([name, Icon]) => (
        <ActionIcon
          onClick={() => {
            console.log("CLICK", Icon, <Icon />)
            const output = formatOutput(<Icon />)
            console.log("OUTPUT", output)
            onChange(output)
          }}
          key={name}
        >
          <Icon />
        </ActionIcon>
      ))
    return output
  }, [debouncedSearchValue])

  const { colorScheme } = useMantineColorScheme()
  const { t } = useTranslation("pagesBuild")

  return (
    <Menu
      width={256}
      zIndex={501}
      styles={{
        dropdown: {
          overflow: "hidden",
          display: "flex",
          height: "auto",
          flexDirection: "column",
        },
      }}
      withinPortal
      {...menuProps}
    >
      <Menu.Target>
        {isThemeIcon ? (
          <ActionIcon {...themeIconProps}>{icon}</ActionIcon>
        ) : (
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "all",
            }}
          >
            {icon}
          </Box>
        )}
      </Menu.Target>
      <Menu.Dropdown>
        {withReset && (
          <Button variant="light" compact my="xs" onClick={onReset} rightIcon={<IoClose />}>
            {t("reset icon")}
          </Button>
        )}
        <TextInput
          rightSection={
            searchValue.length ? (
              <Tooltip position="top" label="Clear search" withinPortal withArrow>
                <ActionIcon
                  onClick={() => {
                    setSearchValue("")
                  }}
                >
                  <MdClear />
                </ActionIcon>
              </Tooltip>
            ) : undefined
          }
          placeholder={t("search icon")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
        <ScrollArea.Autosize maxHeight={128} offsetScrollbars>
          {filteredIcons.length ? (
            <SimpleGrid spacing={4} cols={8} py={8} pl={4} pr={12}>
              {filteredIcons}
            </SimpleGrid>
          ) : (
            <Text align="center" py={8} color={colorScheme === "dark" ? "gray" : "dark"}>
              {t("no icons found")}
            </Text>
          )}
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  )
}

export default IconPicker

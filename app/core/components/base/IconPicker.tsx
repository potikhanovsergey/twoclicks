import {
  ActionIcon,
  Group,
  Input,
  Menu,
  ScrollArea,
  SimpleGrid,
  TextInput,
  Tooltip,
  Text,
  LoadingOverlay,
  MenuProps,
  useMantineColorScheme,
  Box,
  ActionIconProps,
  ThemeIconProps,
  ThemeIcon,
  Button,
} from "@mantine/core"
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks"
import { serialize } from "helpers"
import { ReactNode, useEffect, useMemo, useState } from "react"
import * as icons from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { MdClear } from "react-icons/md"

const FirstIcon = Object.values(icons)[0]

const formatOutput = (icon: JSX.Element) => {
  return JSON.parse(serialize(icon))?.type
}

const IconPicker = ({
  icon = <FirstIcon />,
  onChange,
  menuProps,
  isThemeIcon,
  themeIconProps,
  withReset,
  onReset,
}: {
  icon: ReactNode
  onChange: (ReactNode) => void
  menuProps?: MenuProps
  isThemeIcon?: boolean
  themeIconProps?: Partial<ActionIconProps>
  withReset?: boolean
  onReset?: () => void
}) => {
  const [searchValue, setSearchValue] = useState("")

  const [debouncedSearchValue] = useDebouncedValue(searchValue, 200)

  const filteredIcons = useMemo(() => {
    const output = Object.entries(icons)
      .filter(([name]) => name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
      .map(([name, Icon]) => (
        <ActionIcon key={name} onClick={() => onChange(formatOutput(<Icon />))}>
          <Icon />
        </ActionIcon>
      ))
    return output
  }, [debouncedSearchValue])

  const { colorScheme } = useMantineColorScheme()

  return (
    <Menu
      width={256}
      zIndex={301}
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
            Reset icon
          </Button>
        )}
        <TextInput
          rightSection={
            searchValue.length ? (
              <Tooltip color="violet" position="top" label="Clear search" withinPortal withArrow>
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
          placeholder="Search icon..."
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
              No icons found
            </Text>
          )}
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  )
}

export default IconPicker

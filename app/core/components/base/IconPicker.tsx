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
} from "@mantine/core"
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks"
import { useEffect, useMemo, useState } from "react"
import * as icons from "react-icons/fa"
import { MdClear } from "react-icons/md"

const FirstIcon = Object.values(icons)[0]

const IconPicker = () => {
  const [icon, setIcon] = useState(<FirstIcon />)
  const [searchValue, setSearchValue] = useState("")

  const [debouncedSearchValue] = useDebouncedValue(searchValue, 200)

  const filteredIcons = useMemo(() => {
    const output = Object.entries(icons)
      .filter(([name]) => name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
      .map(([name, Icon]) => (
        <ActionIcon key={name} onClick={() => setIcon(<Icon />)}>
          <Icon />
        </ActionIcon>
      ))
    return output
  }, [debouncedSearchValue])

  return (
    <Menu
      width={256}
      styles={{
        dropdown: {
          overflow: "hidden",
          display: "flex",
          height: "auto",
          flexDirection: "column",
        },
      }}
      closeOnClickOutside
    >
      <Menu.Target>
        <ActionIcon>{icon}</ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
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
            <Text align="center" py={8}>
              No icons found
            </Text>
          )}
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  )
}

export default IconPicker

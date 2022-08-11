import { Switch, Tooltip, Text } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { useState } from "react"

const TogglePublishPortfilio = () => {
  const [checked, setChecked] = useState(false)
  const { hovered: switchHovered, ref: wrapperRef } = useHover()
  return (
    <Tooltip
      label={checked ? "Hide your portfolio" : "Publish your portfilio"}
      withArrow
      position="bottom"
      color="violet"
      opened={switchHovered}
    >
      <Switch
        wrapperProps={{ ref: wrapperRef }}
        radius="xl"
        color="violet"
        label={
          <Text
            sx={(theme) => ({ color: theme.colorScheme === "dark" ? theme.white : theme.black })}
          >
            Publish
          </Text>
        }
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </Tooltip>
  )
}

export default TogglePublishPortfilio

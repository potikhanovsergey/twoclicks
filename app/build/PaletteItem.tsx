import { Popover, ColorSwatch, ColorPicker } from "@mantine/core"
import { useState } from "react"

interface IPaletteItem {
  color: {
    value: string
  }
}

const PaletteItem = ({ color }: IPaletteItem) => {
  const [viewColor, setViewColor] = useState(color)
  return (
    <Popover width={200} position="bottom" shadow="md" styles={{ dropdown: { padding: 0 } }}>
      <Popover.Target>
        <ColorSwatch radius="xs" size={20} color={viewColor.value} style={{ cursor: "pointer" }} />
      </Popover.Target>
      <Popover.Dropdown>
        <ColorPicker
          value={viewColor.value}
          onChange={(c) => setViewColor({ value: c })}
          styles={{ wrapper: { padding: 0 } }}
        />
      </Popover.Dropdown>
    </Popover>
  )
}

export default PaletteItem

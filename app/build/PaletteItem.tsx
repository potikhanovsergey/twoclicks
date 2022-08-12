import { Popover, ColorSwatch, ColorPicker, useMantineTheme } from "@mantine/core"
import { FloatingPosition } from "@mantine/core/lib/Floating"
import { getHexFromThemeColor, getThemeColorValueArray } from "helpers"
import { useState, useMemo } from "react"
interface IPaletteItem {
  color: string
  onChange: (value: string) => void
  popoverPosition?: FloatingPosition
}

const PaletteItem = ({ color, onChange, popoverPosition = "bottom" }: IPaletteItem) => {
  const theme = useMantineTheme()

  const [colorValueArray] = useState(getThemeColorValueArray({ theme }))
  const swatches = useMemo(() => {
    return colorValueArray.map((item) => item.value)
  }, [colorValueArray])

  const hexColor = useMemo(() => {
    return getHexFromThemeColor({ theme, color })
  }, [color])
  return (
    <Popover width={200} position={popoverPosition} shadow="md">
      <Popover.Target>
        <ColorSwatch radius="xs" size={20} color={hexColor} style={{ cursor: "pointer" }} />
      </Popover.Target>
      <Popover.Dropdown py={4} px={8}>
        <ColorPicker
          size="xl"
          withPicker={false}
          swatchesPerRow={8}
          fullWidth
          swatches={swatches}
          value={hexColor}
          onChange={(value) =>
            onChange(colorValueArray.find?.((item) => item.value === value)?.color || value)
          }
        />
      </Popover.Dropdown>
    </Popover>
  )
}

export default PaletteItem

import { Popover, ColorSwatch, ColorPicker, useMantineTheme, PopoverProps } from "@mantine/core"
import { FloatingPosition } from "@mantine/core/lib/Floating"
import { getHexFromThemeColor, getThemeColorValueArray } from "helpers"
import { useState, useMemo } from "react"
interface IPaletteItem extends Omit<PopoverProps, "children"> {
  color: string
  onColorChange: (value: string) => void
  popoverPosition?: FloatingPosition
}

const PaletteItem = (props: IPaletteItem) => {
  const theme = useMantineTheme()

  const { color, onColorChange, popoverPosition, ...popoverProps } = props

  const [colorValueArray] = useState(getThemeColorValueArray({ theme }))
  const swatches = useMemo(() => {
    return colorValueArray.map((item) => item.value)
  }, [colorValueArray])

  const hexColor = useMemo(() => {
    return getHexFromThemeColor({ theme, color })
  }, [color])
  return (
    <Popover width={200} position={popoverPosition || "bottom"} shadow="md" {...popoverProps}>
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
            onColorChange(colorValueArray.find?.((item) => item.value === value)?.color || value)
          }
        />
      </Popover.Dropdown>
    </Popover>
  )
}

export default PaletteItem

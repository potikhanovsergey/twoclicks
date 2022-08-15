import {
  Popover,
  ColorSwatch,
  ColorPicker,
  useMantineTheme,
  PopoverProps,
  Box,
} from "@mantine/core"
import { FloatingPosition } from "@mantine/core/lib/Floating"
import { getHexFromThemeColor, getThemeColorValueArray } from "helpers"
import { useState, useMemo } from "react"
interface IPaletteItem extends Omit<PopoverProps, "children"> {
  color: string
  onColorChange: (value: string) => void
  popoverPosition?: FloatingPosition
  onPopoverMouseLeave?: () => void
  onPopoverMouseEnter?: () => void
}

const PaletteItem = (props: IPaletteItem) => {
  const theme = useMantineTheme()

  const {
    color,
    onColorChange,
    popoverPosition,
    onPopoverMouseLeave,
    onPopoverMouseEnter,
    ...popoverProps
  } = props

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
      <Popover.Dropdown p={0}>
        <Box py={4} px={8} onMouseLeave={onPopoverMouseLeave} onMouseEnter={onPopoverMouseEnter}>
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
        </Box>
      </Popover.Dropdown>
    </Popover>
  )
}

export default PaletteItem

import {
  Popover,
  ColorSwatch,
  ColorPicker,
  DEFAULT_THEME,
  useMantineTheme,
  MantineTheme,
} from "@mantine/core"
import { getHexesFromThemeColors, getHexFromThemeColor, getThemeColorValueArray } from "helpers"
import { useMemo, useState } from "react"
import { BuildStore } from "store/build"
interface IPaletteItem {
  color: string
  paletteKey: string
}

const PaletteItem = ({ color, paletteKey }: IPaletteItem) => {
  const theme = useMantineTheme()
  const { changeColor } = BuildStore

  const colorValue = getHexFromThemeColor({ theme, color })
  const [colorValueArray] = useState(getThemeColorValueArray({ theme }))
  const swatches = useMemo(() => {
    return colorValueArray.map((item) => item.value)
  }, [colorValueArray])
  return (
    <Popover width={200} position="bottom" shadow="md">
      <Popover.Target>
        <ColorSwatch radius="xs" size={20} color={colorValue} style={{ cursor: "pointer" }} />
      </Popover.Target>
      <Popover.Dropdown py={4} px={8}>
        <ColorPicker
          size="xl"
          withPicker={false}
          swatchesPerRow={8}
          fullWidth
          swatches={swatches}
          value={colorValue}
          onChange={(value) => {
            changeColor({
              paletteKey,
              value: colorValueArray.find?.((item) => item.value === value)?.color || value,
            })
          }}
        />
      </Popover.Dropdown>
    </Popover>
  )
}

export default PaletteItem

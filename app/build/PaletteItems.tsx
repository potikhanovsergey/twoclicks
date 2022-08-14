import { Group, Text, useMantineTheme } from "@mantine/core"
import { getHexFromThemeColor, getThemeColorValueArray } from "helpers"
import { observer } from "mobx-react-lite"
import { useState, useMemo } from "react"
import { BuildStore } from "store/build"
import PaletteItem from "./PaletteItem"

const PaletteItems = () => {
  const {
    data: { palette },
    changePalette,
  } = BuildStore

  return (
    <Group spacing={8} align="center">
      <Text size="sm">Palette:</Text>
      {palette && (
        <Group spacing={4}>
          {Object.keys(palette).map((paletteKey, i) => {
            return palette?.[paletteKey] ? (
              <PaletteItem
                color={palette[paletteKey]}
                key={paletteKey}
                onColorChange={(value) => {
                  changePalette({
                    paletteKey,
                    value,
                  })
                }}
              />
            ) : (
              <></>
            )
          })}
        </Group>
      )}
    </Group>
  )
}

export default observer(PaletteItems)

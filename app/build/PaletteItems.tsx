import { Group, Text, useMantineTheme } from "@mantine/core"
import { getThemeColorValueArray } from "helpers"
import { observer } from "mobx-react-lite"
import { BuildStore } from "store/build"
import PaletteItem from "./PaletteItem"

const PaletteItems = () => {
  const {
    data: { palette },
  } = BuildStore
  return (
    <Group spacing={8} align="center">
      <Text size="sm">Palette:</Text>
      {palette && (
        <Group spacing={4}>
          {Object.keys(palette).map((cKey, i) => {
            return palette?.[cKey] ? (
              <PaletteItem color={palette[cKey]} paletteKey={cKey} key={i} />
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

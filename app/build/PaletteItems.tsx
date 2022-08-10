import { Group, Text, useMantineTheme } from "@mantine/core"
import { getThemeColorValueArray } from "helpers"
import { observer } from "mobx-react-lite"
import { BuildStore } from "store/build"
import PaletteItem from "./PaletteItem"

const PaletteItems = () => {
  const {
    data: { colors },
  } = BuildStore
  return (
    <Group spacing={8} align="center">
      <Text size="sm">Palette:</Text>
      {colors && (
        <Group spacing={4}>
          {Object.keys(colors).map((cKey, i) => {
            return colors?.[cKey] ? (
              <PaletteItem color={colors[cKey]} paletteKey={cKey} key={i} />
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

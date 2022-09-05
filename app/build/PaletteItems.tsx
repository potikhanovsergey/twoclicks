import { Group, Text } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"
import PaletteItem from "./PaletteItem"

const PaletteItems = () => {
  const {
    data: { palette },
    changePalette,
  } = BuildStore

  const { t } = useTranslation("pagesBuild")
  return (
    <Group spacing={8} align="center">
      <Text size="sm">{t("palette")}:</Text>
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

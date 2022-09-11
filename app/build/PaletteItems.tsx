import { Group, Text, Tooltip } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { BuildStore } from "store/build"
import PaletteItem from "./PaletteItem"

const PaletteTooltips = {
  primary: "Color for non-gradient buttons, icons and text selection",
}

const PaletteItems = () => {
  const {
    data: { palette },
    changePalette,
  } = BuildStore

  const { t } = useTranslation("pagesBuild")

  const { hovered: itemHovered, ref: itemRef } = useHover()
  const [paletteOpened, setPaletteOpened] = useState(false)
  return (
    <Group spacing={8} align="center">
      <Text size="sm">{t("palette")}:</Text>
      {palette && (
        <Group spacing={4}>
          {Object.keys(palette).map((paletteKey, i) => {
            return palette?.[paletteKey] && PaletteTooltips[paletteKey] ? (
              <Tooltip
                label={PaletteTooltips[paletteKey]}
                position="bottom"
                opened={itemHovered && !paletteOpened}
                width={256}
                multiline
              >
                <div ref={itemRef}>
                  <PaletteItem
                    onChange={setPaletteOpened}
                    color={palette[paletteKey]}
                    key={paletteKey}
                    onColorChange={(value) => {
                      changePalette({
                        paletteKey,
                        value,
                      })
                    }}
                  />
                </div>
              </Tooltip>
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

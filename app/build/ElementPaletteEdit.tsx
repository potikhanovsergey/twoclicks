import { Tooltip, Box, useMantineTheme } from "@mantine/core"
import { getPaletteByType, getHexFromThemeColor } from "helpers"
import { observer } from "mobx-react-lite"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import PaletteItem from "./PaletteItem"

interface IElementPaletteEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
  element?: ICanvasBlock
}

const ElementPaletteEdit = ({ type, props, id, element }: IElementPaletteEdit) => {
  const paletteKey = type ? getPaletteByType(type) : undefined
  const theme = useMantineTheme()

  const {
    data: { palette },
    changeProp,
    openedAction,
  } = BuildStore
  return paletteKey && props?.variant !== "gradient" && props?.[paletteKey.prop] ? (
    <Tooltip label="Change color" color="violet" withArrow>
      <Box sx={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
        <PaletteItem
          currentPaletteColor={
            palette?.[paletteKey.color]
              ? getHexFromThemeColor({
                  theme,
                  color: palette?.[paletteKey.color],
                })
              : undefined
          }
          defaultOpened={openedAction?.[id] === "palette"}
          onOpen={() => {
            BuildStore.openedAction[id] = "palette"
          }}
          onClose={() => (BuildStore.openedAction = {})}
          popoverPosition="top"
          offset={6}
          color={getHexFromThemeColor({
            theme,
            color: props?.[paletteKey.prop],
          })}
          withReset={element?.props?.[paletteKey.prop] !== undefined}
          onColorChange={(value) => {
            changeProp({
              id,
              newProps: { [paletteKey.prop]: value },
            })
          }}
          onResetClick={() => {
            changeProp({
              id,
              newProps: { [paletteKey.prop]: "undefined" },
            })
          }}
        />
      </Box>
    </Tooltip>
  ) : (
    <></>
  )
}

export default observer(ElementPaletteEdit)

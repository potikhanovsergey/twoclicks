import { Tooltip, Box, useMantineTheme, ThemeIcon, ActionIcon } from "@mantine/core"
import { getPaletteByType, getHexFromThemeColor, textElements } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
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

  const isTextElement = useMemo(() => {
    if (!type) return false
    return textElements.some((el) => type.includes(el))
  }, [type])

  const { t } = useTranslation("build")
  return paletteKey && props?.variant !== "gradient" ? (
    <Tooltip label={t("change color")} color="violet" withArrow>
      <div>
        <PaletteItem
          withHover
          currentPaletteColor={
            !isTextElement
              ? palette?.[paletteKey.color]
                ? getHexFromThemeColor({
                    theme,
                    color: palette?.[paletteKey.color],
                  })
                : undefined
              : undefined
          }
          onTargetClick={() => (BuildStore.openedAction[id] = "palette")}
          opened={openedAction?.[id] === "palette"}
          popoverPosition="top"
          offset={0}
          color={getHexFromThemeColor({
            theme,
            color: props?.[paletteKey.prop],
          })}
          type={type}
          resetText={isTextElement ? "Opposite to theme" : undefined}
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
      </div>
    </Tooltip>
  ) : (
    <></>
  )
}

export default observer(ElementPaletteEdit)

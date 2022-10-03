import { Tooltip, useMantineTheme } from "@mantine/core"
import { getPaletteByType, getHexFromThemeColor, textElements } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"
import PaletteItem from "./PaletteItem"

interface IElementPaletteEdit {
  element: ICanvasBlock
}

const ElementPaletteEdit = ({ element }: IElementPaletteEdit) => {
  const paletteKey = element.type ? getPaletteByType(element.type) : undefined
  const theme = useMantineTheme()

  const {
    data: { palette },
    changeProp,
    openedAction,
  } = BuildStore

  const isTextElement = useMemo(() => {
    if (!element.type) return false
    return textElements.some((el) => element.type.includes(el))
  }, [element])

  const { t } = useTranslation("build")
  return paletteKey && element.props?.variant !== "gradient" ? (
    <Tooltip label={t("change color")} withArrow>
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
          onTargetClick={() => {
            if (BuildStore.openedAction[element.id] === "palette") {
              delete BuildStore.openedAction[element.id]
            } else {
              BuildStore.openedAction[element.id] = "palette"
            }
          }}
          opened={openedAction?.[element.id] === "palette"}
          popoverPosition="top"
          offset={0}
          color={getHexFromThemeColor({
            theme,
            color: element.props?.[paletteKey.prop],
          })}
          type={element.type}
          resetText={isTextElement ? "Opposite to theme" : undefined}
          withReset={element?.props?.[paletteKey.prop] !== undefined}
          onColorChange={(value) => {
            changeProp({
              id: element.id,
              newProps: { [paletteKey.prop]: value },
            })
          }}
          onResetClick={() => {
            changeProp({
              id: element.id,
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

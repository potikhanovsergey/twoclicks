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
  const paletteKey = useMemo(() => {
    return element.type ? getPaletteByType(element.type) : undefined
  }, [element.type])
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

  const handleResetClick = () => {
    paletteKey &&
      changeProp({
        id: element.id,
        newProps: { [paletteKey.prop]: "undefined" },
      })
  }

  const handleColorChange = (value) => {
    paletteKey &&
      changeProp({
        id: element.id,
        newProps: { [paletteKey.prop]: value },
      })
  }

  const currentPaletteColor = useMemo(() => {
    if (!paletteKey) return undefined
    return !isTextElement
      ? palette?.[paletteKey.color]
        ? getHexFromThemeColor({
            theme,
            color: palette?.[paletteKey.color],
          })
        : undefined
      : undefined
  }, [isTextElement, palette, paletteKey, theme])

  const handleTargetClick = () => {
    if (BuildStore.openedAction[element.id] === "palette") {
      BuildStore.openedAction = {}
    } else {
      BuildStore.openedAction = {
        [element.id]: "palette",
      }
    }
  }

  const handleClose = () => {
    BuildStore.openedAction = {}
  }

  const color = useMemo(() => {
    if (!paletteKey) return "transparent"
    return getHexFromThemeColor({
      theme,
      color: element.props?.[paletteKey.prop],
    })
  }, [element.props, paletteKey, theme])

  const { t } = useTranslation("build")
  return paletteKey ? (
    <Tooltip label={t("change color")} withArrow>
      <div>
        <PaletteItem
          withHover
          currentPaletteColor={currentPaletteColor}
          onTargetClick={handleTargetClick}
          opened={openedAction?.[element.id] === "palette"}
          popoverPosition="top"
          offset={0}
          color={color}
          type={element.type}
          resetText={isTextElement ? "Opposite to theme" : undefined}
          withReset={element?.props?.[paletteKey.prop] !== undefined}
          onColorChange={handleColorChange}
          onClose={handleClose}
          onResetClick={handleResetClick}
        />
      </div>
    </Tooltip>
  ) : (
    <></>
  )
}

export default observer(ElementPaletteEdit)

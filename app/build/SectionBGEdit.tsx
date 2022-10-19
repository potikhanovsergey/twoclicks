import { Tooltip, useMantineTheme } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { ExtendedCustomColors } from "pages/_app"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { BuildStore } from "store/build"
import { ICanvasBlock } from "types"
import PaletteItem from "./PaletteItem"

interface ISectionBGEdit {
  element: ICanvasBlock
}

const SectionBGEdit = ({ element }: ISectionBGEdit) => {
  const theme = useMantineTheme()

  const { changeProp, openedAction } = BuildStore

  const { t } = useTranslation("build")
  const { hovered: itemHovered, ref: itemRef } = useHover()

  const changeColor = (value: ExtendedCustomColors | string) => {
    changeProp({
      id: element.id,
      newProps: {
        sx: {
          ...element.props?.sx,
          backgroundColor: Array.isArray(theme.colors[value]) ? theme.colors[value][5] : value,
        },
      },
    })
  }

  const pickerTimeout = useRef<NodeJS.Timeout | null>(null)

  const onImagePick = useCallback(
    (url) => {
      changeProp({
        id: element.id,
        newProps: {
          sx: {
            ...element.props?.sx,
            backgroundImage: `url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          },
        },
      })
    },
    [element.id]
  )

  const imageUpload = useMemo(() => {
    return {
      id: element.id,
      onImagePick,
    }
  }, [onImagePick])

  return (
    <Tooltip
      label={t("changeBackground")}
      withArrow
      position="left"
      opened={itemHovered && openedAction[element.id] !== "bg"}
    >
      <div ref={itemRef}>
        <PaletteItem
          withHover
          colorPickerProps={{
            withPicker: true,
            mt: "sm",
            size: "xs",
          }}
          opened={openedAction[element.id] === "bg"}
          onTargetClick={() => {
            if (BuildStore.openedAction[element.id] === "bg") {
              BuildStore.openedAction = {}
            } else {
              BuildStore.openedAction = {
                [element.id]: "bg",
              }
            }
          }}
          onClose={() => {
            BuildStore.openedAction = {}
          }}
          popoverPosition="top-end"
          offset={6}
          color={element.props?.sx?.backgroundColor}
          withReset={Boolean(element.props?.sx?.backgroundColor)}
          withImageDelete={Boolean(element.props?.sx?.backgroundImage)}
          onImageDelete={() => {
            changeProp({
              id: element.id,
              newProps: {
                sx: {
                  ...element.props?.sx,
                  backgroundImage: "undefined",
                },
              },
            })
          }}
          onColorChange={(value: ExtendedCustomColors | string) => {
            if (value.includes("#")) {
              pickerTimeout.current && clearTimeout(pickerTimeout.current)
              pickerTimeout.current = setTimeout(() => {
                changeColor(value)
              }, 100)
            } else {
              changeColor(value)
            }
          }}
          resetText={t("takeFromTheme")}
          hasBG={element.props?.sx?.backgroundImage}
          editType={element.editType}
          onResetClick={() => {
            changeProp({
              id: element.id,
              newProps: {
                sx: {
                  ...element.props?.sx,
                  backgroundColor: "undefined",
                },
              },
            })
          }}
          imageUpload={imageUpload}
        />
      </div>
    </Tooltip>
  )
}

export default observer(SectionBGEdit)

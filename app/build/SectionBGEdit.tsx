import { Tooltip, Box, useMantineTheme, ThemeIcon, ActionIcon } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { getPaletteByType, getHexFromThemeColor } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { ExtendedCustomColors } from "pages/_app"
import { useEffect, useState } from "react"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import PaletteItem from "./PaletteItem"

interface ISectionBGEdit {
  props?: ICanvasBlockProps
  id: string
  element?: ICanvasBlock
}

const SectionBGEdit = ({ props, id, element }: ISectionBGEdit) => {
  const theme = useMantineTheme()

  const { changeProp, openedAction } = BuildStore

  const { t } = useTranslation("pagesBuild")

  useEffect(() => {
    console.log("PROPS", props)
  }, [props])

  const { hovered: itemHovered, ref: itemRef } = useHover()

  return (
    <Tooltip
      label="Change background"
      color="violet"
      withArrow
      position="left"
      opened={itemHovered && openedAction[id] !== "bg"}
    >
      <div ref={itemRef}>
        <PaletteItem
          withHover
          // currentPaletteColor={
          //   palette?.[stz.color]
          //     ? getHexFromThemeColor({
          //         theme,
          //         color: palette?.[paletteKey.color],
          //       })
          //     : undefined
          // }
          defaultOpened={openedAction?.[id] === "bg"}
          onOpen={() => {
            BuildStore.openedAction[id] = "bg"
          }}
          onClose={() => {
            BuildStore.openedAction = {}
          }}
          popoverPosition="top"
          offset={6}
          color={props?.sx?.backgroundColor}
          withReset={Boolean(props?.sx?.background || props?.sx?.backgroundColor)}
          onColorChange={(value: ExtendedCustomColors) => {
            changeProp({
              id,
              newProps: {
                sx: {
                  ...props?.sx,
                  background: "undefined",
                  backgroundColor: theme.colors[value][5],
                },
              },
            })
          }}
          resetText="Remove background"
          hasBG={props?.sx?.background}
          onResetClick={() => {
            changeProp({
              id,
              newProps: {
                sx: {
                  ...props?.sx,
                  backgroundColor: "undefined",
                  background: "undefined",
                  backgroundSize: "undefined",
                },
              },
            })
          }}
          imageUpload={{
            id,
            onImagePick(url) {
              changeProp({
                id,
                newProps: {
                  sx: {
                    ...props?.sx,
                    backgroundColor: "undefined",
                    background: `url(${url}) no-repeat center`,
                    backgroundSize: "cover",
                  },
                },
              })
            },
          }}
        />
      </div>
    </Tooltip>
  )
}

export default observer(SectionBGEdit)

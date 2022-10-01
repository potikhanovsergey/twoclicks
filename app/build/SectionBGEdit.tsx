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
  editType?: string | null
}

const SectionBGEdit = ({ props, id, editType }: ISectionBGEdit) => {
  const theme = useMantineTheme()

  const { changeProp, openedAction } = BuildStore

  const { t } = useTranslation("build")
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
          opened={openedAction[id] === "bg"}
          // onOpen={() => {
          //   BuildStore.openedAction[id] = "bg"
          // }}
          onTargetClick={() => {
            BuildStore.openedAction[id] = "bg"
          }}
          onClose={() => {
            BuildStore.openedAction = {}
          }}
          popoverPosition="top-end"
          offset={6}
          color={props?.sx?.backgroundColor}
          withReset={Boolean(props?.sx?.backgroundImage || props?.sx?.backgroundColor)}
          withImageDelete={Boolean(props?.sx?.backgroundImage)}
          onImageDelete={() => {
            changeProp({
              id,
              newProps: {
                sx: {
                  ...props?.sx,
                  backgroundImage: undefined,
                },
              },
            })
          }}
          onColorChange={(value: ExtendedCustomColors | string) => {
            changeProp({
              id,
              newProps: {
                sx: {
                  ...props?.sx,
                  backgroundColor: Array.isArray(theme.colors[value])
                    ? theme.colors[value][5]
                    : value,
                },
              },
            })
          }}
          resetText="Take from theme"
          hasBG={props?.sx?.backgroundImage}
          editType={editType}
          middlewares={{ shift: false, flip: false }}
          onResetClick={() => {
            changeProp({
              id,
              newProps: {
                sx: {
                  ...props?.sx,
                  backgroundColor: undefined,
                  backgroundImage: undefined,
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
                    backgroundImage: `url(${url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
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

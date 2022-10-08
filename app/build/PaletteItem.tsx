import {
  Popover,
  ColorSwatch,
  ColorPicker,
  useMantineTheme,
  PopoverProps,
  Box,
  Button,
  FileButton,
  ColorPickerProps,
  TextInput,
} from "@mantine/core"
import { FloatingPosition } from "@mantine/core/lib/Floating"
import { getHexFromThemeColor, getThemeColorValueArray, isTextElement } from "helpers"
import useTranslation from "next-translate/useTranslation"
import { useState, useMemo, useEffect } from "react"
import { BuildStore } from "store/build"

import { BsFillImageFill } from "@react-icons/all-files/bs/BsFillImageFill"
import { useDebouncedValue } from "@mantine/hooks"
import UploadImageButton from "./UploadImageButton"

interface IPaletteItem extends Omit<PopoverProps, "children"> {
  color: string
  onColorChange: (value: string) => void
  popoverPosition?: FloatingPosition
  onPopoverMouseLeave?: () => void
  onPopoverMouseEnter?: () => void
  onResetClick?: () => void
  withReset?: boolean
  resetText?: string
  currentPaletteColor?: string
  withHover?: boolean
  hasBG?: boolean
  imageUpload?: {
    onImagePick: (value: string) => void
    id: string
  }
  type?: string | null
  editType?: string | null
  onTargetClick?: () => void
  withImageDelete?: boolean
  onImageDelete?: () => void
  colorPickerProps?: ColorPickerProps
}

const PaletteItem = (props: IPaletteItem) => {
  const theme = useMantineTheme()

  const {
    color,
    withReset = false,
    onColorChange,
    onResetClick,
    popoverPosition,
    onPopoverMouseLeave,
    onPopoverMouseEnter,
    currentPaletteColor,
    withHover = false,
    resetText,
    imageUpload,
    hasBG,
    onTargetClick,
    type,
    editType,
    withImageDelete,
    onImageDelete,
    colorPickerProps,
    ...popoverProps
  } = props

  const colorValueArray = useMemo(() => {
    const themeColors = getThemeColorValueArray({ theme })

    return (type && isTextElement(type)) || editType === "section"
      ? [...themeColors, { value: "#fff", color: "white" }, { value: "#000", color: "black" }]
      : themeColors
  }, [editType, theme, type])

  const swatches = useMemo(() => {
    return colorValueArray.map((item) => item.value)
  }, [colorValueArray])

  const hexColor = useMemo(() => {
    return getHexFromThemeColor({ theme, color })
  }, [color, theme])

  const { t } = useTranslation("build")

  return (
    <Popover width={200} position={popoverPosition || "bottom"} shadow="md" {...popoverProps}>
      <Popover.Target>
        <div onClick={onTargetClick}>
          <Box
            p={6}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              borderRadius: theme.radius.sm,
              cursor: "pointer",
              alignSelf: "stretch",
              "&:hover": withHover
                ? {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.fn.rgba(theme.colors.violet[9], 0.2)
                        : theme.colors.violet[0],
                  }
                : undefined,
              "&:active": {
                transform: "translateY(1px)",
              },
            })}
          >
            {hasBG ? (
              <BsFillImageFill size={16} color={theme.colors.violet[5]} />
            ) : (
              <ColorSwatch radius="xs" size={16} color={hexColor} />
            )}
          </Box>
        </div>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Box py={4} px={8} onMouseLeave={onPopoverMouseLeave} onMouseEnter={onPopoverMouseEnter}>
          {withReset && onResetClick && (
            <Button
              size="sm"
              fullWidth
              onClick={onResetClick}
              compact
              variant="subtle"
              rightIcon={
                currentPaletteColor ? (
                  <ColorSwatch color={currentPaletteColor} radius="xs" size={16} />
                ) : undefined
              }
            >
              {resetText || t("inherit palette color")}
            </Button>
          )}
          {imageUpload && <UploadImageButton {...imageUpload} />}
          {withImageDelete && (
            <Button color="red" variant="light" compact size="sm" fullWidth onClick={onImageDelete}>
              Remove image
            </Button>
          )}
          <ColorPicker
            mt={0}
            size="xl"
            withPicker={false}
            swatchesPerRow={8}
            fullWidth
            swatches={swatches}
            value={hexColor}
            onChange={(value) =>
              onColorChange(colorValueArray.find?.((item) => item.value === value)?.color || value)
            }
            {...colorPickerProps}
          />
        </Box>
      </Popover.Dropdown>
    </Popover>
  )
}

export default PaletteItem

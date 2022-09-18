import {
  Popover,
  ColorSwatch,
  ColorPicker,
  useMantineTheme,
  PopoverProps,
  Box,
  Button,
  FileButton,
} from "@mantine/core"
import { FloatingPosition } from "@mantine/core/lib/Floating"
import { getHexFromThemeColor, getThemeColorValueArray } from "helpers"
import useTranslation from "next-translate/useTranslation"
import { useState, useMemo, useEffect } from "react"
import { BuildStore } from "store/build"

import { BsFillImageFill } from "@react-icons/all-files/bs/BsFillImageFill"

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
    ...popoverProps
  } = props

  const [colorValueArray] = useState(getThemeColorValueArray({ theme }))
  const swatches = useMemo(() => {
    return colorValueArray.map((item) => item.value)
  }, [colorValueArray])

  const hexColor = useMemo(() => {
    return getHexFromThemeColor({ theme, color })
  }, [color])

  const { t } = useTranslation("pagesBuild")
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    const uploadBG = async () => {
      if (file) {
        const data = new FormData()
        data.append("key", "a7bad624b0773cbad481fef7bbb30664")
        data.append("action", "upload")
        data.append("format", "json")
        data.append("image", file)
        const axios = (await import("axios")).default
        const response = await axios("https://api.imgbb.com/1/upload", {
          method: "POST",
          data,
        })

        if ((response.status = 200 && response?.data?.data?.url)) {
          // const src = `https://ucarecdn.com/${responseData.file}/`
          imageUpload?.onImagePick(response.data.data.url)
        }
      }
    }
    void uploadBG()
  }, [file])

  return (
    <Popover width={200} position={popoverPosition || "bottom"} shadow="md" {...popoverProps}>
      <Popover.Target>
        <div>
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
                    backgroundColor: theme.colors.violet[0],
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
          {imageUpload && (
            <div onClick={() => (BuildStore.isImageUploading = imageUpload.id)}>
              <FileButton
                onChange={(file: File) => {
                  setFile(file)
                  BuildStore.isImageUploading = null
                }}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button {...props} fullWidth color="violet" compact>
                    Upload image
                  </Button>
                )}
              </FileButton>
            </div>
          )}
          <ColorPicker
            size="xl"
            withPicker={false}
            swatchesPerRow={8}
            fullWidth
            swatches={swatches}
            value={hexColor}
            onChange={(value) =>
              onColorChange(colorValueArray.find?.((item) => item.value === value)?.color || value)
            }
          />
        </Box>
      </Popover.Dropdown>
    </Popover>
  )
}

export default PaletteItem

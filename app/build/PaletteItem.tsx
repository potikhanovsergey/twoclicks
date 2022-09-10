import {
  Popover,
  ColorSwatch,
  ColorPicker,
  useMantineTheme,
  PopoverProps,
  Box,
  Button,
  ThemeIcon,
} from "@mantine/core"
import { FloatingPosition } from "@mantine/core/lib/Floating"
import { getHexFromThemeColor, getThemeColorValueArray } from "helpers"
import useTranslation from "next-translate/useTranslation"
import { useState, useMemo } from "react"
interface IPaletteItem extends Omit<PopoverProps, "children"> {
  color: string
  onColorChange: (value: string) => void
  popoverPosition?: FloatingPosition
  onPopoverMouseLeave?: () => void
  onPopoverMouseEnter?: () => void
  onResetClick?: () => void
  withReset?: boolean
  currentPaletteColor?: string
  withHover?: boolean
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
            <ColorSwatch radius="xs" size={16} color={hexColor} />
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
              {t("inherit palette color")}
            </Button>
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

import { Box, Overlay, ThemeIcon, Stack, Badge, OverlayProps, BoxProps } from "@mantine/core"
import { Dropzone, DropzoneProps } from "@mantine/dropzone"
import { useHover, useMergedRef } from "@mantine/hooks"
import { forwardRef, ReactNode } from "react"
import { FaImage } from "@react-icons/all-files/fa/FaImage"

type ImagePickerProps = Omit<DropzoneProps, "children"> &
  Omit<OverlayProps, "children"> & {
    onDrop(files: File[]): void
    children: ReactNode
    boxProps?: BoxProps & {
      onMouseEnter?: () => void
      onMouseLeave?: () => void
    }
  }

const ImagePicker = forwardRef(({ children, onDrop, boxProps, ...rest }: ImagePickerProps, ref) => {
  const { hovered, ref: hoverRef } = useHover()

  const mergedRef = useMergedRef(hoverRef, ref)
  return (
    <Box
      sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      ref={mergedRef}
      {...boxProps}
    >
      <Overlay<typeof Dropzone>
        component={Dropzone}
        onDrop={onDrop}
        multiple={false}
        accept={["image/png", "image/jpeg"]}
        maxSize={32 * 1024 ** 2}
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 0,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.colors.dark[6],
          },
        })}
        opacity={0.75}
        {...rest}
      >
        <></>
      </Overlay>
      {children}
      {hovered && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 300,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {hovered && (
            <Stack align="center">
              <ThemeIcon variant="gradient" gradient={{ from: "flame", to: "red" }} radius="sm">
                <FaImage size="65%" color="#fff" />
              </ThemeIcon>
              <Badge size="sm">Max size: 32MB</Badge>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  )
})

export default ImagePicker

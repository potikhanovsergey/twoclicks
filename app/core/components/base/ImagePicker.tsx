import { Box, Overlay, ThemeIcon, Stack, Badge, OverlayProps } from "@mantine/core"
import { Dropzone, DropzoneProps } from "@mantine/dropzone"
import { useHover } from "@mantine/hooks"
import { ReactNode } from "react"
import { FaImage } from "@react-icons/all-files/fa/FaImage"

type ImagePickerProps = Omit<DropzoneProps, "children"> &
  Omit<OverlayProps, "children"> & {
    onDrop(files: File[]): void
    children: ReactNode
  }

const ImagePicker = ({ children, onDrop, ...rest }: ImagePickerProps) => {
  const { hovered, ref } = useHover()
  return (
    <Box sx={{ position: "relative" }} ref={ref}>
      <>
        <Overlay<typeof Dropzone>
          component={Dropzone}
          onDrop={onDrop}
          multiple={false}
          accept={["image/*"]}
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
                <ThemeIcon variant="gradient" gradient={{ from: "violet", to: "red" }} radius="sm">
                  <FaImage size="65%" color="#fff" />
                </ThemeIcon>
                <Badge>Max size: 32MB</Badge>
              </Stack>
            )}
          </Box>
        )}
      </>
    </Box>
  )
}

export default ImagePicker

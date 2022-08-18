import { Box, Center, Overlay, Text, ThemeIcon } from "@mantine/core"
import { Dropzone, MIME_TYPES } from "@mantine/dropzone"
import { useHover } from "@mantine/hooks"
import { ReactNode } from "react"
import { FaImage } from "react-icons/fa"

const ImagePicker = ({
  children,
  onDrop,
}: {
  children: ReactNode
  onDrop(files: File[]): void
}) => {
  const { hovered, ref } = useHover()
  return (
    <Box sx={{ position: "relative" }} ref={ref}>
      <Overlay<typeof Dropzone>
        component={Dropzone}
        onDrop={onDrop}
        multiple={false}
        accept={["image/*"]}
        maxSize={10 * 1024 ** 2}
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 0,
          backgroundColor: "transparent",
          // "&[data-accept]": {
          //   color: theme.white,
          //   backgroundColor: theme.colors.blue[6],
          // },

          // "&[data-reject]": {
          //   color: theme.white,
          //   backgroundColor: theme.colors.red[6],
          // },

          "&:hover": {
            backgroundColor: theme.colors.dark[6],
          },
        })}
        opacity={0.75}
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
            <ThemeIcon
              variant="gradient"
              gradient={{ from: "violet", to: "red" }}
              size={64}
              radius="md"
            >
              <FaImage size={48} color="#fff" />
            </ThemeIcon>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ImagePicker

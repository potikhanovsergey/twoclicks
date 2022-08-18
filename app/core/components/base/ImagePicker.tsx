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
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
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
        opacity={0.8}
      >
        {hovered && <FaImage size={128} color="#fff" />}
      </Overlay>
      {children}
    </Box>
  )
}

export default ImagePicker

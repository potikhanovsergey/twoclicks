import { Box, BoxProps } from "@mantine/core"
import Image, { ImageProps } from "next/image"

const NextImage = ({
  sx,
  width = "100%",
  maxWidth = "100%",
  wrapperProps,
  ...props
}: BoxProps & ImageProps & { maxWidth?: string; wrapperProps?: BoxProps }) => {
  return (
    <Box
      {...wrapperProps}
      sx={{
        span: { position: "unset !important" as "unset" },
        ...wrapperProps?.sx,
      }}
      component="span"
      style={{ width, maxWidth }}
    >
      <Box
        component={Image}
        layout="fill"
        {...props}
        width={width}
        sx={{
          objectFit: "contain",
          width: "100% !important",
          position: "relative !important" as "relative",
          height: "unset !important",
        }}
      />
    </Box>
  )
}

export default NextImage

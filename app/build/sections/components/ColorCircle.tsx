import { BoxProps, packSx, Box } from "@mantine/core"

const ColorCircle = ({ sx, size = 30, ...props }: BoxProps & { size?: number }) => {
  return (
    <Box
      sx={[
        {
          width: size,
          height: size,
          position: "absolute",
          borderRadius: "50%",
          zIndex: 0,
        },
        ...packSx(sx),
      ]}
      {...props}
    />
  )
}

ColorCircle.displayName = "@twoclicks/colorcircle"

export default ColorCircle

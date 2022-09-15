import { Box, BoxProps, useMantineTheme } from "@mantine/core"

interface ShadowCardProps extends BoxProps {}

const ShadowCard = ({ children, sx, ...rest }: ShadowCardProps) => {
  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return (
    <Box
      py={10}
      px={20}
      sx={{
        boxShadow: "0px 18px 48px 7px rgba(157, 136, 206, 0.3)",
        backgroundColor: dark ? theme.colors.dark[6] : theme.white,
        borderRadius: "30px",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default ShadowCard

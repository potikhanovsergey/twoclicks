import { useMantineTheme } from "@mantine/core"

const VioletRedGradient = () => {
  const theme = useMantineTheme()
  return (
    <svg
      width="0"
      height="0"
      style={{ visibility: "hidden", position: "absolute", overflow: "hidden" }}
    >
      <linearGradient
        id="violet-red-gradient"
        x1="100%"
        y1="100%"
        x2="0%"
        y2="0%"
        gradientTransform="rotate(60)"
      >
        <stop stopColor={theme.colors.violet[5]} offset="0%" />
        <stop stopColor={theme.colors.red[5]} offset="100%" />
      </linearGradient>
    </svg>
  )
}

export default VioletRedGradient

import { TitleProps, Title } from "@mantine/core"

const LandingTitle = (props: TitleProps) => {
  return (
    <Title
      order={2}
      {...props}
      sx={{
        textTransform: "uppercase",
        letterSpacing: "8px",
        fontWeight: 600,
        fontSize: "34px",
        marginBottom: "120px",
        userSelect: "none",
        "@media (max-width: 992px)": {
          fontSize: "32px",
          letterSpacing: "9px",
          marginBottom: "96px",
        },
        "@media (max-width: 768px)": {
          fontSize: "24px",
          letterSpacing: "6px",
        },
        "@media (max-width: 576px)": {
          textAlign: "center",
          marginBottom: "48px",
        },
      }}
    />
  )
}

export default LandingTitle

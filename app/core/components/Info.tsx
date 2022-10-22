import { Center, Tooltip, TooltipProps, useMantineTheme } from "@mantine/core"
import { FaInfoCircle } from "@react-icons/all-files/fa/FaInfoCircle"

const Info = (props: Omit<TooltipProps, "children">) => {
  const theme = useMantineTheme()
  return (
    <Tooltip {...props}>
      <Center component="span">
        <FaInfoCircle color={theme.colors.primary[5]} />
      </Center>
    </Tooltip>
  )
}

export default Info

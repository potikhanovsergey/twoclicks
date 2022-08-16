import { ActionIcon, ActionIconProps, Group, Tooltip } from "@mantine/core"
import { FaDesktop, FaMobileAlt } from "react-icons/fa"

const ViewportButtons = (props: ActionIconProps) => {
  return (
    <Group spacing="xs">
      <Tooltip label="Mobile View" color="violet" position="bottom" withArrow>
        <ActionIcon {...props}>
          <FaMobileAlt />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Desktop View" color="violet" position="bottom" withArrow>
        <ActionIcon {...props}>
          <FaDesktop />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}

export default ViewportButtons

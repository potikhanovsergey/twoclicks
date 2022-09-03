import { ActionIcon, ActionIconProps, Group, Tooltip } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { FaDesktop, FaMobileAlt } from "react-icons/fa"
import { BuildStore } from "store/build"

const ViewportButtons = (props: ActionIconProps) => {
  const { viewMode } = BuildStore
  return (
    <Group spacing="xs">
      {viewMode === "mobile" ? (
        <Tooltip label="Desktop View" color="violet" position="bottom" withArrow>
          <div>
            <ActionIcon
              {...props}
              variant="light"
              onClick={() => (BuildStore.viewMode = "desktop")}
            >
              <FaDesktop />
            </ActionIcon>
          </div>
        </Tooltip>
      ) : (
        <Tooltip label="Mobile View" color="violet" position="bottom" withArrow>
          <div>
            <ActionIcon {...props} variant="light" onClick={() => (BuildStore.viewMode = "mobile")}>
              <FaMobileAlt />
            </ActionIcon>
          </div>
        </Tooltip>
      )}
    </Group>
  )
}

export default observer(ViewportButtons)

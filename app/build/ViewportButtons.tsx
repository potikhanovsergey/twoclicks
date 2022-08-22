import { ActionIcon, ActionIconProps, Group, Tooltip } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { FaDesktop, FaMobileAlt } from "react-icons/fa"
import { BuildStore } from "store/build"

const ViewportButtons = (props: ActionIconProps) => {
  const { viewMode } = BuildStore
  return (
    <Group spacing="xs">
      <Tooltip label="Mobile View" color="violet" position="bottom" withArrow>
        <div>
          <ActionIcon
            {...props}
            variant={viewMode === "mobile" ? "filled" : "light"}
            sx={{ pointerEvents: viewMode === "mobile" ? "none" : "all" }}
            onClick={() => (BuildStore.viewMode = "mobile")}
          >
            <FaMobileAlt />
          </ActionIcon>
        </div>
      </Tooltip>
      <Tooltip label="Desktop View" color="violet" position="bottom" withArrow>
        <div>
          <ActionIcon
            {...props}
            variant={viewMode === "desktop" ? "filled" : "light"}
            sx={{ pointerEvents: viewMode === "desktop" ? "none" : "all" }}
            onClick={() => (BuildStore.viewMode = "desktop")}
          >
            <FaDesktop />
          </ActionIcon>
        </div>
      </Tooltip>
    </Group>
  )
}

export default observer(ViewportButtons)

import { ActionIcon, ActionIconProps, Group, Tooltip } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"

import { FaDesktop } from "@react-icons/all-files/fa/FaDesktop"
import { FaMobileAlt } from "@react-icons/all-files/fa/FaMobileAlt"

const ViewportButtons = (props: ActionIconProps) => {
  const { viewMode } = BuildStore
  const { t } = useTranslation("build")
  return (
    <Group spacing="xs">
      {viewMode === "mobile" ? (
        <Tooltip label={t("desktop view")} position="bottom" withArrow>
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
        <Tooltip label={t("mobile view")} position="bottom" withArrow>
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

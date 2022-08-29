import { ActionIcon, ActionIconProps, Group, Tooltip } from "@mantine/core"
import { observer } from "mobx-react-lite"
import { BiRedo, BiUndo } from "react-icons/bi"
import { BuildStore } from "store/build"

const HistoryButtons = (props: ActionIconProps) => {
  const { undoStack, redoStack, undo, redo } = BuildStore
  return (
    <Group spacing={4}>
      <Tooltip label="Undo" position="bottom" color="violet" withArrow>
        <div>
          <ActionIcon {...props} onClick={undo} disabled={!undoStack.length}>
            <BiUndo size="66%" />
          </ActionIcon>
        </div>
      </Tooltip>
      <Tooltip label="Redo" position="bottom" color="violet" withArrow onClick={redo}>
        <div>
          <ActionIcon {...props} disabled={!redoStack.length}>
            <BiRedo size="66%" />
          </ActionIcon>
        </div>
      </Tooltip>
    </Group>
  )
}

export default observer(HistoryButtons)

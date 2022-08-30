import { ActionIcon, ActionIconProps, Group, Tooltip } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { BiRedo, BiUndo } from "react-icons/bi"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasPalette } from "types"

const HistoryButtons = (props: ActionIconProps) => {
  const { isUndoActive, isRedoActive, undo, redo } = BuildStore

  return (
    <Group spacing={4}>
      <Tooltip label="Undo" position="bottom" color="violet" withArrow>
        <div>
          <ActionIcon {...props} onClick={undo} disabled={!isUndoActive}>
            <BiUndo size="66%" />
          </ActionIcon>
        </div>
      </Tooltip>
      <Tooltip label="Redo" position="bottom" color="violet" withArrow onClick={redo}>
        <div>
          <ActionIcon {...props} disabled={!isRedoActive}>
            <BiRedo size="66%" />
          </ActionIcon>
        </div>
      </Tooltip>
    </Group>
  )
}

export default observer(HistoryButtons)

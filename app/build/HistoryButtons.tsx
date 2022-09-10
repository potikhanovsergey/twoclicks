import { ActionIcon, ActionIconProps, Group, Kbd, Tooltip, Text } from "@mantine/core"
import { useHotkeys, useLocalStorage, useOs } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useTransition } from "react"
import { BiRedo, BiUndo } from "react-icons/bi"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasPalette } from "types"

const HistoryButtons = (props: ActionIconProps) => {
  const { isUndoActive, isRedoActive, undo, redo } = BuildStore
  const os = useOs()
  useHotkeys([
    ["mod+Z", () => undo()],
    ["mod+shift+Z", () => redo()],
  ])
  const { t } = useTranslation("pagesBuild")

  return (
    <Group spacing={4}>
      <Tooltip
        label={
          <Group spacing={6}>
            <Text>{t("undo")}</Text>
            <Group spacing={2}>
              <Kbd>{os === "windows" ? <Text size={8}>ctrl</Text> : <Text size={8}>⌘</Text>}</Kbd>+
              <Kbd>
                <Text size={8}>z</Text>
              </Kbd>
            </Group>
          </Group>
        }
        position="bottom"
        withArrow
      >
        <div>
          <ActionIcon {...props} onClick={undo} disabled={!isUndoActive}>
            <BiUndo size="66%" />
          </ActionIcon>
        </div>
      </Tooltip>
      <Tooltip
        label={
          <Group spacing={6}>
            <Text>{t("redo")}</Text>
            <Group spacing={2}>
              <Kbd>{os === "windows" ? <Text size={8}>ctrl</Text> : <Text size={8}>⌘</Text>}</Kbd>+
              <Kbd>
                <Text size={8}>shift</Text>
              </Kbd>
              +
              <Kbd>
                <Text size={8}>z</Text>
              </Kbd>
            </Group>
          </Group>
        }
        position="bottom"
        withArrow
        onClick={redo}
      >
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

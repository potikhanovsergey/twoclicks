import {
  ActionIcon,
  ActionIconProps,
  Group,
  Kbd,
  Tooltip,
  Text,
  useMantineTheme,
  createStyles,
} from "@mantine/core"
import { useHotkeys, useOs } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BuildStore } from "store/build"

import { BiRedo } from "@react-icons/all-files/bi/BiRedo"
import { BiUndo } from "@react-icons/all-files/bi/BiUndo"

const useStyles = createStyles((theme) => ({
  kbd: {
    backgroundColor: theme.white,
    color: theme.black,
  },
}))

const HistoryButtons = (props: ActionIconProps) => {
  const { isUndoActive, isRedoActive, undo, redo } = BuildStore
  const os = useOs()
  useHotkeys([
    ["mod+Z", () => undo()],
    ["mod+shift+Z", () => redo()],
  ])
  const { t } = useTranslation("build")

  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"

  const { classes } = useStyles()
  return (
    <Group spacing={4}>
      <Tooltip
        label={
          <Group spacing={6}>
            <Text>{t("undo")}</Text>
            <Group spacing={2}>
              <Kbd className={classes.kbd}>
                {os === "windows" ? <Text size={8}>ctrl</Text> : <Text size={8}>⌘</Text>}
              </Kbd>
              +
              <Kbd className={classes.kbd}>
                <Text size={8}>z</Text>
              </Kbd>
            </Group>
          </Group>
        }
        position="bottom"
        withArrow
      >
        <div>
          <ActionIcon {...props} variant="subtle" onClick={undo} disabled={!isUndoActive}>
            <BiUndo size="66%" />
          </ActionIcon>
        </div>
      </Tooltip>
      <Tooltip
        label={
          <Group spacing={6}>
            <Text>{t("redo")}</Text>
            <Group spacing={2}>
              <Kbd className={classes.kbd}>
                {os === "windows" ? <Text size={8}>ctrl</Text> : <Text size={8}>⌘</Text>}
              </Kbd>
              +
              <Kbd className={classes.kbd}>
                <Text size={8}>shift</Text>
              </Kbd>
              +
              <Kbd className={classes.kbd}>
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
          <ActionIcon {...props} variant="subtle" disabled={!isRedoActive}>
            <BiRedo size="66%" />
          </ActionIcon>
        </div>
      </Tooltip>
    </Group>
  )
}

export default observer(HistoryButtons)

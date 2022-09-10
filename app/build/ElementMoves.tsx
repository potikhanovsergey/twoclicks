import { Tooltip, ActionIcon } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { CgChevronUpR, CgChevronDownR } from "react-icons/cg"
import { BuildStore } from "store/build"

interface IElementMoves {
  editType: string | null
  parentID: string | null
  id: string
}

const ElementMoves = ({ editType, parentID, id }: IElementMoves) => {
  const {
    data: { blocks },
    moveLeft,
    moveRight,
  } = BuildStore

  const hasMoves = useMemo(() => {
    if (editType === "section") return blocks.length > 1
    return false
  }, [parentID])

  const movesIcons = useMemo(() => {
    if (hasMoves) {
      return {
        left: <CgChevronUpR />,
        right: <CgChevronDownR />,
      }
    }
    return null
  }, [hasMoves])

  const { t } = useTranslation("pagesBuild")

  return hasMoves && movesIcons ? (
    <>
      {id !== blocks[0].id && (
        <Tooltip label={t("move up")} withArrow position={editType === "section" ? "left" : "top"}>
          <ActionIcon size="md" onClick={() => moveLeft({ id, parentID, editType })}>
            {movesIcons.left}
          </ActionIcon>
        </Tooltip>
      )}
      {id !== blocks[blocks.length - 1].id && (
        <Tooltip
          label={t("move down")}
          withArrow
          position={editType === "section" ? "left" : "top"}
        >
          <ActionIcon size="md" onClick={() => moveRight({ id, parentID, editType })}>
            {movesIcons.right}
          </ActionIcon>
        </Tooltip>
      )}
    </>
  ) : (
    <></>
  )
}

export default observer(ElementMoves)

import { Tooltip, ActionIcon } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { BuildStore } from "store/build"

import { FaChevronUp } from "@react-icons/all-files/fa/FaChevronUp"
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft"
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight"
import { ICanvasBlock } from "types"

interface IElementMoves {
  parentID: string | null
  element: ICanvasBlock
}

const ElementMoves = ({ element, parentID }: IElementMoves) => {
  const { moveLeft, moveRight } = BuildStore

  const { t } = useTranslation("build")

  const parentChildren = useMemo(() => {
    return BuildStore.findParentsChildren({ id: element.id, parentID, editType: element.editType })
  }, [parentID, element])

  const hasMoves = useMemo(() => {
    return parentChildren?.parentArray?.length && parentChildren.parentArray.length > 1
  }, [parentChildren])

  const movesIcons = useMemo(() => {
    if (hasMoves) {
      if (element.editType === "section") {
        return {
          left: <FaChevronUp />,
          right: <FaChevronDown />,
        }
      } else {
        return {
          left: <FaChevronLeft />,
          right: <FaChevronRight />,
        }
      }
    }
    return null
  }, [hasMoves])

  const handleMoveLeft = () =>
    moveLeft(
      {
        id: element.id,
        parentID,
        editType: element.editType,
        withScroll: element.editType === "section",
      },
      false
    )

  const handleMoveRight = () =>
    moveRight(
      {
        id: element.id,
        parentID,
        editType: element.editType,
        withScroll: element.editType === "section",
      },
      false
    )

  return hasMoves && movesIcons ? (
    <>
      {element.id !== parentChildren.parentArray?.[0]?.id && (
        <Tooltip
          label={t("move up")}
          withArrow
          position={element.editType === "section" ? "left" : "top"}
        >
          <ActionIcon size="md" radius={0} onClick={handleMoveLeft}>
            {movesIcons.left}
          </ActionIcon>
        </Tooltip>
      )}
      {element.id !== parentChildren.parentArray?.[parentChildren?.parentArray?.length - 1]?.id && (
        <Tooltip
          label={t("move down")}
          withArrow
          position={element.editType === "section" ? "left" : "top"}
        >
          <ActionIcon size="md" radius={0} color="primary" onClick={handleMoveRight}>
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

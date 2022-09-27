import { Tooltip, ActionIcon } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { BuildStore } from "store/build"

import { FaChevronUp } from "@react-icons/all-files/fa/FaChevronUp"
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft"
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight"

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

  const { t } = useTranslation("build")

  const parentChildren = useMemo(() => {
    return BuildStore.findParentsChildren({ id, parentID, editType })
  }, [id, parentID, editType])

  const hasMoves = useMemo(() => {
    return parentChildren?.parentArray?.length && parentChildren.parentArray.length > 1
  }, [parentChildren])

  const movesIcons = useMemo(() => {
    if (hasMoves) {
      if (editType === "section") {
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

  if (editType === "section") {
    console.log(parentChildren, hasMoves, id, movesIcons)
  }

  return hasMoves && movesIcons ? (
    <>
      {id !== parentChildren.parentArray?.[0]?.id && (
        <Tooltip label={t("move up")} withArrow position={editType === "section" ? "left" : "top"}>
          <ActionIcon
            size="md"
            color="violet"
            onClick={() => moveLeft({ id, parentID, editType }, false, editType === "section")}
          >
            {movesIcons.left}
          </ActionIcon>
        </Tooltip>
      )}
      {id !== parentChildren.parentArray?.[parentChildren?.parentArray?.length - 1]?.id && (
        <Tooltip
          label={t("move down")}
          withArrow
          position={editType === "section" ? "left" : "top"}
        >
          <ActionIcon
            size="md"
            color="violet"
            onClick={() => moveRight({ id, parentID, editType }, false, editType === "section")}
          >
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

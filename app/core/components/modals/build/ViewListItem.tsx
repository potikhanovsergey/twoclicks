import { createStyles } from "@mantine/core"
import { useContext, useEffect, useRef, useState } from "react"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import { BuildStore } from "store/build"
import { useMutation } from "@blitzjs/rpc"
import createLikedBlock from "app/building-blocks/mutations/createLikedBlock"
import deleteLikedBlock from "app/building-blocks/mutations/deleteLikedBlock"
import { observer } from "mobx-react-lite"
import shortid from "shortid"

import upsertUsedBlock from "app/building-blocks/mutations/upsertUsedBlock"
import { ICanvasBlock } from "types"
import PageCard from "app/pages-grid/PageCard"
import LikeBlock from "./LikeBlock"
import { useHover } from "@mantine/hooks"
interface IViewListItem {
  block: ICanvasBlock
  onClick?: () => void
  hasActions?: boolean
  liked?: boolean
}

const useStyles = createStyles((theme, _params, getRef) => ({
  box: {
    borderRadius: theme.radius.sm,
    background: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
    cursor: "pointer",
    display: "flex",
    height: "100%",
    aspectRatio: "5/3",
    position: "relative",
    overflow: "hidden",
    transition: "0.4s ease all",
    "&:hover": {
      [`& .${getRef("icon")}`]: {
        opacity: 1,
      },
      [`& .${getRef("child")}`]: {},
      background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3],
    },
  },
  child: {
    transition: "0.4s ease transform",
    ref: getRef("child"),
  },
}))

const ViewListItem = ({ block, hasActions = false, liked }: IViewListItem) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { insertIndex } = BuildStore

  const iconRef = useRef(null)
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (liked !== undefined) {
      setIsLiked(liked)
    }
  }, [liked])

  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const [likeBuildingBlock] = useMutation(createLikedBlock)
  const [dislikeBuildingBlock] = useMutation(deleteLikedBlock)
  const [upsertUsedBlockMutation] = useMutation(upsertUsedBlock)

  const handleBoxClick = async () => {
    void upsertUsedBlockMutation({ buildingBlockId: block.id })
    BuildStore.push({ block: { ...block, id: shortid.generate() }, insertIndex })
    setModalContext((prevValue: IModalContextValue) => ({
      ...prevValue,
      canvasComponentsModal: false,
      canvasSectionsModal: false,
    }))
  }

  const handleLike = async () => {
    setIsLikeLoading(true)
    if (isLiked) {
      await dislikeBuildingBlock({ buildingBlockId: block.id })
      setIsLiked(false)
    } else {
      await likeBuildingBlock({ buildingBlockId: block.id })
      setIsLiked(true)
    }
    BuildStore.shouldRefetchLiked = true
    setIsLikeLoading(false)
  }

  const { ref, hovered } = useHover()

  const [imageAspectRatio, setImageAspectRatio] = useState<number | undefined>(undefined)

  return (
    <PageCard
      paperProps={{ withBorder: true }}
      ref={ref}
      previewImage={block.previewImage ? `/building-blocks/${block.previewImage}` : undefined}
      key={block.id}
      onClick={handleBoxClick}
      imageAspectRatio={imageAspectRatio}
      onImageLoad={({ target }) => {
        const { naturalWidth, naturalHeight } = target as HTMLImageElement
        setImageAspectRatio(naturalWidth / naturalHeight)
      }}
      options={
        hasActions && (
          <LikeBlock
            onClick={handleLike}
            liked={isLiked}
            loading={isLikeLoading}
            hovered={hovered}
          />
        )
      }
    />
  )
}

export default observer(ViewListItem)

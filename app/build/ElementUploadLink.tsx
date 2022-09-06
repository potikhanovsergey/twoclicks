import { Tooltip, ActionIcon, Menu, TextInput, Group } from "@mantine/core"
import { TypeLinkUpload } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { FaCheck, FaLink } from "react-icons/fa"
import { TbWorldUpload } from "react-icons/tb"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

interface IElementUploadLink {
  type: string
  id: string
  props: ICanvasBlockProps
}

const ElementUploadLink = ({ type, id, props }: IElementUploadLink) => {
  const hasLinkUpload = TypeLinkUpload[type]
  const { changeProp, openedAction } = BuildStore

  const [src, setSrc] = useState(props.src || "")

  const handleChangeSrc = () => {
    changeProp({
      id,
      newProps: {
        src,
      },
    })
  }

  const { t } = useTranslation("pagesBuild")
  return hasLinkUpload ? (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[id] === "src",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[id] = "src"
        },
      }}
      tooltipProps={{
        label: t("changeTheSource"),
        children: (
          <ActionIcon color="violet">
            <TbWorldUpload />
          </ActionIcon>
        ),
      }}
      dropdownProps={{
        p: 8,
        sx: (theme) => ({ boxShadow: theme.shadows.md }),
        children: (
          <Group align="center" noWrap spacing={4}>
            <TextInput
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleChangeSrc()
                }
              }}
              size="xs"
              placeholder={t("enterTheSourceURL")}
              value={src}
              onChange={(e) => setSrc(e.currentTarget.value)}
              style={{ minWidth: "196px" }}
            />
            <ActionIcon
              onClick={handleChangeSrc}
              color="violet"
              variant="filled"
              disabled={src === props.src || !src.length}
            >
              <FaCheck />
            </ActionIcon>
          </Group>
        ),
      }}
    />
  ) : (
    <></>
  )
}

export default observer(ElementUploadLink)

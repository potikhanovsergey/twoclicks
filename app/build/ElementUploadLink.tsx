import { ActionIcon, TextInput, Group } from "@mantine/core"
import { TypeLinkUpload } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { ReactNode, useState } from "react"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { FaCloudUploadAlt } from "@react-icons/all-files/fa/FaCloudUploadAlt"

interface IElementUploadLink {
  type: string
  id: string
  props: ICanvasBlockProps
  targetIcon?: ReactNode
}

const ElementUploadLink = ({
  type,
  id,
  props,
  targetIcon = <FaCloudUploadAlt />,
}: IElementUploadLink) => {
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

  const { t } = useTranslation("build")
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
        children: <ActionIcon color="violet">{targetIcon}</ActionIcon>,
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

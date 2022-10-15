import { ActionIcon, TextInput, Group, FileButton, Button, Stack } from "@mantine/core"
import { TypeLinkUpload } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { ReactNode, useCallback, useState } from "react"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"

import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { FaCloudUploadAlt } from "@react-icons/all-files/fa/FaCloudUploadAlt"
import UploadImageButton from "./UploadImageButton"

interface IElementUploadLink {
  element: ICanvasBlock
  targetIcon?: ReactNode
}

const ElementUploadLink = ({ element, targetIcon = <FaCloudUploadAlt /> }: IElementUploadLink) => {
  const hasLinkUpload = TypeLinkUpload[element.type]
  const { changeProp, openedAction } = BuildStore

  const [src, setSrc] = useState(element.props?.src || "")

  const handleChangeSrc = () => {
    changeProp({
      id: element.id,
      newProps: {
        src,
      },
    })
  }

  const onImagePick = useCallback((src) => {
    changeProp({
      id: element.id,
      newProps: {
        src,
      },
    })
  }, [])

  const { t } = useTranslation("build")
  return hasLinkUpload ? (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[element.id] === "src",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction = {
            [element.id]: "src",
          }
        },
      }}
      tooltipProps={{
        label: t("changeTheSource"),
        children: <ActionIcon radius={0}>{targetIcon}</ActionIcon>,
      }}
      dropdownProps={{
        p: 8,
        sx: (theme) => ({ boxShadow: theme.shadows.md }),
        children: (
          <Stack spacing={4}>
            {element.type.includes("image") && (
              <UploadImageButton id={element.id} onImagePick={onImagePick} />
            )}
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
                variant="filled"
                disabled={src === element.props.src || !src.length}
              >
                <FaCheck />
              </ActionIcon>
            </Group>
          </Stack>
        ),
      }}
    />
  ) : (
    <></>
  )
}

export default observer(ElementUploadLink)

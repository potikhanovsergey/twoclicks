import { Tooltip, ActionIcon, Menu, TextInput, Group } from "@mantine/core"
import { TypeLinkUpload } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { FaCheck, FaLink } from "react-icons/fa"
import { TbWorldUpload } from "react-icons/tb"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

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
    <Menu
      position="top"
      offset={0}
      defaultOpened={openedAction?.[id] === "src"}
      onOpen={() => {
        BuildStore.openedAction[id] = "src"
      }}
      onClose={() => (BuildStore.openedAction = {})}
      closeOnItemClick={false}
      width="auto"
    >
      <Menu.Target>
        <div>
          <Tooltip label={t("changeTheSource")} color="violet" withArrow>
            <ActionIcon color="violet">
              <TbWorldUpload />
            </ActionIcon>
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown p={8} sx={(theme) => ({ boxShadow: theme.shadows.md })}>
        <Group align="center" noWrap spacing={4}>
          <TextInput
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleChangeSrc()
              }
            }}
            size="xs"
            placeholder="https://google.com"
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
      </Menu.Dropdown>
    </Menu>
  ) : (
    <></>
  )
}

export default observer(ElementUploadLink)

import { Tooltip, ActionIcon, Menu, Button, Stack, TextInput, Group, Checkbox } from "@mantine/core"
import { getRadiusesByType, TypeLinks } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { AiOutlineRadiusBottomleft } from "react-icons/ai"
import { FaCheck, FaLink } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

interface IElementLinkEdit {
  type: string
  id: string
  props: ICanvasBlockProps
}

const ElementLinkEdit = ({ type, id, props }: IElementLinkEdit) => {
  const hasLinkEdit = TypeLinks[type]
  const { changeProp, openedAction } = BuildStore

  const [link, setLink] = useState(props.href || "")
  const [openInNewTab, setOpenInNewTab] = useState(
    props.target === "_blank" ? true : props.target === "_self" ? false : true
  )

  const handleLinkify = () => {
    changeProp({
      id,
      newProps: {
        href: link,
        component: "a",
        target: openInNewTab ? "_blank" : "_self",
      },
    })
  }

  const handleReset = () => {
    changeProp({
      id,
      newProps: {
        href: undefined,
        component: undefined,
        target: undefined,
      },
    })
  }

  const { t } = useTranslation("pagesBuild")
  return hasLinkEdit ? (
    <Menu
      position="top"
      offset={0}
      defaultOpened={openedAction?.[id] === "link"}
      onOpen={() => {
        BuildStore.openedAction[id] = "link"
      }}
      onClose={() => (BuildStore.openedAction = {})}
      closeOnItemClick={false}
      width="auto"
    >
      <Menu.Target>
        <div>
          <Tooltip label={t("linkify")} color="violet" withArrow>
            <ActionIcon color="violet">
              <FaLink style={{ fill: "url(#violet-red-gradient)" }} />
            </ActionIcon>
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown p={8}>
        {props.href && (
          <Button
            compact
            variant="light"
            size="xs"
            onClick={handleReset}
            color="violet"
            mb={4}
            rightIcon={<IoClose />}
          >
            {t("reset link")}
          </Button>
        )}
        <Group align="center" noWrap spacing={4}>
          <TextInput
            size="xs"
            placeholder="https://google.com"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
            style={{ minWidth: "196px" }}
          />
          <ActionIcon onClick={handleLinkify} color="violet" variant="filled">
            <FaCheck />
          </ActionIcon>
        </Group>
        <Checkbox
          mt={4}
          size="xs"
          label={t("open link in new tab")}
          checked={openInNewTab}
          onChange={(event) => setOpenInNewTab(event.currentTarget.checked)}
        />
      </Menu.Dropdown>
    </Menu>
  ) : (
    <></>
  )
}

export default observer(ElementLinkEdit)

import {
  Tooltip,
  ActionIcon,
  Menu,
  Button,
  Stack,
  TextInput,
  Group,
  Checkbox,
  CheckboxProps,
} from "@mantine/core"
import { getRadiusesByType, TypeLinks } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { AiOutlineRadiusBottomleft } from "react-icons/ai"
import { FaCheck, FaLink } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import { GoLink, GoLinkExternal } from "react-icons/go"
import ToolbarMenu from "./ToolbarMenu"

interface IElementLinkEdit {
  type: string
  id: string
  props: ICanvasBlockProps
}

const CheckboxIcon: CheckboxProps["icon"] = ({ indeterminate, className }) =>
  indeterminate ? (
    <GoLinkExternal className={className} />
  ) : (
    <GoLinkExternal className={className} />
  )

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
        href: link.length ? link : undefined,
        component: link.length ? "a" : undefined,
        target: link.length ? (openInNewTab ? "_blank" : "_self") : undefined,
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
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[id] === "link",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[id] = "link"
        },
      }}
      tooltipProps={{
        label: t("linkify"),
        children: (
          <ActionIcon color="violet">
            <FaLink />
          </ActionIcon>
        ),
      }}
      dropdownProps={{
        p: 8,
        sx: (theme) => ({ boxShadow: theme.shadows.md }),
        children: (
          <>
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
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleLinkify()
                  }
                }}
                size="xs"
                placeholder="https://google.com"
                value={link}
                onChange={(e) => setLink(e.currentTarget.value)}
                style={{ minWidth: "196px" }}
              />
              <ActionIcon
                onClick={handleLinkify}
                color="violet"
                variant="filled"
                disabled={link === props.href}
              >
                <FaCheck />
              </ActionIcon>
            </Group>
            <Checkbox
              icon={CheckboxIcon}
              mt={8}
              size="xs"
              label={t("open link in new tab")}
              checked={openInNewTab}
              onChange={(event) => setOpenInNewTab(event.currentTarget.checked)}
            />
          </>
        ),
      }}
    />
  ) : (
    <></>
  )
}

export default observer(ElementLinkEdit)

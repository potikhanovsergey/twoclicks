import {
  ActionIcon,
  Button,
  TextInput,
  Group,
  Checkbox,
  CheckboxProps,
  Text,
  Stack,
  ScrollArea,
} from "@mantine/core"
import { TypeLinks } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useMemo, useState } from "react"

import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"
import ToolbarMenu from "./ToolbarMenu"
import { AppStore } from "store"

import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { FaLink } from "@react-icons/all-files/fa/FaLink"
import { IoClose } from "@react-icons/all-files/io5/IoClose"
import { GoLinkExternal } from "@react-icons/all-files/go/GoLinkExternal"

interface IElementLinkEdit {
  element: ICanvasBlock
  sectionIndex?: number
}

const CheckboxIcon: CheckboxProps["icon"] = ({ indeterminate, className }) =>
  indeterminate ? (
    <GoLinkExternal className={className} />
  ) : (
    <GoLinkExternal className={className} />
  )

const ElementLinkEdit = ({ element, sectionIndex }: IElementLinkEdit) => {
  const hasLinkEdit = TypeLinks[element.type]
  const {
    changeProp,
    openedAction,
    data: { id: pageID },
  } = BuildStore

  const [link, setLink] = useState(element.props.href || "")
  const [openInNewTab, setOpenInNewTab] = useState(
    element.props.target === "_blank" ? true : element.props.target === "_self" ? false : true
  )

  const handleLinkify = (url: string, newTab: boolean) => {
    changeProp({
      id: element.id,
      newProps: {
        href: url.length ? url : undefined,
        component: url.length ? "a" : undefined,
        target: url.length ? (newTab ? "_blank" : "_self") : undefined,
      },
    })
  }

  const handleReset = () => {
    changeProp({
      id: element.id,
      newProps: {
        href: undefined,
        component: undefined,
        target: undefined,
      },
    })
  }

  const { t } = useTranslation("build")

  const { pages } = AppStore

  const dividedPages = useMemo(() => {
    const page = pages?.find((p) => p.id === pageID)
    if (!page) return null
    return {
      current: page,
      rest: pages.filter((p) => p.id !== page.id),
    }
  }, [pages, pageID])

  return hasLinkEdit ? (
    <ToolbarMenu
      menuProps={{
        defaultOpened: openedAction?.[element.id] === "link",
        onClose: () => {
          BuildStore.openedAction = {}
        },
        onOpen: () => {
          BuildStore.openedAction[element.id] = "link"
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
          <ScrollArea.Autosize maxHeight={196} type="never">
            {element.props.href && (
              <Button
                compact
                variant="light"
                size="xs"
                onClick={handleReset}
                color="violet"
                mb={8}
                rightIcon={<IoClose />}
              >
                {t("reset link")}
              </Button>
            )}
            <Checkbox
              icon={CheckboxIcon}
              size="xs"
              mb={8}
              label={t("open link in new tab")}
              checked={openInNewTab}
              onChange={(event) => {
                const newValue = event.currentTarget.checked
                setOpenInNewTab(newValue)
                changeProp({
                  id: element.id,
                  newProps: {
                    target: newValue ? "_blank" : "_self",
                  },
                })
              }}
            />
            <Text weight="bold" mb={4} size="sm">
              Enter valid URL:
            </Text>
            <Group align="center" noWrap spacing={4}>
              <TextInput
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleLinkify(link, openInNewTab)
                  }
                }}
                size="xs"
                placeholder="https://google.com"
                value={link}
                onChange={(e) => setLink(e.currentTarget.value)}
                style={{ minWidth: "196px" }}
              />
              <ActionIcon
                onClick={() => handleLinkify(link, openInNewTab)}
                color="violet"
                variant="filled"
                disabled={link === element.props.href}
              >
                <FaCheck />
              </ActionIcon>
            </Group>
            {dividedPages && dividedPages.rest.length > 0 && (
              <>
                <Text weight="bold" size="sm" mt="xs" mb={4}>
                  Link it to existing pages:
                </Text>
                <Stack spacing={4}>
                  {dividedPages.rest.map((page) => (
                    <Button
                      size="xs"
                      key={page.id}
                      variant="light"
                      onClick={() => {
                        const url = `/p/${page.id}`
                        setLink(url)
                        handleLinkify(url, openInNewTab)
                      }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Stack>
              </>
            )}
            {BuildStore.data.blocks.length > 1 && (
              <>
                <Text weight="bold" size="sm" mt="xs" mb={4}>
                  Link it to existing sections:
                </Text>
                <Stack spacing={4}>
                  {BuildStore.data.blocks.map((section, i) =>
                    sectionIndex !== i ? (
                      <Button
                        size="xs"
                        key={section.id + i}
                        variant="light"
                        onClick={() => {
                          const url = `#${section.id}`
                          setOpenInNewTab(false)
                          setLink(url)
                          handleLinkify(url, false)
                        }}
                      >
                        Section №{i + 1}, ID: {section.id}
                      </Button>
                    ) : (
                      <></>
                    )
                  )}
                </Stack>
              </>
            )}
          </ScrollArea.Autosize>
        ),
      }}
    />
  ) : (
    <></>
  )
}

export default observer(ElementLinkEdit)

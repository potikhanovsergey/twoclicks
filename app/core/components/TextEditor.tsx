import React, { useCallback, useEffect, useState } from "react"
import { useEditor, EditorContent, mergeAttributes, Extension } from "@tiptap/react"
import { ActionIcon, Box, Group, TextInput, Tooltip, useMantineTheme } from "@mantine/core"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import Bold from "@tiptap/extension-bold"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { FaBold } from "@react-icons/all-files/fa/FaBold"
import { FaAlignLeft } from "@react-icons/all-files/fa/FaAlignLeft"
import { FaAlignCenter } from "@react-icons/all-files/fa/FaAlignCenter"
import { FaAlignRight } from "@react-icons/all-files/fa/FaAlignRight"
import { FaAlignJustify } from "@react-icons/all-files/fa/FaAlignJustify"
import { FaLink } from "@react-icons/all-files/fa/FaLink"
import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { observer } from "mobx-react-lite"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"
import dynamic from "next/dynamic"
import HardBreak from "@tiptap/extension-hard-break"

const BubbleMenu = dynamic(() => import("@tiptap/react").then((m) => m.BubbleMenu))

const TextEditor: React.FC<{
  initialHtml: string
  parentID: string
}> = ({ initialHtml, parentID }) => {
  const [editLinkActive, setEditLinkActive] = useState(false)
  const [linkValue, setLinkValue] = useState("")

  const onChange = useCallback(
    (html: string) => {
      let parent = BuildStore.data.flattenBlocks[parentID]
      const parentProps = parent.props as ICanvasBlockProps
      const parentChildren = parentProps?.children
      if (parent && html !== parentChildren) {
        BuildStore.changeProp({ id: parentID, newProps: { children: html } }, false, false)
      }
    },
    [parentID]
  )

  const [content, setContent] = useState(initialHtml)

  useEffect(() => {
    setContent(initialHtml)
  }, [initialHtml])

  const editor = useEditor(
    {
      extensions: [
        Paragraph.extend({
          parseHTML() {
            return [{ tag: "div" }]
          },
          renderHTML({ HTMLAttributes }) {
            return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
          },
        }),
        Document,
        Text,
        Bold,
        Link.configure({ openOnClick: false }),
        HardBreak.extend({
          addKeyboardShortcuts() {
            return {
              Enter: () => this.editor.commands.setHardBreak(),
            }
          },
        }),
        Placeholder.configure({
          placeholder: "Type something...",
        }),
        TextAlign.configure({
          types: ["paragraph"],
          defaultAlignment: "none",
        }),
      ],
      content,
      onBlur: ({ editor }) => {
        onChange && onChange(editor.getHTML())
      },
      onSelectionUpdate: ({ editor }) => {
        setEditLinkActive(false)
        setLinkValue(editor.getAttributes("link").href || "")
      },
      onDestroy: () => {
        console.log("DESTROY")
      },
    },
    []
  )

  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"

  return editor ? (
    <>
      <BubbleMenu
        tippyOptions={{
          duration: 100,
          appendTo: document?.querySelector("main") || "parent",
          interactive: true,
          arrow: true,
          placement: "bottom",
          zIndex: 701,
        }}
        editor={editor}
      >
        <Group
          spacing={0}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1],
            borderRadius: theme.radius.xs,
            boxShadow: theme.shadows.sm,
          })}
        >
          <Tooltip
            label="Bold"
            position="bottom"
            withArrow
            color="dark"
            sx={{ boxShadow: theme.shadows.md }}
            withinPortal
          >
            <ActionIcon
              size="md"
              radius={0}
              variant={editor.isActive("bold") ? "light" : "filled"}
              color={editor.isActive("bold") ? "primary" : dark ? "dark" : "dark.4"}
              onClick={() => {
                editor.chain().focus().toggleBold().run()
              }}
            >
              <FaBold />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="Align left"
            position="bottom"
            withArrow
            color="dark"
            sx={{ boxShadow: theme.shadows.md }}
            withinPortal
          >
            <ActionIcon
              size="md"
              radius={0}
              variant={editor.isActive({ textAlign: "left" }) ? "light" : "filled"}
              color={editor.isActive({ textAlign: "left" }) ? "primary" : dark ? "dark" : "dark.4"}
              onClick={() => {
                editor.chain().focus().setTextAlign("left").run()
              }}
            >
              <FaAlignLeft />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="Align center"
            position="bottom"
            withArrow
            color="dark"
            sx={{ boxShadow: theme.shadows.md }}
            withinPortal
          >
            <ActionIcon
              size="md"
              radius={0}
              variant={editor.isActive({ textAlign: "center" }) ? "light" : "filled"}
              color={
                editor.isActive({ textAlign: "center" }) ? "primary" : dark ? "dark" : "dark.4"
              }
              onClick={() => {
                editor.chain().focus().setTextAlign("center").run()
              }}
            >
              <FaAlignCenter />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="Align right"
            position="bottom"
            withArrow
            color="dark"
            sx={{ boxShadow: theme.shadows.md }}
            withinPortal
          >
            <ActionIcon
              size="md"
              radius={0}
              variant={editor.isActive({ textAlign: "right" }) ? "light" : "filled"}
              color={editor.isActive({ textAlign: "right" }) ? "primary" : dark ? "dark" : "dark.4"}
              onClick={() => {
                editor.chain().focus().setTextAlign("right").run()
              }}
            >
              <FaAlignRight />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="Justify"
            position="bottom"
            withArrow
            color="dark"
            sx={{ boxShadow: theme.shadows.md }}
            withinPortal
          >
            <ActionIcon
              size="md"
              radius={0}
              variant={editor.isActive({ textAlign: "justify" }) ? "light" : "filled"}
              color={
                editor.isActive({ textAlign: "justify" }) ? "primary" : dark ? "dark" : "dark.4"
              }
              onClick={() => {
                editor.chain().focus().setTextAlign("justify").run()
              }}
            >
              <FaAlignJustify />
            </ActionIcon>
          </Tooltip>
          {!editLinkActive ? (
            <Tooltip
              label={editor.isActive("link") ? editor.getAttributes("link").href : "Set link"}
              position="bottom"
              withArrow
              color="dark"
              sx={{ boxShadow: theme.shadows.md }}
              withinPortal
            >
              <ActionIcon
                size="md"
                radius={0}
                variant={editor.isActive("link") ? "light" : "filled"}
                color={editor.isActive("link") ? "primary" : dark ? "dark" : "dark.4"}
                onClick={() => {
                  editor.chain().focus().run()
                  setEditLinkActive(true)
                }}
              >
                <FaLink />
              </ActionIcon>
            </Tooltip>
          ) : (
            <TextInput
              size="xs"
              defaultValue={editor.getAttributes("link").href}
              onChange={(e) => setLinkValue(e.currentTarget.value)}
              height={24}
              placeholder="https://google.com"
              rightSection={
                <ActionIcon
                  size="sm"
                  color="primary"
                  disabled={!linkValue.length}
                  onClick={() => {
                    let url = linkValue
                    if (!/^https?:\/\//i.test(url)) {
                      url = "http://" + url
                    }
                    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
                    setEditLinkActive(false)
                  }}
                >
                  <FaCheck />
                </ActionIcon>
              }
            />
          )}
        </Group>
      </BubbleMenu>
      <Box
        spellCheck={false}
        sx={{
          "[contenteditable=true]": {
            outline: "none",
            backgroundImage: "inherit",
            WebkitBackgroundClip: "inherit",
            WebkitTextFillColor: "inherit",
            WebkitTapHighlightColor: "inherit",
          },
          ".is-editor-empty:first-of-type::before": {
            content: "attr(data-placeholder)",
            float: "left",
            color: "#adb5bd",
            pointerEvents: "none",
            height: "0",
          },
          backgroundImage: "inherit",
          WebkitBackgroundClip: "inherit",
          WebkitTextFillColor: "inherit",
          WebkitTapHighlightColor: "inherit",
        }}
        component={EditorContent}
        editor={editor}
      />
    </>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: initialHtml }} style={{ whiteSpace: "break-spaces" }} />
  )
}

export default observer(TextEditor)

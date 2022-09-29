import React, { memo } from "react"
import { useEditor, EditorContent, BubbleMenu, mergeAttributes } from "@tiptap/react"
import { Button, Group } from "@mantine/core"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import Paragraph from "@tiptap/extension-paragraph"
import Bold from "@tiptap/extension-bold"
import Link from "@tiptap/extension-link"
import { observer } from "mobx-react-lite"

const TextEditor: React.FC<{
  initialHtml: string
  onChange?: (html: string) => void
  onBlur?: (html: string) => void
}> = (props) => {
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
      ],
      content: props.initialHtml,
      onDestroy: () => console.log("DESTROYES"),
      // Each times editor is updated
      onUpdate: ({ editor }) => {
        // Call onChange callback with html value
        props.onChange && props.onChange(editor.getHTML())
      },
      onBlur: ({ editor }) => {
        props.onBlur && props.onBlur(editor.getHTML())
      },
    },
    []
  )

  return editor ? (
    <>
      <BubbleMenu
        className="bubble-menu"
        tippyOptions={{
          duration: 100,
          appendTo: document?.querySelector("main") || "parent",
          interactive: true,
          zIndex: 321312321,
          arrow: true,
          placement: "bottom",
        }}
        editor={editor}
      >
        <Group>
          <Button
            onClick={() => {
              editor.chain().focus().toggleBold().run()
            }}
          >
            Bold
          </Button>
          <Button
            onClick={() => {
              editor
                .chain()
                .focus()
                .toggleLink({ href: "https://google.com", target: "blank" })
                .run()
            }}
          >
            Link
          </Button>
        </Group>
      </BubbleMenu>
      <EditorContent editor={editor} />
    </>
  ) : (
    <>{props.initialHtml}</>
  )
}

export default observer(TextEditor)

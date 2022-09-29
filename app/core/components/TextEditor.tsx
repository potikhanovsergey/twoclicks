import React, { memo } from "react"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button, Group } from "@mantine/core"

const TextEditor: React.FC<{
  initialHtml: string
  onChange?: (html: string) => void
  onBlur?: (html: string) => void
}> = (props) => {
  const editor = useEditor(
    {
      extensions: [StarterKit.configure({ codeBlock: false })],
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

  return (
    <>
      {editor && (
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
            </Group>
          </BubbleMenu>
          <EditorContent editor={editor} />
        </>
      )}
    </>
  )
}

export default TextEditor

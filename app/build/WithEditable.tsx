import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { Box } from "@mantine/core"
import updatePage from "app/build-pages/mutations/updatePage"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

const WithEditable = ({ children, parentID, withContentEditable }) => {
  const [updatePageMutation] = useMutation(updatePage)
  const session = useSession()
  const { savePage } = BuildStore

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handlePaste = (e) => {
    // Prevent the default action
    e.preventDefault()

    // Get the copied text from the clipboard
    const text = e.clipboardData ? e.clipboardData.getData("text/plain") : ""

    // Insert text at the current position of caret
    const range = document.getSelection()?.getRangeAt(0)
    if (range) {
      range.deleteContents()

      const textNode = document.createTextNode(text)
      range.insertNode(textNode)
      range.selectNodeContents(textNode)
      range.collapse(false)

      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const handleBlur = (e) => {
    let text = ""
    if (e.target.innerHTML) text = e.target.innerHTML
    let parent = BuildStore.data.flattenBlocks[parentID]
    if (parent) {
      let parentProps = parent.props as ICanvasBlockProps
      if (parentProps?.children !== e.target.innerHTML) {
        BuildStore.changeProp({ id: parentID, newProps: { children: text } })
      }
    }
  }

  const handleKeyDown = (e) => {
    ;(e.ctrlKey || e.metaKey) &&
      ![`c`, `v`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `z`].includes(e.key) &&
      e.preventDefault()

    const el = e.target as HTMLSpanElement
    const parentButton = el?.closest("span[data-button]")
    if (parentButton && e.key === "Enter") {
      e.preventDefault()
    }
    if (
      e.key === "s" &&
      (navigator?.userAgentData?.platform.match("mac") ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault()
      void savePage({ session, updatePageMutation })
    }
  }

  return (
    <Box
      contentEditable={Boolean(withContentEditable)}
      className="content-editable"
      suppressContentEditableWarning
      component="span"
      spellCheck={false}
      sx={{
        ":empty": { paddingRight: "16px" },
        minWidth: "30px",
        outline: "none",
        wordBreak: "break-word",
      }}
      onDragOver={handleDragOver}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}

export default WithEditable

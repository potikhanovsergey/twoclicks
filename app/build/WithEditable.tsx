import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { Box } from "@mantine/core"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

const WithEditable = ({ children, parentID, withContentEditable }) => {
  const [updatePortfolioMutation] = useMutation(updatePortfolio)
  const session = useSession()
  const { savePortfolio } = BuildStore
  return (
    <Box
      contentEditable={Boolean(withContentEditable)}
      className="content-editable"
      suppressContentEditableWarning
      component="span"
      spellCheck={false}
      sx={({}) => ({
        ":empty": { paddingRight: "16px" },
        display: "inline-block",
        minWidth: "30px",
        outline: "none",
        wordBreak: "break-word",
      })}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onPaste={(e) => {
        // Prevent the default action
        e.preventDefault()

        // Get the copied text from the clipboard
        const text = e.clipboardData
          ? (e.originalEvent || e).clipboardData.getData("text/plain")
          : ""

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
      }}
      onKeyDown={(e) => {
        ;(e.ctrlKey || e.metaKey) &&
          ![`c`, `v`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `z`].includes(e.key) &&
          e.preventDefault()

        const el = e.target
        const parentButton = el?.closest("button")
        if (parentButton && e.key === "Enter") {
          e.preventDefault()
        }
        // 32 = space button
        if (parentButton && e.which === 32) {
          e.preventDefault()
          // Insert text at the current position of caret
          const range = document.getSelection()?.getRangeAt(0)
          if (range) {
            range.deleteContents()

            const textNode = document.createTextNode(" ")
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
        if (
          e.key === "s" &&
          (navigator?.userAgentData?.platform.match("mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault()
          void savePortfolio({ session, updatePortfolioMutation })
        }
      }}
      onBlur={(e) => {
        if (e?.target?.innerText) {
          let parent = BuildStore.data.flattenBlocks[parentID]
          if (parent) {
            let parentProps = parent.props as ICanvasBlockProps
            if (parentProps?.children !== e.target.innerText) {
              BuildStore.changeProp({ id: parentID, newProps: { children: e.target.innerText } })
            }
          }
        }
      }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}

export default WithEditable

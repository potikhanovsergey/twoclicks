import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { createStyles } from "@mantine/core"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import dynamic from "next/dynamic"
import { Ref, useMemo, useRef } from "react"
import ReactQuill, { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { BuildStore } from "store/build"

const DynamicReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")

    return ({ forwardedRef, ...props }: ReactQuillProps & { forwardedRef: any }) => (
      <RQ ref={forwardedRef} {...props} />
    )
  },
  {
    ssr: false,
  }
)
interface IQuill {
  value: string
  onChange: (value: string) => void
}

const useStyles = createStyles((theme) => ({
  quill: {
    "*": {
      outline: "none",
    },
    ".ql-formats": {
      display: "flex",
    },
    ".ql-container": {
      fontSize: "inherit",
      fontFamily: "inherit",
      height: "auto",
      margin: "auto",
      "&.ql-bubble a": {
        whiteSpace: "normal",
      },
    },
    ".ql-editor": {
      lineHeight: "inherit",
      height: "auto",
      padding: "0",
      overflow: "visible",
      "&.ql-blank": {
        width: "150px",
      },
    },
    ".ql-bubble": {
      ".ql-stroke": {
        stroke: theme.colors.gray[7],
      },
      ".ql-tooltip": {
        borderRadius: theme.radius.md,
        backgroundColor: theme.white,
        boxShadow:
          "0 6px 12px -6px rgb(131 147 173 / 46%), 5px -12px 34px -13px rgb(97 105 134 / 60%), 0 26px 52px 3px rgb(147 165 186 / 24%)",
        zIndex: 5,
        ".ql-tooltip-arrow": {
          borderBottomColor: theme.white,
        },
      },
    },
    ".ql-tooltip-editor input[type=text]": {
      color: theme.black,
      "::placeholder": {
        color: theme.colors.gray[7],
      },
    },
    ".ql-editing": {
      width: "auto !important",
      ".ql-tooltip-editor input": {
        position: "relative",
        minWidth: "150px",
      },
      ".ql-toolbar": {
        display: "none",
      },
    },
    ".ql-container.ql-bubble:not(.ql-disabled) a::before, .ql-container.ql-bubble:not(.ql-disabled) a::after":
      {
        whiteSpace: "nowrap",
      },
    ".ql-bubble.ql-toolbar button:hover .ql-stroke, .ql-bubble .ql-toolbar button:hover .ql-stroke, .ql-bubble.ql-toolbar button:focus .ql-stroke, .ql-bubble .ql-toolbar button:focus .ql-stroke, .ql-bubble.ql-toolbar button.ql-active .ql-stroke, .ql-bubble .ql-toolbar button.ql-active .ql-stroke, .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-bubble.ql-toolbar button:hover .ql-stroke-miter, .ql-bubble .ql-toolbar button:hover .ql-stroke-miter, .ql-bubble.ql-toolbar button:focus .ql-stroke-miter, .ql-bubble .ql-toolbar button:focus .ql-stroke-miter, .ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter, .ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter, .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter ":
      {
        stroke: theme.black,
      },
  },
}))

const Quill = (props: ReactQuillProps) => {
  const { classes } = useStyles()

  const [updatePortfolioMutation] = useMutation(updatePortfolio)
  const session = useSession()
  const { savePortfolio } = BuildStore

  const ref = useRef<ReactQuill>()

  const modules: ReactQuillProps["modules"] = useMemo(() => {
    return {
      toolbar: {
        container: ["bold", "italic", "link"],
        handlers: {
          // handlers object will be merged with default handlers object
          // link: function (value) {
          //   if (value) {
          //     var href = prompt("Enter the URL")
          //     this.quill.format("link", href)
          //   } else {
          //     this.quill.format("link", false)
          //   }
          // },
          bold: function (value) {
            if (value) {
              this.quill.format("bold", true)
            } else {
              this.quill.format("bold", false)
            }
            this.quill.blur()
          },
          italic: function (value) {
            if (value) {
              this.quill.format("italic", true)
            } else {
              this.quill.format("italic", false)
            }
            this.quill.blur()
          },
          link: function (value) {
            if (value) {
              let range = this.quill.getSelection()
              if (range == null || range.length == 0) return
              let preview = this.quill.getText(range)
              // if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf("mailto:") !== 0) {
              //   preview = "mailto:" + preview
              // }
              let tooltip = this.quill.theme.tooltip
              tooltip.edit("link", preview)
              this.quill.focus()
            } else {
              this.quill.format("link", false)
            }
          },
        },
      },
    }
  }, [])
  return (
    <DynamicReactQuill
      forwardedRef={ref}
      className={classes.quill}
      theme="bubble"
      {...props}
      formats={["link", "bold", "italic"]}
      modules={modules}
      onKeyDown={(e) => {
        if (
          e.key === "s" &&
          (navigator?.userAgentData?.platform.match("mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault()
          void savePortfolio({ session, updatePortfolioMutation })
        }
      }}
    />
  )
}

export default Quill
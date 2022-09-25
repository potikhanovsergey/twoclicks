import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { createStyles } from "@mantine/core"
import updatePage from "app/portfolios/mutations/updatePage"
import { memo, useMemo, useRef } from "react"
import ReactQuill, { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { BuildStore } from "store/build"

const useStyles = createStyles((theme) => ({
  quill: {
    "*": {
      outline: "none",
    },
    textDecoration: "inherit",
    backgroundImage: "inherit",
    WebkitBackgroundClip: "inherit",
    ".ql.editor, .ql-container, .ql-editor p": {
      textDecoration: "inherit",
      backgroundImage: "inherit",
      WebkitBackgroundClip: "inherit",
    },
    ".ql-picker": {
      WebkitTextFillColor: "currentcolor",
    },
    ".ql-picker.ql-font .ql-picker-item[data-value='Nunito']::before, .ql-picker-label[data-value='Nunito']::before":
      {
        fontFamily: "'Nunito', sans-serif",
      },
    ".ql-picker.ql-font .ql-picker-item[data-value='Helvetica']::before, .ql-picker-label[data-value='Helvetica']::before":
      {
        fontFamily: "Helvetica, sans-serif",
      },
    ".ql-picker.ql-font .ql-picker-item[data-value='Arial']::before, .ql-picker-label[data-value='Arial']::before":
      {
        fontFamily: "Arial, sans-serif",
      },
    ".ql-picker.ql-font .ql-picker-item[data-value='Times']::before, .ql-picker-label[data-value='Times']::before":
      {
        fontFamily: "Times New Roman, serif",
      },
    ".ql-picker.ql-font": {
      ".ql-picker-label, .ql-picker-item": {
        "&:before": {
          content: "attr(data-value) !important",
          fontWeight: 700,
        },
      },
    },
    ".ql-bubble .ql-formats": {
      display: "flex",
      flexWrap: "nowrap",
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
    ".ql-container, .ql-editor": {
      textAlign: "inherit",
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
          borderBottomColor: `${theme.white} !important`,
        },
      },
    },
    ".ql-tooltip-editor input[type=text]": {
      color: theme.black,
      "::placeholder": {
        color: theme.colors.gray[7],
      },
    },
    ".ql-picker-options": {
      maxHeight: "96px",
      overflow: "auto",
    },
    ".ql-picker-label": {
      color: theme.colors.gray[7] + "!important",
      display: "flex",
      height: "100%",
      alignItems: "center",
      borderRadius: theme.radius.md,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.colors.gray[1],
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

// Add fonts to whitelist
var Font = ReactQuill.Quill.import("formats/font")
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ["Nunito", "Arial", "Helvetica", "Times"]
ReactQuill.Quill.register(Font, true)

const Quill = (props: ReactQuillProps & { type: string }) => {
  const { classes } = useStyles()

  const [updatePageMutation] = useMutation(updatePage)
  const session = useSession()
  const { savePage } = BuildStore

  const { type, ...rest } = props

  const ref = useRef<ReactQuill>()
  const modules: ReactQuillProps["modules"] = useMemo(() => {
    return {
      toolbar: {
        container: type.includes("title")
          ? ["link", "italic", { font: Font.whitelist }]
          : ["bold", "link", "italic", { font: Font.whitelist }],
        handlers: {
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
              // let preview = this.quill.getText(range)
              let tooltip = this.quill.theme.tooltip
              tooltip.edit("link", "")
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
    <ReactQuill
      className={classes.quill}
      theme="bubble"
      {...rest}
      formats={
        type.includes("title") ? ["italic", "font", "link"] : ["italic", "font", "link", "bold"]
      }
      modules={modules}
      onKeyDown={(e) => {
        if (
          e.key === "s" &&
          (navigator?.userAgentData?.platform.match("mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault()
          void savePage({ session, updatePageMutation })
        }
      }}
    />
  )
}

export default memo(Quill)

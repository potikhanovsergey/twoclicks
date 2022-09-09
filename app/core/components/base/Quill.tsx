import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { createStyles } from "@mantine/core"
import updatePortfolio from "app/portfolios/mutations/updatePortfolio"
import dynamic from "next/dynamic"
import { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { BuildStore } from "store/build"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

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

    ".ql-bubble .ql-tooltip": {
      borderRadius: theme.radius.md,
      // backgroundColor: theme.colors.violet[5],
      zIndex: 5,
      // ".ql-tooltip-arrow": {
      //   borderBottomColor: theme.colors.violet[5],
      // },
    },
    ".ql-tooltip-editor input": {
      "::placeholder": {
        color: theme.colors.gray[2],
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
  },
}))

const Quill = (props: ReactQuillProps) => {
  const { classes } = useStyles()

  const [updatePortfolioMutation] = useMutation(updatePortfolio)
  const session = useSession()
  const { savePortfolio } = BuildStore
  return (
    <div>
      <ReactQuill
        className={classes.quill}
        theme="bubble"
        {...props}
        formats={["link", "bold", "italic"]}
        modules={{ toolbar: [["link", "bold", "italic"]] }}
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
    </div>
  )
}

export default Quill

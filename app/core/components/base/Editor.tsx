import { createReactEditorJS } from "react-editor-js"

const ReactEditorJS = createReactEditorJS()

type EditorProps = React.ComponentProps<typeof ReactEditorJS>

const Editor = (props: EditorProps) => {
  return <ReactEditorJS {...props} />
}

export default Editor

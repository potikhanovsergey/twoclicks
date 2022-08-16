import { ActionIcon, ActionIconProps, ButtonProps } from "@mantine/core"
import { forwardRef, ForwardedRef } from "react"
import { MdOutlinePreview } from "react-icons/md"

const PreviewButton = forwardRef((props: ActionIconProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return <ActionIcon {...props} ref={ref} />
})

export default PreviewButton

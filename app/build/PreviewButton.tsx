import { ActionIcon, ActionIconProps } from "@mantine/core"
import { forwardRef, ForwardedRef } from "react"

const PreviewButton = forwardRef((props: ActionIconProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return <ActionIcon {...props} ref={ref} />
})

export default PreviewButton

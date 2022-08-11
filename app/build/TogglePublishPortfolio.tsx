import { Switch, Tooltip } from "@mantine/core"
import { useState } from "react"

const TogglePublishPortfilio = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Tooltip
      label={checked ? "Hide your portfolio" : "Publish your portfilio"}
      withArrow
      position="bottom"
      color="violet"
    >
      <Switch
        label="Publish"
        radius="xl"
        color="violet"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </Tooltip>
  )
}

export default TogglePublishPortfilio

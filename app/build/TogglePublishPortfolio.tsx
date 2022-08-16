import { useMutation } from "@blitzjs/rpc"
import { Switch, Tooltip, Text } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import togglePortfolioPublished from "app/portfolios/mutations/togglePortfolioPublished"
import { ChangeEventHandler, useEffect, useState } from "react"
import { BuildStore } from "store/build"

const TogglePublishPortfilio = () => {
  const { hovered: switchHovered, ref: wrapperRef } = useHover()
  const {
    data: { id, isPublished },
  } = BuildStore

  const [checked, setChecked] = useState(Boolean(isPublished))

  useEffect(() => {
    if (typeof isPublished === "boolean") {
      setChecked(isPublished)
    }
  }, [isPublished])

  const handleToggle = (e) => {
    const isPublished = e.currentTarget.checked
    if (id) {
      BuildStore.data.isPublished = isPublished
      void togglePortfolioPublishedMutation({ id, isPublished })
    }
  }
  const [togglePortfolioPublishedMutation] = useMutation(togglePortfolioPublished)

  return (
    <Tooltip
      label={checked ? "Hide your portfolio" : "Publish your portfilio"}
      withArrow
      position="bottom"
      color="violet"
      opened={switchHovered}
    >
      <Switch
        wrapperProps={{ ref: wrapperRef }}
        radius="xl"
        color="violet"
        label={
          <Text
            sx={(theme) => ({ color: theme.colorScheme === "dark" ? theme.white : theme.black })}
          >
            Publish
          </Text>
        }
        checked={checked}
        onChange={handleToggle}
      />
    </Tooltip>
  )
}

export default TogglePublishPortfilio

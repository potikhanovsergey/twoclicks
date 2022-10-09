import { Tooltip, Popover, PopoverProps, TooltipProps, PopoverDropdownProps } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { useState } from "react"

interface IToolbarPopover {
  menuProps: Partial<PopoverProps>
  tooltipProps: TooltipProps
  dropdownProps: PopoverDropdownProps
}

const ToolbarPopover = ({ menuProps, tooltipProps, dropdownProps }: IToolbarPopover) => {
  const { hovered: targetHovered, ref: targetRef } = useHover()
  const [menuOpened, setMenuOpened] = useState(menuProps.defaultOpened || false)

  return (
    <Popover offset={0} opened={menuOpened} onChange={setMenuOpened} position="top" {...menuProps}>
      <Popover.Target>
        <div ref={targetRef} onClick={() => setMenuOpened((o) => !o)}>
          <Tooltip
            zIndex={301}
            withinPortal
            withArrow
            opened={targetHovered && !menuOpened}
            {...tooltipProps}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown p={0} {...dropdownProps} />
    </Popover>
  )
}

export default ToolbarPopover

import { Tooltip, Menu, MenuProps, TooltipProps, MenuDropdownProps } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { useState } from "react"

interface IToolbarMenu {
  menuProps: MenuProps
  tooltipProps: TooltipProps
  dropdownProps: MenuDropdownProps
}

const ToolbarMenu = ({ menuProps, tooltipProps, dropdownProps }: IToolbarMenu) => {
  const { hovered: targetHovered, ref: targetRef } = useHover()
  const [menuOpened, setMenuOpened] = useState(menuProps.defaultOpened || false)

  return (
    <Menu
      position="bottom"
      offset={0}
      closeOnItemClick={false}
      opened={menuOpened}
      onChange={setMenuOpened}
      zIndex={19}
      {...menuProps}
    >
      <Menu.Target>
        <div ref={targetRef}>
          <Tooltip
            zIndex={301}
            withinPortal
            withArrow
            opened={targetHovered && !menuOpened}
            {...tooltipProps}
          />
        </div>
      </Menu.Target>
      <Menu.Dropdown p={0} {...dropdownProps} />
    </Menu>
  )
}

export default ToolbarMenu

import { Tooltip } from "@mantine/core"
import IconPicker from "app/core/components/base/IconPicker"
import { RenderJSXFromBlock, serialize, TypeIcons } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { CgToggleSquareOff } from "@react-icons/all-files/cg/CgToggleSquareOff"
import { CgToggleSquare } from "@react-icons/all-files/cg/CgToggleSquare"

import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps } from "types"

interface IElementIconEdit {
  propName: string
  element: ICanvasBlock
}

const formatOutput = (icon: JSX.Element) => {
  return JSON.parse(serialize(icon))
}
const ElementIconEdit = ({ element, propName }: IElementIconEdit) => {
  const hasIconEdit = element.type && TypeIcons[element.type.toLowerCase()]
  const { changeProp } = BuildStore

  const ICON = useMemo(() => {
    return element.props?.[propName] ? element.props[propName] : null
  }, [element])

  const { t } = useTranslation("build")

  return hasIconEdit ? (
    <Tooltip
      label={
        propName === "leftIcon" || propName === "leftSection" ? t("left icon") : t("right icon")
      }
      withArrow
      position="top"
    >
      <div>
        <IconPicker
          withReset={Boolean(ICON)}
          onReset={() => {
            changeProp({
              id: element.id,
              newProps: {
                [propName]: undefined,
              },
            })
          }}
          isThemeIcon={true}
          themeIconProps={{
            variant: "subtle",
            color: "violet",
          }}
          icon={
            propName === "rightIcon" || propName === "rightSection" ? (
              <CgToggleSquareOff />
            ) : (
              <CgToggleSquare />
            )
          }
          onChange={(icon) => {
            const iconProps = formatOutput(icon)?.props
            if (iconProps) {
              changeProp({
                id: element.id,
                newProps: {
                  [propName]: {
                    props: iconProps,
                    type: "IconBase",
                  },
                },
              })
            }
          }}
        />
      </div>
    </Tooltip>
  ) : (
    <></>
  )
}

export default observer(ElementIconEdit)

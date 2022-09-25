import { Tooltip } from "@mantine/core"
import IconPicker from "app/core/components/base/IconPicker"
import { serialize, TypeIcons } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { CgToggleSquareOff } from "@react-icons/all-files/cg/CgToggleSquareOff"
import { CgToggleSquare } from "@react-icons/all-files/cg/CgToggleSquare"

import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

interface IElementIconEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
  propName: string
}

const formatOutput = (icon: JSX.Element) => {
  return JSON.parse(serialize(icon))
}
const ElementIconEdit = ({ type, props, id, propName }: IElementIconEdit) => {
  const hasIconEdit = type && TypeIcons[type.toLowerCase()]
  const { changeProp } = BuildStore

  const ICON = useMemo(() => {
    return props?.[propName] ? props[propName] : null
  }, [props])

  const { t } = useTranslation("build")

  return hasIconEdit ? (
    <Tooltip label={propName === "leftIcon" ? t("left icon") : t("right icon")} withArrow>
      <div>
        <IconPicker
          withReset={Boolean(ICON)}
          onReset={() => {
            changeProp({
              id,
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
          icon={ICON ? ICON : propName === "rightIcon" ? <CgToggleSquareOff /> : <CgToggleSquare />}
          onChange={(icon) => {
            const iconProps = formatOutput(icon)?.props
            if (iconProps) {
              changeProp({
                id,
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

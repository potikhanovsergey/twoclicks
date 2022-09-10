import { Tooltip, ActionIcon, Menu, Button, Stack } from "@mantine/core"
import IconPicker from "app/core/components/base/IconPicker"
import { renderJSXFromBlock, serialize, TypeIcons } from "helpers"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { Fa500Px, FaMagic } from "react-icons/fa"
import { TbToggleLeft, TbToggleRight } from "react-icons/tb"
import { BuildStore } from "store/build"
import { ICanvasBlockProps } from "types"

interface IElementIconEdit {
  type?: string
  props?: ICanvasBlockProps
  id: string
  propName: string
}

const ElementIconEdit = ({ type, props, id, propName }: IElementIconEdit) => {
  const hasIconEdit = type && TypeIcons[type.toLowerCase()]
  const { changeProp } = BuildStore

  const ICON = useMemo(() => {
    return props?.[propName] ? props[propName] : null
  }, [props])

  const { t } = useTranslation("pagesBuild")

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
          icon={ICON ? ICON : propName === "rightIcon" ? <TbToggleRight /> : <TbToggleLeft />}
          onChange={(icon) => {
            if (icon?.props) {
              changeProp({
                id,
                newProps: {
                  [propName]: {
                    props: icon.props,
                    type: icon.type || icon.typeName,
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

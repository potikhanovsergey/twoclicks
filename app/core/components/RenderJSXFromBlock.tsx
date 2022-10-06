import {
  defaultGradients,
  defaultVariants,
  getGradientsByType,
  getPaletteByType,
  getRadiusesByType,
  TraverseProp,
} from "helpers"
import { canvasBuildingBlocks } from "helpers/blocks"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo } from "react"
import { BuildStore } from "store/build"
import { ICanvasBlock, ICanvasBlockProps, IThemeSettings } from "types"

const IconPicker = dynamic(() => import("app/core/components/base/IconPicker"))
const WithEditToolbar = dynamic(() => import("app/build/WithEditToolbar"))

const RenderJSXFromBlock = observer(
  ({
    element,
    shouldFlat = false,
    parentID = null,
    withContentEditable = false,
    withEditToolbar = false,
    withThemeSettings = false,
    sectionIndex,
    themeSettings,
  }: {
    element: ICanvasBlock
    shouldFlat?: boolean
    parentID?: string | null
    withContentEditable?: boolean
    withEditToolbar?: boolean
    withThemeSettings?: boolean
    sectionIndex?: number
    themeSettings?: IThemeSettings
  }) => {
    const el = JSON.parse(JSON.stringify(element)) as ICanvasBlock // to not modify element in the arguments
    element.type = element.type.toLowerCase()
    const TagName = canvasBuildingBlocks[element.type] || element.type // if neither of the above, then the element is a block with children and the recursive call is needed.

    const props = useMemo(() => {
      const newProps = el.props as ICanvasBlockProps // not only children, byt any other element's prop can be React.Node or JSX.Element.
      // We need to traverse it to make sure all props are rendered as they should

      if (
        ["@mantine/core/button", "@mantine/core/themeicon", "@mantine/core/actionicon"].includes(
          element.type
        ) &&
        withContentEditable
      ) {
        newProps.component = "span"
      }

      if (withThemeSettings) {
        if (getPaletteByType(element.type) && !newProps[getPaletteByType(element.type).prop]) {
          newProps[getPaletteByType(element.type).prop] =
            themeSettings?.palette?.[getPaletteByType(element.type).color]
        }
        if (
          getRadiusesByType(element.type) &&
          !newProps.radius &&
          !element.type.includes("image")
        ) {
          newProps.radius = themeSettings?.radius
        }
        if (defaultVariants.includes(element.type) && !newProps.variant) {
          newProps.variant = themeSettings?.variant
        }

        if (defaultGradients.includes(element.type) && !newProps.gradient) {
          newProps.gradient = themeSettings?.gradient
        }
      }

      for (const prop in newProps) {
        if (Array.isArray(newProps[prop])) {
          for (let i = 0; i < newProps[prop].length; i++) {
            newProps[prop][i] = TraverseProp({
              propValue: newProps[prop][i],
              prop,
              shouldFlat,
              parentID: el.id,
              withContentEditable,
              withEditToolbar,
              withThemeSettings,
              themeSettings,
              type: element.type,
              sectionIndex,
            })
          }
        } else {
          const traversedProp = TraverseProp({
            propValue: newProps[prop],
            prop,
            shouldFlat,
            parentID: el.id,
            withContentEditable,
            withEditToolbar,
            withThemeSettings,
            themeSettings,
            type: element.type,
            sectionIndex,
          })
          if (traversedProp) {
            newProps[prop] = traversedProp
          }
        }
      }
      return newProps
    }, [el])

    if (withEditToolbar && el?.editType === "icon") {
      return (
        <IconPicker
          key={el.id}
          icon={<TagName {...props} />}
          onChange={(icon) => {
            if (icon?.props) {
              let newProps = icon.props as ICanvasBlockProps
              BuildStore.changeProp({ id: el.id, newProps })
            }
          }}
        />
      )
    }

    if (withEditToolbar && el.editType) {
      return (
        <WithEditToolbar
          key={el.id}
          parentID={parentID}
          sectionIndex={sectionIndex}
          element={element}
        >
          <TagName {...props} />
        </WithEditToolbar>
      )
    }

    const { children, ...restProps } = props

    if (
      typeof children === "string" &&
      !element.type.includes("button") &&
      !element.type.includes("badge")
    ) {
      return <TagName key={el.id} {...restProps} dangerouslySetInnerHTML={{ __html: children }} />
    }

    if (props.component === "a" && props.href) {
      const { href, ...restOfProps } = props
      return (
        <Link passHref key={el.id} href={href}>
          <TagName {...restOfProps} />
        </Link>
      )
    } else {
      return <TagName key={el.id} {...props} />
    }
  }
)

export default RenderJSXFromBlock

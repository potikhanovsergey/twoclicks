import {
  defaultGradients,
  defaultVariants,
  getPaletteByType,
  getRadiusesByType,
  TraverseProp,
} from "helpers"
import { canvasBuildingBlocks } from "helpers/blocks"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useMemo } from "react"
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
    childrenProp = "children",
    removeSemantics = false,
    withMobx = false,
  }: {
    element: ICanvasBlock
    shouldFlat?: boolean
    parentID?: string | null
    withContentEditable?: boolean
    withEditToolbar?: boolean
    withThemeSettings?: boolean
    sectionIndex?: number
    themeSettings?: IThemeSettings
    childrenProp?: string
    removeSemantics?: boolean
    withMobx?: boolean
  }) => {
    const mobxElement = useMemo(() => {
      return withMobx && element.id ? BuildStore.getElement(element.id) || element : element
    }, [element])

    const typeLC = useMemo(() => {
      return mobxElement.type.toLowerCase()
    }, [mobxElement.type])

    const TagName = useMemo(() => {
      return canvasBuildingBlocks[typeLC] || typeLC
    }, [typeLC])

    const props = useMemo(() => {
      const newProps = JSON.parse(JSON.stringify(mobxElement.props)) as ICanvasBlockProps // not only children, byt any other element's prop can be React.Node or JSX.mobxElement.
      // We need to traverse it to make sure all props are rendered as they should

      if (
        ["@mantine/core/button", "@mantine/core/themeicon", "@mantine/core/actionicon"].includes(
          typeLC
        ) &&
        withContentEditable
      ) {
        newProps.component = "span"
      }

      if (withContentEditable && (typeLC.includes("header") || typeLC.includes("footer"))) {
        newProps.component = "div"
      }

      if (removeSemantics) {
        newProps.component = "div"
      }

      if (withThemeSettings) {
        if (getPaletteByType(typeLC) && !newProps[getPaletteByType(typeLC).prop]) {
          newProps[getPaletteByType(typeLC).prop] =
            themeSettings?.palette?.[getPaletteByType(typeLC).color]
        }
        if (getRadiusesByType(typeLC) && !newProps.radius && !typeLC.includes("image")) {
          newProps.radius = themeSettings?.radius
        }
        if (defaultVariants.includes(typeLC) && !newProps.variant) {
          newProps.variant = themeSettings?.variant
        }

        if (defaultGradients.includes(typeLC) && !newProps.gradient) {
          newProps.gradient = themeSettings?.gradient
        }
      }

      for (const prop in newProps) {
        if (Array.isArray(newProps[prop])) {
          for (let i = 0; i < newProps[prop].length; i++) {
            newProps[prop][i] = TraverseProp({
              propValue: newProps[prop][i],
              prop,
              withMobx,
              shouldFlat,
              parentID: mobxElement.id,
              withContentEditable,
              withEditToolbar,
              withThemeSettings,
              themeSettings,
              type: typeLC,
              sectionIndex,
            })
          }
        } else {
          const traversedProp = TraverseProp({
            propValue: newProps[prop],
            prop,
            withMobx,
            shouldFlat,
            parentID: mobxElement.id,
            withContentEditable,
            withEditToolbar,
            withThemeSettings,
            themeSettings,
            type: typeLC,
            sectionIndex,
          })
          if (traversedProp) {
            newProps[prop] = traversedProp
          }
        }
      }
      return newProps
    }, [mobxElement.props, mobxElement.props?.[childrenProp], typeLC, mobxElement.id, sectionIndex])

    if (withEditToolbar && element?.editType === "icon") {
      return (
        <IconPicker
          key={mobxElement.id}
          icon={<TagName {...props} />}
          onChange={(icon) => {
            if (icon?.props) {
              let newProps = icon.props as ICanvasBlockProps
              BuildStore.changeProp({ id: mobxElement.id, newProps })
            }
          }}
        />
      )
    }

    if (withEditToolbar && mobxElement.editType) {
      return (
        <WithEditToolbar
          key={mobxElement.id}
          parentID={parentID}
          sectionIndex={sectionIndex}
          element={{ ...mobxElement, type: typeLC }}
          childrenProp={childrenProp}
        >
          <TagName {...props} fixed={typeLC.includes("header") ? false : undefined} />
        </WithEditToolbar>
      )
    }

    const { children, ...restProps } = props

    if (typeof children === "string" && !typeLC.includes("button") && !typeLC.includes("badge")) {
      return (
        <TagName
          key={mobxElement.id}
          {...restProps}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      )
    }

    if (props.component === "a" && props.href) {
      const { href, ...restOfProps } = props
      return (
        <Link passHref key={mobxElement.id} href={href}>
          <TagName {...restOfProps} />
        </Link>
      )
    } else {
      return <TagName key={mobxElement.id} {...props} />
    }
  }
)

export default RenderJSXFromBlock

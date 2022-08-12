import SafeWrapper from "app/core/components/SafeWrapper"
import { renderJSXFromBlock } from "helpers"
import { observer } from "mobx-react-lite"
import React from "react"
import { BuildStore } from "store/build"

const BuilderBlocks = observer(({ className }: { className?: string }) => {
  const {
    data: { blocks },
  } = BuildStore

  return (
    <div className={className}>
      {blocks &&
        blocks.map((b, i) => {
          const JSX = renderJSXFromBlock({
            element: b,
            shouldFlat: true,
            withContentEditable: true,
            withEditToolbar: true,
            withPalette: true,
            sectionIndex: i,
          })
          if (JSX) {
            return (
              <SafeWrapper resetKeys={[JSX]} key={b.id}>
                {JSX}
              </SafeWrapper>
            )
          }
          return <React.Fragment key={i} />
        })}
    </div>
  )
})

export default BuilderBlocks

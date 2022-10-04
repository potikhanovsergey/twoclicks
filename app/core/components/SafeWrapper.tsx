// needed because the error boundary catches errors
// in *nested* components, whereas if it tried
// to render the children directly, it can't catch

import { ErrorBoundary } from "@blitzjs/next"
import { ReactNode, useEffect, useState } from "react"

// errors in its own `render`
const Inner = ({ children }) => children

const SafeWrapper = ({
  children,
  resetKeys,
  onLoad,
}: {
  children: ReactNode
  resetKeys?: unknown[]
  onLoad?: () => void
}) => {
  useEffect(() => {
    onLoad && onLoad()
  }, [])
  return (
    <ErrorBoundary fallback={<>The element cannot be rendered</>} resetKeys={resetKeys}>
      <Inner>{children}</Inner>
    </ErrorBoundary>
  )
}

export default SafeWrapper

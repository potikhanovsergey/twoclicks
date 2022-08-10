// needed because the error boundary catches errors
// in *nested* components, whereas if it tried
// to render the children directly, it can't catch

import { ErrorBoundary } from "@blitzjs/next"
import { ReactNode, useEffect, useState } from "react"

// errors in its own `render`
const Inner = ({ children }) => children

const SafeWrapper = ({ children, resetKeys }: { children: ReactNode; resetKeys?: unknown[] }) => {
  return (
    <ErrorBoundary fallback={<>The JSX cannot be rendered</>} resetKeys={resetKeys}>
      <Inner>{children}</Inner>
    </ErrorBoundary>
  )
}

export default SafeWrapper

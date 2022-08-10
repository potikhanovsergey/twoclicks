// needed because the error boundary catches errors
// in *nested* components, whereas if it tried
// to render the children directly, it can't catch

import { ErrorBoundary } from "@blitzjs/next"

// errors in its own `render`
const Inner = ({ children }) => children

const SafeWrapper = ({ children }) => (
  <ErrorBoundary fallback={<>The JSX cannot be rendered</>}>
    <Inner>{children}</Inner>
  </ErrorBoundary>
)

export default SafeWrapper

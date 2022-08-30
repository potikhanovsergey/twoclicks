import { ReactNode } from "react"

const ConditionalWrapper = ({
  condition,
  wrap,
  children,
}: {
  condition: boolean
  wrap: Function
  children?: ReactNode
}) => (condition ? wrap(children) : children)

export default ConditionalWrapper

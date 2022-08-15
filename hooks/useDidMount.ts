import { useRef, useEffect } from "react"

export const useDidMount = () => {
  const didMount = useRef(true)
  useEffect(() => {
    didMount.current = false
  }, [])
  return didMount.current
}

import { useRef, useLayoutEffect, useCallback } from "react"

export default function useEventCallback(fn) {
  let ref = useRef()
  useLayoutEffect(() => {
    ref.current = fn
  })
  return useCallback(() => (0, ref.current)(), [])
}

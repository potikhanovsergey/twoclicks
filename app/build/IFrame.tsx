import { useState } from "react"
import { createPortal } from "react-dom"
import { CacheProvider, css } from "@emotion/react"
import { emotionCache } from "pages/_app"

export const WithEmotion = ({ children, styleSelector, title, ...props }) => {
  const [contentRef, setContentRef] = useState(null)
  const doc = contentRef?.contentWindow?.document
  const mountNode = doc?.body
  const insertionTarget = doc?.head

  return (
    <iframe title={title} {...props} ref={setContentRef}>
      {mountNode &&
        insertionTarget &&
        createPortal(<CacheProvider value={emotionCache}>{children}</CacheProvider>, mountNode)}
    </iframe>
  )
}

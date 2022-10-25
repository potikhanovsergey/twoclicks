import { LoadingOverlay, Skeleton } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import Image, { ImageProps } from "next/image"
import { useState } from "react"

const SkeletonImage = (props: Omit<ImageProps, "onLoadingComplete">) => {
  const [loading, setLoading] = useState(true)
  const [debouncedLoading] = useDebouncedValue(loading, 400)
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <Image alt="" {...props} onLoadingComplete={() => setLoading(false)} />
      {debouncedLoading && <Skeleton height="100%" width="100%" sx={{ position: "relative" }} />}
    </div>
  )
}

export default SkeletonImage

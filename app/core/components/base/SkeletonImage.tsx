import { Box, Skeleton, useMantineTheme } from "@mantine/core"
import Image, { ImageProps } from "next/image"
import { useState } from "react"

const SkeletonImage = ({
  css,
  ...props
}: { css?: any } & Omit<ImageProps, "onLoadingComplete">) => {
  const [loading, setLoading] = useState(true)
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      {loading && <Skeleton height="100%" width="100%" />}
      <Image alt="" {...props} onLoadingComplete={() => setLoading(false)} />
    </div>
  )
}

export default SkeletonImage

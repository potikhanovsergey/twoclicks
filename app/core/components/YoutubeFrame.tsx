import { memo, useMemo, useRef } from "react"
import Image from "next/image"
import { AspectRatio, AspectRatioProps, Box, Center, Text } from "@mantine/core"
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube"
import { parseYoutubeURL } from "helpers"

export type YoutubeFrameProps = {
  src: string
  thumbnailQuality?: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault"
  containerProps?: AspectRatioProps
}

function YouTubeFrame({
  src,
  thumbnailQuality = "maxresdefault",
  containerProps,
}: YoutubeFrameProps) {
  const divRef = useRef<HTMLDivElement | null>(null)

  const videoID = useMemo(() => {
    return parseYoutubeURL(src)
  }, [src])

  const onClick = () => {
    const iframe = document.createElement("iframe")
    iframe.setAttribute("frameborder", "0")
    iframe.setAttribute("allowfullscreen", "1")
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    )
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${videoID}?rel=0&showinfo=1&autoplay=1`
    )
    if (divRef.current) {
      divRef.current.innerHTML = ""
      divRef.current.appendChild(iframe)
    }
  }

  return (
    <AspectRatio
      ref={divRef}
      ratio={16 / 9}
      sx={{
        cursor: "pointer",
        width: "100%",
      }}
      {...containerProps}
    >
      {videoID && (
        <FaYoutube
          color="red"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "60px",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
      <Box
        onClick={videoID ? onClick : undefined}
        sx={{
          position: "relative",
          ":before": {
            position: "absolute",
            content: "''",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,.4)",
            opacity: 0,
            zIndex: 1,
          },
          "&:hover": {
            ":before": {
              opacity: 1,
            },
          },
        }}
      >
        {videoID ? (
          <Image
            loading="lazy"
            src={`https://img.youtube.com/vi/${videoID}/${thumbnailQuality}.jpg`}
            alt={`YouTube Video ${videoID} Thumbnail`}
            quality={1}
            layout="fill"
            className="shadow"
          />
        ) : (
          <Center>
            <Text style={{ maxWidth: "66%", zIndex: 2, position: "relative" }}>
              We can&apos;t find video with this url on youtube: {src}
            </Text>
          </Center>
        )}
      </Box>
    </AspectRatio>
  )
}

export default memo(YouTubeFrame)

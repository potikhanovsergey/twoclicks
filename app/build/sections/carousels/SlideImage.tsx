import { Carousel } from "@mantine/carousel"
import { Image, ImageProps } from "@mantine/core"

function SlideImage({ src }: ImageProps) {
  console.log(src)
  return (
    <Carousel.Slide>
      <Image
        p="xl"
        src={src}
        radius="md"
        alt=""
        height={440}
        width="100%"
        styles={{ root: { height: "100% !important" } }}
      />
    </Carousel.Slide>
  )
}

SlideImage.displayName = "slideimage"

export default SlideImage

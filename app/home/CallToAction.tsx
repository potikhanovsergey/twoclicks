import { Container, Text, Group, Button, Center, createStyles } from "@mantine/core"
import Image from "next/image"

import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import NextImage from "app/core/components/base/NextImage"

const useStyles = createStyles((theme) => ({
  image: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: -1,
    userSelect: "none",
  },
}))

const CallToAction = () => {
  const { classes } = useStyles()
  return (
    <>
      <Container
        size="xl"
        px={40}
        sx={{
          position: "relative",
        }}
      >
        <NextImage
          wrapperProps={{ className: classes.image, sx: { top: "-450px", left: "-240px" } }}
          src="/landing/pink-circle.png"
          alt="Pink circle decoration"
          width="700px"
          height="700px"
        />
        <NextImage
          wrapperProps={{ className: classes.image, sx: { top: "-110px", right: "-240px" } }}
          src="/landing/purple-circle.png"
          alt="Purple circle light"
          width="700px"
          height="700px"
        />
        <Group position="apart" noWrap>
          <Text mb={220} ml={200} size={30} sx={{ letterSpacing: "3px" }}>
            You`ve made <strong>one click</strong> <br /> to visit this page
          </Text>
          <Text size={30} mr={200} sx={{ letterSpacing: "3px" }} align="right">
            It`s time to make <br /> <strong>another one</strong>
          </Text>
        </Group>
        <Center>
          <Button
            aria-label="Open the page builder"
            rightIcon={<BsArrowRight size="20px" />}
            variant="gradient"
            gradient={{ from: "violet", to: "red", deg: 60 }}
            sx={{ width: "260px", height: "64px" }}
            radius="md"
          >
            <Text size={24}>Get started</Text>
          </Button>
        </Center>
      </Container>
    </>
  )
}

export default CallToAction

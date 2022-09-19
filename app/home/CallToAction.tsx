import { Container, Text, Group, Button, Center, createStyles, ContainerProps } from "@mantine/core"
import Image from "next/image"

import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"

const useStyles = createStyles({
  image: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: -1,
    userSelect: "none",
    width: "700px",
    height: "700px",
  },
})

const CallToAction = (props: ContainerProps) => {
  const { classes } = useStyles()
  return (
    <Container
      size="xl"
      px={40}
      sx={{
        position: "relative",
      }}
      {...props}
    >
      <div className={classes.image} style={{ top: "-450px", left: "-240px" }}>
        <Image
          src="/landing/pink-circle.png"
          width={700}
          height={700}
          quality={1}
          layout="responsive"
          alt=""
          sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
        />
      </div>
      <div className={classes.image} style={{ top: "-110px", right: "-240px" }}>
        <Image
          width={700}
          height={700}
          quality={1}
          layout="responsive"
          src="/landing/purple-circle.png"
          alt=""
          sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
        />
      </div>
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
  )
}

export default CallToAction

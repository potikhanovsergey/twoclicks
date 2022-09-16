import { Container, Text, Group, Button, Center, Image } from "@mantine/core"
import { BsArrowRight } from "react-icons/bs"

const CallToAction = () => {
  return (
    <>
      <Container
        size="xl"
        px={40}
        sx={{
          position: "relative",
        }}
      >
        <Image
          src="landing/pink-circle.png"
          sx={{
            position: "absolute",
            pointerEvents: "none",
            top: "-450px",
            left: "-240px",
            zIndex: -1,
            userSelect: "none",
          }}
          alt="Pink circle decoration"
          width={700}
          height={700}
        />
        <Image
          src="landing/purple-circle.png"
          sx={{
            position: "absolute",
            pointerEvents: "none",
            top: "-110px",
            right: "-240px",
            zIndex: -1,
            userSelect: "none",
          }}
          alt="Purple circle decoration"
          width={700}
          height={700}
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

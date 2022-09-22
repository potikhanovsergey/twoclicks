import { ActionIcon, Center, Container, Text, useMantineTheme, Group } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks"
import { BsArrowUp } from "@react-icons/all-files/bs/BsArrowUp"

const LandingFooter = () => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <>
      <Container size="xl" px={40}>
        <Center sx={{ position: "relative" }} mb={40}>
          <Text color="gray" size="md" align="center">
            Copyright © 2022 twoclicks <br />
            All Rights Reserved
          </Text>
          <ActionIcon
            aria-label="Scroll to the top"
            variant="filled"
            color={dark ? "gray.0" : "dark"}
            sx={{ position: "absolute", right: "20px", "@media (max-width: 576px)": { right: 0 } }}
            onClick={() => scrollTo({ y: 0 })}
          >
            <BsArrowUp color={dark ? "black" : "white"} />
          </ActionIcon>
        </Center>
      </Container>
    </>
  )
}

export default LandingFooter

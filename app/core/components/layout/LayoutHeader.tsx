import {
  Burger,
  Container,
  Group,
  Header,
  MediaQuery,
  Skeleton,
  useMantineColorScheme,
} from "@mantine/core"
import { CSSProperties, Dispatch, SetStateAction, Suspense, useContext } from "react"
import HeaderProfile from "./HeaderProfile"
import Logo from "../Logo"
import { ModalContext } from "contexts/ModalContext"

interface ILayoutHeader {
  fixed?: boolean
  position?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }
  style?: CSSProperties
  hasLogo?: boolean
  px?: number
}

const LayoutHeader = ({ fixed = false, position, style, hasLogo = true }: ILayoutHeader) => {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  const [modalContext, setModalContext = () => ({})] = useContext(ModalContext)

  const handleMenuModalToggle = () => {
    setModalContext((prevValue) => ({
      ...prevValue,
      menuModal: !prevValue.menuModal,
    }))
  }
  return (
    <Header
      position={position}
      sx={(theme) => ({
        backgroundColor: dark ? theme.colors.dark[7] : theme.colors.gray[0],
        zIndex: 302,
      })}
      height="var(--layout-header-height)"
      fixed={fixed}
      py={0}
      style={style}
    >
      <Container
        size="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Group
          position={hasLogo ? "apart" : "right"}
          align="center"
          style={{ width: "100%" }}
          noWrap
        >
          {hasLogo ? <Logo width={156} /> : <></>}
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={Boolean(modalContext?.menuModal)}
              onClick={handleMenuModalToggle}
              size="sm"
              sx={(theme) => ({
                color: theme.colors.gray[6],
              })}
              mr="xl"
              ml="auto"
            />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <div>
              <Suspense fallback={<Skeleton height={32} width={200} radius="md" animate />}>
                <HeaderProfile />
              </Suspense>
            </div>
          </MediaQuery>
        </Group>
      </Container>
    </Header>
  )
}

export default LayoutHeader

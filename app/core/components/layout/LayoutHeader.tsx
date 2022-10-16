import {
  Burger,
  Container,
  Group,
  Header,
  MediaQuery,
  Skeleton,
  useMantineColorScheme,
} from "@mantine/core"
import { CSSProperties, Dispatch, ReactNode, SetStateAction, Suspense, useContext } from "react"
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
  withTransparency?: boolean
  withProfile?: boolean
  withAuthButton?: boolean
  title?: ReactNode
}

const LayoutHeader = ({
  fixed = false,
  position,
  style,
  hasLogo = true,
  withTransparency = true,
  withProfile = true,
  withAuthButton = true,
  title,
}: ILayoutHeader) => {
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
        backgroundColor: withTransparency
          ? dark
            ? theme.fn.rgba(theme.colors.dark[7], 0.72)
            : theme.fn.rgba(theme.white, 0.72)
          : dark
          ? theme.colors.dark[7]
          : theme.colors.white,
        zIndex: 302,
        backdropFilter: "saturate(270%) blur(5px)",
        paddingRight: "var(--removed-scroll-width, 0px)",
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
          position={hasLogo && !withProfile ? "center" : hasLogo ? "apart" : "right"}
          align="center"
          style={{ width: "100%", height: "100%" }}
          noWrap
        >
          {hasLogo ? <Logo width={140} /> : <></>}
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
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
          {title && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(calc(-50% - (var(--removed-scroll-width, 0px) / 2)), -50%)",
              }}
            >
              {title}
            </div>
          )}
          {withProfile && (
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <div>
                <Suspense fallback={<Skeleton height={32} width={200} animate />}>
                  <HeaderProfile withAuthButton={withAuthButton} />
                </Suspense>
              </div>
            </MediaQuery>
          )}
        </Group>
      </Container>
    </Header>
  )
}

export default LayoutHeader

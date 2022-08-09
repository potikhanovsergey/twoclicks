import {
  Burger,
  Container,
  Group,
  Header,
  MediaQuery,
  Skeleton,
  useMantineColorScheme,
} from "@mantine/core"
import { CSSProperties, Dispatch, SetStateAction, Suspense } from "react"
import HeaderProfile from "./HeaderProfile"
import Logo from "../Logo"

interface ILayoutHeader {
  menuOpened: boolean
  setMenuOpened: Dispatch<SetStateAction<boolean>>
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

const LayoutHeader = ({
  menuOpened,
  setMenuOpened,
  fixed = false,
  position,
  style,
  hasLogo = true,
}: ILayoutHeader) => {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  return (
    <Header
      position={position}
      sx={(theme) => ({
        backgroundColor: dark ? theme.colors.dark[7] : theme.colors.gray[0],
      })}
      height="var(--layout-header-height)"
      fixed={fixed}
      py={0}
      style={style}
      zIndex="301"
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
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={menuOpened}
            onClick={() => setMenuOpened((o: boolean) => !o)}
            size="sm"
            sx={(theme) => ({
              color: theme.colors.gray[6],
            })}
            mr="xl"
          />
        </MediaQuery>
        <Group position={hasLogo ? "apart" : "right"} align="center" style={{ width: "100%" }}>
          {hasLogo ? <Logo width={156} /> : <></>}
          <Suspense fallback={<Skeleton height={32} width={200} radius="md" animate />}>
            <HeaderProfile />
          </Suspense>
        </Group>
      </Container>
    </Header>
  )
}

export default LayoutHeader

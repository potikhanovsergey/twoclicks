import { Burger, Group, Header, MediaQuery, useMantineColorScheme } from "@mantine/core"
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

export const LayoutHeader = ({
  menuOpened,
  setMenuOpened,
  fixed = false,
  position,
  style,
  px = 16,
  hasLogo = true,
}: ILayoutHeader) => {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  return (
    <Header
      position={position}
      sx={(theme) => ({
        backgroundColor: dark ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
      height="var(--build-header-height)"
      fixed={fixed}
      py={0}
      px={px}
      style={style}
    >
      <div
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
        <Group
          px="xl"
          position={hasLogo ? "apart" : "right"}
          align="center"
          style={{ width: "100%" }}
        >
          {hasLogo ? <Logo width={132} /> : <></>}
          <Suspense fallback="Loading...">
            <HeaderProfile />
          </Suspense>
        </Group>
      </div>
    </Header>
  )
}

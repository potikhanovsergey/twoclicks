import { Stack } from "@mantine/core"
import { ReactNode } from "react"

interface IProfileNoItems {
  children: ReactNode
}

const ProfileNoItems = ({ children }: IProfileNoItems) => (
  <Stack
    align="center"
    justify="center"
    spacing={32}
    style={{ height: "calc(100% - var(--home-header-height))" }}
  >
    {children}
  </Stack>
)

export default ProfileNoItems

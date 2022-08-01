import { Stack } from "@mantine/core"
import { ReactNode } from "react"

interface IProfileNoItems {
  children: ReactNode
}

const ProfileNoItems = ({ children }: IProfileNoItems) => (
  <Stack align="center" justify="center" spacing={0} style={{ height: "100%" }}>
    {children}
  </Stack>
)

export default ProfileNoItems

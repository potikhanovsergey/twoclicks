import { Group } from "@mantine/core"
import { ReactNode } from "react"

const CardOptions = ({ children }: { children: ReactNode }) => {
  return (
    <Group position="right" sx={{ position: "absolute", right: 8, top: 8, left: 8 }}>
      {children}
    </Group>
  )
}

export default CardOptions

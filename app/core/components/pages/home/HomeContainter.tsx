import { Container } from "@mantine/core"
import { ReactNode } from "react"

const HomeContainer = ({ children, px }: { children: ReactNode; px?: number }) => (
  <Container style={{ maxWidth: "1800px", height: "100%" }} px={px || 16}>
    {children}
  </Container>
)

export default HomeContainer

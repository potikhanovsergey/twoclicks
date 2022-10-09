import SimpleHeaderBase from "../components/SimpleHeaderBase"
import { Button, Image } from "@mantine/core"

const SimpleHeader = () => {
  return (
    <SimpleHeaderBase
      logo={
        <Image
          src="https://ucarecdn.com/f74c587f-932f-49cc-b0b9-a73904e61070/"
          alt="Logotype"
          width="100px"
          height="auto"
          sx={{ maxWidth: "120px", maxHeight: "60px" }}
        />
      }
      links={["Features", "Pricing", "Learn", "Community"].map((l) => (
        <Button key={l} size="xs">
          {l}
        </Button>
      ))}
    />
  )
}

export default SimpleHeader

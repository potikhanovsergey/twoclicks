import { Text } from "@mantine/core"

interface IElementName {
  name: string
}

const ElementName = ({ name }: IElementName) => {
  return (
    <Text
      ml="xs"
      size="sm"
      weight="bold"
      sx={(theme) => ({
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        textTransform: "capitalize",
      })}
    >
      {name}
    </Text>
  )
}

export default ElementName

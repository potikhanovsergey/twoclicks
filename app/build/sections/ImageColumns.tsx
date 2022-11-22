import { Box, Group, Image, SimpleGrid } from "@mantine/core"

const sources = [
  "https://images.unsplash.com/photo-1668877334122-b60dd15bc1b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNzh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1668974526534-505b779f7eec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMTF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1669104732072-cb994e0eda95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80",
  "https://images.unsplash.com/photo-1668714298639-2df174929fcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
]

const ImageColumns = () => {
  return (
    <Box>
      <SimpleGrid
        cols={4}
        breakpoints={[
          {
            maxWidth: "sm",
            cols: 1,
          },
        ]}
        spacing={0}
        sx={{
          "> div": {
            minHeight: 240,
            maxHeight: "calc(100vh - var(--layout-header-height))",
            figure: { height: "100%", "*": { height: "100% !important" } },
          },
        }}
      >
        {sources.map((s) => (
          <Image src={s} key={s} fit="cover" alt="" />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ImageColumns

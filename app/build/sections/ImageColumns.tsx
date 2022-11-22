import { Group, Image } from "@mantine/core"

const ImageColumns = () => {
  return (
    <Group grow spacing={0} sx={{ maxHeight: 640 }}>
      <Image src="https://images.unsplash.com/photo-1669072257143-5592e0652644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
      <Image src="https://images.unsplash.com/photo-1669111959281-7f4cdd990620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
      <Image src="https://images.unsplash.com/photo-1669072257143-5592e0652644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
      <Image src="https://images.unsplash.com/photo-1669072257143-5592e0652644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
    </Group>
  )
}

export default ImageColumns

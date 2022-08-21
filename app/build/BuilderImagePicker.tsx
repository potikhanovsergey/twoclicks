import ImagePicker from "app/core/components/base/ImagePicker"
import { ReactNode } from "react"
import { BuildStore } from "store/build"

interface IBuilderImagePicker {
  elementID: string
  children: ReactNode
  slug?: string
}

const BuilderImagePicker = ({ elementID, children, slug }: IBuilderImagePicker) => {
  const { changeProp } = BuildStore
  return (
    <ImagePicker
      onDrop={async (files) => {
        const data = new FormData()
        data.append("file", files[0])
        data.append("UPLOADCARE_PUB_KEY", "719fb1a8f2d034c0731c")
        data.append("UPLOADCARE_STORE", "auto")

        const response = await fetch("https://upload.uploadcare.com/base/", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          body: data,
        })

        if (response.ok) {
          const responseData = await response.json()
          const src = `https://ucarecdn.com/${responseData.file}/`
          changeProp({
            id: elementID,
            newProps: {
              src,
              uuid: responseData.file,
            },
          })
          if (slug) {
            await fetch(`https://api.uploadcare.com/files/${slug}/storage/`, {
              method: "DELETE",
              mode: "cors",
              cache: "no-cache",
              headers: {
                Authorization: "Uploadcare.Simple 719fb1a8f2d034c0731c:8447df3ce909bc5b904b",
              },
            })
          }
        }
      }}
    >
      {children}
    </ImagePicker>
  )
}

export default BuilderImagePicker

import ImagePicker from "app/core/components/base/ImagePicker"
import axios from "axios"
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
        data.append("image", files[0])
        data.append("key", "a7bad624b0773cbad481fef7bbb30664")
        // data.append("UPLOADCARE_PUB_KEY", "719fb1a8f2d034c0731c")
        // data.append("UPLOADCARE_STORE", "auto")
        data.append("action", "upload")
        data.append("format", "json")

        // const response = await fetch("https://upload.uploadcare.com/base/", {
        //   method: "POST",
        //   mode: "cors",
        //   cache: "no-cache",
        //   body: data,
        // })

        const response = await axios("https://api.imgbb.com/1/upload", {
          method: "POST",
          data,
        })

        if ((response.status = 200)) {
          // const src = `https://ucarecdn.com/${responseData.file}/`
          console.log(response)
          changeProp({
            id: elementID,
            newProps: {
              src: response.data.data.url,
              // uuid: response.data.url,
            },
          })
          // if (slug) {
          //   await fetch(`https://api.uploadcare.com/files/${slug}/storage/`, {
          //     method: "DELETE",
          //     mode: "cors",
          //     cache: "no-cache",
          //     headers: {
          //       Authorization: "Uploadcare.Simple 719fb1a8f2d034c0731c:8447df3ce909bc5b904b",
          //     },
          //   })
          // }
        }
      }}
    >
      {children}
    </ImagePicker>
  )
}

export default BuilderImagePicker

import { showNotification } from "@mantine/notifications"
import ImagePicker from "app/core/components/base/ImagePicker"
import { defaultUploadNotificationError } from "notifications"
import { ReactNode } from "react"
import { FileRejection } from "react-dropzone"
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
      onReject={(errors: FileRejection[]) => {
        let error = errors[0]

        error.errors.map((e) => {
          let message
          if (e.code === "file-too-large") {
            message = "The uploaded file is larger than 32MB"
          } else {
            message = e.message
          }

          showNotification({
            ...defaultUploadNotificationError,
            message,
          })
        })
      }}
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
        const axios = (await import("axios")).default

        const response = await axios("https://api.imgbb.com/1/upload", {
          method: "POST",
          data,
        })

        if ((response.status = 200 && response.data.data.url)) {
          // const src = `https://ucarecdn.com/${responseData.file}/`
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
        } else {
          console.log("Upload error", response)
          showNotification(defaultUploadNotificationError)
        }
      }}
    >
      {children}
    </ImagePicker>
  )
}

export default BuilderImagePicker

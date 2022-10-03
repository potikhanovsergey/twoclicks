import { showNotification } from "@mantine/notifications"
import ImagePicker from "app/core/components/base/ImagePicker"
import { defaultUploadNotificationError } from "notifications"
import { ReactNode } from "react"
import { FileRejection } from "react-dropzone"
import { BuildStore } from "store/build"

interface IBuilderImagePicker {
  elementID: string
  children: ReactNode
}

const BuilderImagePicker = ({ elementID, children }: IBuilderImagePicker) => {
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
        data.append("action", "upload")
        data.append("format", "json")
        const axios = (await import("axios")).default

        const response = await axios("https://api.imgbb.com/1/upload", {
          method: "POST",
          data,
        })

        if ((response.status = 200 && response.data.data.url)) {
          changeProp({
            id: elementID,
            newProps: {
              src: response.data.data.url,
            },
          })
        } else {
          showNotification(defaultUploadNotificationError)
        }
      }}
    >
      {children}
    </ImagePicker>
  )
}

export default BuilderImagePicker

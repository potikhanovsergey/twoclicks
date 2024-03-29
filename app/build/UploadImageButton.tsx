import { FileButton, Button } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useState, useEffect } from "react"
import { BuildStore } from "store/build"

interface UploadImageButtonProps {
  onImagePick: (value: string) => void
  id: string
}

const UploadImageButton = ({ onImagePick, id }: UploadImageButtonProps) => {
  const [file, setFile] = useState<File | null>(null)
  const { t } = useTranslation("build")

  useEffect(() => {
    const uploadBG = async () => {
      if (file) {
        const data = new FormData()
        data.append("key", "3e77a923cae4cb92226236ec6a44e793")
        data.append("action", "upload")
        data.append("format", "json")
        data.append("image", file)
        const axios = (await import("axios")).default
        const response = await axios("https://api.imgbb.com/1/upload", {
          method: "POST",
          data,
        })

        if ((response.status = 200 && response?.data?.data?.url)) {
          // const src = `https://ucarecdn.com/${responseData.file}/`
          onImagePick(response.data.data.url)
          setFile(null)
        }
      }
    }
    void uploadBG()
  }, [file])

  const handleChange = (file: File) => {
    setFile(file)
    BuildStore.isImageUploading = null
  }

  return (
    <div onClick={() => (BuildStore.isImageUploading = id)}>
      <FileButton onChange={handleChange} accept="image/png,image/jpeg">
        {(props) => (
          <Button {...props} fullWidth compact>
            {t("uploadImage")}
          </Button>
        )}
      </FileButton>
    </div>
  )
}

export default observer(UploadImageButton)
